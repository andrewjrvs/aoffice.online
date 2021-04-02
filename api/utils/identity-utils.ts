import { Identity } from '../models/identity';

export function buildFullName(user: Identity): string {
    return [user.givenName, user.familyName].join(' ').trim();     
}