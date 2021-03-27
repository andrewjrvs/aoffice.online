import { Context, HttpRequest } from "@azure/functions"

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
        status: 400,
        body: null,
        isRaw: true,
        };
    context.done();
}