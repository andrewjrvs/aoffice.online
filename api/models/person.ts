
export interface Person {
    "@type"?: 'Person'
    _id?: string;
    name: string;
    givenName?: string;
    familyName?: string;
    gender?: string;
    roles?: string[];
}
