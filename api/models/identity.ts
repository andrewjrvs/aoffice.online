import { Person } from './person';
export interface Identity extends Person  {
    _id: string;
    access_from: any[];
}