import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const clean = (val: string | undefined) =>
    (val || '').replace(/['",]/g, '').trim();

  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.aramix.es">
   <soapenv:Header/>
   <soapenv:Body>
      <web:AirBookingSearch>
         <web:credentials>
            <web:AgencyID>101224</web:AgencyID>
            <web:UserID>1349</web:UserID>
            <web:Password>PXo8Xf5L</web:Password>
         </web:credentials>
         <web:airBookingSearchRQ/>
      </web:AirBookingSearch>
   </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const { data: xml } = await axios({
      method: 'post',
      url: 'https://integrawspublico.aramix.es/v1_0/ServiceAereo.svc',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://webservices.aramix.es/IServiceAereo/AirBookingSearch'
      },
      data: soapEnvelope
    });

    const result = await parseStringPromise(xml, {
      explicitArray: false,
      ignoreAttrs: true,
      trim: true
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    const errorResponse = error?.response?.data || error.message;
    const isXml = typeof errorResponse === 'string' && errorResponse.trim().startsWith('<');

    if (isXml) {
      try {
        const errorJson = await parseStringPromise(errorResponse, {
          explicitArray: false,
          ignoreAttrs: true,
          trim: true
        });
        return new Response(JSON.stringify({ error: errorJson }), { status: 500 });
      } catch {
        return new Response(errorResponse, {
          status: 500,
          headers: { 'Content-Type': 'text/xml' }
        });
      }
    }

    return new Response(JSON.stringify({ error: errorResponse }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
