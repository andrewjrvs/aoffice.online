import { Person } from '../../api/models/person';
export function userHasRole(user: Person, roles: string | string[]): boolean {
    if (!user) {
        return false;
    }
    // if its an array, are there any that arn't included on the user, if not, is the passed role included...
    return Array.isArray(roles) ? !roles.some(v => !user.roles.includes(v)) : user.roles.includes(roles as string);

}