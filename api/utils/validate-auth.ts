import { Context, HttpRequest } from "@azure/functions"
import { Identity } from "../models/identity";

export interface auth {
    identityProvider: string;
    userId: string;
    userDetails: string;
    userRoles: string[];
};

/**
 * validate the user was passed in... 
 * @param req 
 * @returns 
 */
export function ValidateAuth( req: HttpRequest): auth {
    try {
        const header = req.headers["x-ms-client-principal"];
        const encoded = Buffer.from(header, "base64");
        const decoded = encoded.toString("ascii");
        return JSON.parse(decoded) as auth;
    } catch (ex) {}
    
    return null;
}

/**
 * Process the fail message here...
 * @param context 
 */
export function FailDueToAuth(context: Context): void {
    context.res = {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 401,
        body: null,
        isRaw: true,
        };
    context.done();
}

/**
 * Does the user have this role / roles?
 * @param user user to check
 * @param roles roles we want to fine
 * @param includeAll must include ALL passed roles (vs just one...)
 * @returns 
 */
export function authHasRole(user: auth, roles: string | string[], includeAll: boolean = false): boolean {
    if (!user) {
        return false;
    }
    const listToCheck = Array.isArray(roles) ? roles : [roles];
    
    // are ANY of these matching?
    // if ALL flag, check if there are any NOT matching, 
    // if not, check if ONE matches...
    return includeAll ? !listToCheck.some(v => !user.userRoles.includes(v)) : listToCheck.some(v => user.userRoles.includes(v));
}