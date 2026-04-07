export interface Error {
    message: string;
    name: string;
    stack: string;
    config: AxiosRequestConfig;
    code: string;
    status: number;
  }
  
  export interface AxiosRequestConfig {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: (null | ((data: any, headers: any) => any))[];
    transformResponse: (null | ((data: any) => any))[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: object;
    headers: {
      Accept: string;
      'Content-Type': string;
      sessionToken?: string;
    };
    params?: {
      dataPost?: {
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
        ChildAge: any[];
      };
    };
    method: 'get' | 'post' | 'put' | 'delete' | string;
    url: string;
    allowAbsoluteUrls?: boolean;
  }
  