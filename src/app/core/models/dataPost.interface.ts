export interface Attraction {
    Destination: string;
    CountryId: string;
    DestinationId: number;
    DateFrom: string;
    DateTo: string;
    Nationality: string;
    CountryOfResidence: string;
    Adult: number;
    Child: number;
    Type: string;
    CountryName: string;
    ChildAge: number[];
}

export interface AttractionDatapost {
    dataPost: Attraction;
}
