import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export async function GET() {
  // Función para limpiar comillas, comas y espacios innecesarios
  const clean = (val: string | undefined) =>
    (val || '').replace(/['",]/g, '').trim();

  // Limpieza de variables de entorno
  const agencyId = clean(process.env.NEXT_PUBLIC_AGENCY_ID);
  const userId = clean(process.env.NEXT_PUBLIC_USER_ID);
  const password = clean(process.env.NEXT_PUBLIC_PASSWORD);

  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.aramix.es">
   <soapenv:Header/>
   <soapenv:Body>
      <web:AirDestinationAirportsList>
         <web:credentials>
            <web:AgencyID>${agencyId}</web:AgencyID>
            <web:UserID>${userId}</web:UserID>
            <web:Password>${password}</web:Password>
         </web:credentials>
      </web:AirDestinationAirportsList>
   </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const { data: xml } = await axios({
      method: 'post',
      url: 'https://integrawspublico.aramix.es/v1_0/ServiceAereo.svc',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://webservices.aramix.es/IServiceAereo/AirDestinationAirportsList'
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
