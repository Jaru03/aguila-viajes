export type AirDestinationAirport = {
    AirportLocationCode: string;
    CityLocationCode: string;
    Country: string;
    Description: string;
    IsCity: "true" | "false";
    IsTrainOrBus: "true" | "false";
    UtCOffsetHour: string;
  };
  
  export type AirDestinationAirportsListResponse = {
    s: {
      Envelope: {
        Body: {
          AirDestinationAirportsListResponse: {
            AirDestinationAirportsListResult: {
              AirDestinationAirport: AirDestinationAirport[];
            };
          };
        };
      };
    };
  };
  