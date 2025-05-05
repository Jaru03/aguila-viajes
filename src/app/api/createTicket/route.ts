import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const clean = (val: string | undefined) =>
    (val || '').replace(/['",]/g, '').trim();

  const body = await req.json();
  const {
    availRequestId,
    pricingGroupId,
    airTravelers,
    itinerariesId
  } = body;

  // Validación de campos obligatorios
  if (!availRequestId || !pricingGroupId || !airTravelers?.length || !itinerariesId?.length) {
    return new Response(JSON.stringify({ error: 'Faltan parámetros obligatorios.' }), { status: 400 });
  }

  const travelersXML = airTravelers
    .map((t: any) => `
      <web:AirTraveler>
        <web:TravelerType>${t.type}</web:TravelerType>
        <web:TravelerTitle>${t.title}</web:TravelerTitle>
        <web:DocumentType>${t.documentType}</web:DocumentType>
        <web:TravelerID>${t.id}</web:TravelerID>
        <web:FirstName>${t.firstName}</web:FirstName>
        <web:LastName>${t.lastName}</web:LastName>
        <web:DocumentNumber>${t.documentNumber}</web:DocumentNumber>
        <web:Email>${t.email}</web:Email>
        <web:Phone>${t.phone}</web:Phone>
        <web:BirthDate>${t.birthDate}</web:BirthDate>
        <web:IsResident>${t.isResident}</web:IsResident>
      </web:AirTraveler>
    `).join('');

  const itinerariesXML = itinerariesId
    .map((id: string | number) => `<web:int>${id}</web:int>`)
    .join('');

  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.aramix.es">
   <soapenv:Header/>
   <soapenv:Body>
      <web:AirBookingCreate>
         <web:credentials>
            <web:AgencyID>${clean(process.env.NEXT_PUBLIC_AGENCY_ID)}</web:AgencyID>
            <web:UserID>${clean(process.env.NEXT_PUBLIC_USER_ID)}</web:UserID>
            <web:Password>${clean(process.env.NEXT_PUBLIC_PASSWORD)}</web:Password>
         </web:credentials>
         <web:airBookingRQ>
            <web:AvailRequestID>${availRequestId}</web:AvailRequestID>
            <web:AirTravelers>${travelersXML}</web:AirTravelers>
            <web:PricingGroupID>${pricingGroupId}</web:PricingGroupID>
            <web:ItinerariesID>${itinerariesXML}</web:ItinerariesID>
         </web:airBookingRQ>
      </web:AirBookingCreate>
   </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const { data: xml } = await axios({
      method: 'post',
      url: 'https://integrawspublico.aramix.es/v1_0/ServiceAereo.svc',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://webservices.aramix.es/IServiceAereo/AirBookingCreate'
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
