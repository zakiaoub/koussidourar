export interface Attraction {
    ActivityCode: string;
    Type: string;
    Duration: string;
    Name: string;
    StartingPoints: string;
    EndPoints: string;
    Image: string;
    Description: string;
    Country: string;
    City: string;
    longitude: number;
    latitude: number;
    Currency: string;
    Price: number;
    OptionAvailable: number;
    SegmentationGroups: {
        Services: { [key: string]: string };
        Supplier: { [key: string]: string };
        Daytime: { [key: string]: string };
        Duration: { [key: string]: string };
        Categories: { [key: string]: string };
    };
    Amount: number;
    availTocken: string;
    priceCode: string;
}
