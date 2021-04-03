import { Person } from './person';
import { AccessObject } from './access-object';

export interface Identity extends Person  {
    _id: string;
    access_from: AccessObject[];
}
