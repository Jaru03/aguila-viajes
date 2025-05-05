import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const clean = (val: string | undefined) =>
    (val || '').replace(/['",]/g, '').trim();

  // Cargar credenciales desde variables de entorno
  const AgencyID = process.env.NEXT_PUBLIC_AGENCY_ID;
  const UserID = process.env.NEXT_PUBLIC_USER_ID;
  const Password = process.env.NEXT_PUBLIC_PASSWORD;

  // Validar credenciales
  if (!AgencyID || !UserID || !Password) {
    return new Response(JSON.stringify({ error: 'Faltan credenciales.' }), { status: 400 });
  }

  const body = await req.json();
  const { bookingID } = body;

  // Validar parámetro obligatorio
  if (!bookingID) {
    return new Response(JSON.stringify({ error: 'Falta bookingID.' }), { status: 400 });
  }

  // Construir la solicitud SOAP
  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.aramix.es">
   <soapenv:Header/>
   <soapenv:Body>
      <web:AirBookingCancel>
         <web:credentials>
            <web:AgencyID>${clean(AgencyID)}</web:AgencyID>
            <web:UserID>${clean(UserID)}</web:UserID>
            <web:Password>${clean(Password)}</web:Password>
         </web:credentials>
         <web:bookingID>${clean(bookingID)}</web:bookingID>
      </web:AirBookingCancel>
   </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const { data: xml } = await axios({
      method: 'post',
      url: 'https://integrawspublico.aramix.es/v1_0/ServiceAereo.svc',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://webservices.aramix.es/IServiceAereo/AirBookingCancel'
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
