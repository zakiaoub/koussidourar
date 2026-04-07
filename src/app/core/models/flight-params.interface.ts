export interface flightParams {
    dataPost: DataPost;
}

export interface DataPost {
    Trip: string;
    Adult: number;
    Child: number;
    Infant: number;
    Cabin: string;
    Stops: string;
    RefundableFares: boolean;
    AirlineInclude: string[];
    AirlineExclude: string[];
    withLuggage: boolean;
    Itineraries: Itinerary[];
}

export interface Itinerary {
    Ref: number;
    Deprature: string;
    DepartureCountryName: string;
    DepartureCityName: string;
    DepartureCountryId: string;
    DepartureCode: string;
    DepartureType: string;
    Arrival: string;
    ArrivalCountryName: string;
    ArrivalCityName: string;
    ArrivalCountryId: string;
    ArrivalCode: string;
    ArrivalType: string;
    Date: string;
}
