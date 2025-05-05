import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const clean = (val: string | undefined) =>
    (val || '').replace(/['",]/g, '').trim();

  const body = await req.json();

  const {
    from,
    to,
    date,
    time,
    directOnly,
    includeLowCost,
    classPref,
    includeNDC,
    onlyFaresWithBaggage,
    departureIsCity,
    arrivalIsCity,
    travelers = []
  } = body;

  if ( !from || !to || !date || travelers.length === 0) {
    return new Response(JSON.stringify({ error: 'Faltan parámetros obligatorios.' }), { status: 400 });
  }

  const travelersXML = travelers
    .map(
      (t: any) => `
      <web:AirTravelerInfo>
        <web:TravelerType>${t.type}</web:TravelerType>
        <web:IsResident>${t.isResident ? 'true' : 'false'}</web:IsResident>
      </web:AirTravelerInfo>`
    )
    .join('');

  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.aramix.es">
   <soapenv:Header/>
   <soapenv:Body>
      <web:AirAvailSearch>
         <web:credentials>
            <web:AgencyID>${clean(process.env.NEXT_PUBLIC_AGENCY_ID)}</web:AgencyID>
            <web:UserID>${clean(process.env.NEXT_PUBLIC_USER_ID)}</web:UserID>
            <web:Password>${clean(process.env.NEXT_PUBLIC_PASSWORD)}</web:Password>
         </web:credentials>
         <web:availRQ>
            <web:DirectFlightsOnly>${directOnly}</web:DirectFlightsOnly>
            <web:IncludeLowCost>${includeLowCost}</web:IncludeLowCost>
            <web:ClassPref>${classPref}</web:ClassPref>
            <web:Travelers>${travelersXML}</web:Travelers>
            <web:FlightSegments>
               <web:AirFlightSegmentRQ>
                  <web:DepartureAirportLocationCode>${from}</web:DepartureAirportLocationCode>
                  <web:ArrivalAirportLocationCode>${to}</web:ArrivalAirportLocationCode>
                  <web:DepartureDate>${date}</web:DepartureDate>
                  <web:DepartureTime>${time}</web:DepartureTime>
                  <web:DepartureIsCity>${departureIsCity}</web:DepartureIsCity>
                  <web:ArrivalIsCity>${arrivalIsCity}</web:ArrivalIsCity>
               </web:AirFlightSegmentRQ>
            </web:FlightSegments>
            <web:IncludeNDC>${includeNDC}</web:IncludeNDC>
            <web:OnlyFaresWithBaggage>${onlyFaresWithBaggage}</web:OnlyFaresWithBaggage>
         </web:availRQ>
      </web:AirAvailSearch>
   </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const { data: xml } = await axios({
      method: 'post',
      url: 'https://integrawspublico.aramix.es/v1_0/ServiceAereo.svc',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://webservices.aramix.es/IServiceAereo/AirAvailSearch'
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
