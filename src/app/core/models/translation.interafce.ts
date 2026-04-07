export interface PrimeNgLanguage {
    dayNames?: string[];
    dayNamesShort?: string[];
    dayNamesMin?: string[];
    monthNames?: string[];
    monthNamesShort?: string[];
    today?: string;
    clear?: string;
    weekHeader?: string;
    firstDayOfWeek?: number;
    dateFormat?: string;
    weak?: string;
    medium?: string;
    strong?: string;
    passwordPrompt?: string;
    emptyMessage?: string;
    emptyFilterMessage?: string;
}

export interface PrimeNgTranslations {
    [langCode: string]: PrimeNgLanguage;
}
