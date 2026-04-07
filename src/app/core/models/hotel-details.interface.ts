export interface HotelDetails {
    id?: number;
    country_code?: string;
    city_code?: number;
    name?: string;
    address?: string;
    category?: string;
    latitude?: number;
    longitude?: number;
    airport_code?: string;
    chain_id?: string;
    hotel_type_id?: string;
    trip_advisor_rating?: string;
    trip_advisor_rating_image?: string;
    trip_advisor_review_count?: string;
    trip_advisor_reviews?: string;
    image?: string;
    country?: string;
    city?: string;
    descriptions?: { [key: string]: string };
    images?: string[];
    amenities?: string[];
    rooms?: {
        name?: string;
        descriptions?: string;
        amenities?: string[];
        images?: string[];
    }[];
}
