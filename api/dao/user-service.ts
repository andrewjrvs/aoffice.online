import { Identity } from '../models/identity';
import { getCollection } from '../utils/my-mongo';
import { auth } from '../utils/validate-auth';
import { buildFullName } from '../utils/identity-utils';


export async function getUserAccountByAuth(passed_auth: auth): Promise<Identity> {
    const query: {[key: string]: any} = {access_from: {$elemMatch: {provider: passed_auth.identityProvider, userId:passed_auth.userId}}};
    let user: Identity = null;
    const [collection, client] = await getCollection('access', 'users');
    try {
        user = await collection.findOne(query);
        if (user) {
            user = cleanUpDBUser(user);
            // attach roles
            (user.roles = user.roles || []).push(...passed_auth.userRoles);
        }
        
    } finally {
        client.close();
    }
    return user;
}

export async function getUsers(filter: any): Promise<Identity[]> {
    const query: {[key: string]: any} = {};
    const [collection, client] = await getCollection('access', 'users');
    let users: Identity[] = null;
    try {
        users = await collection.find(query).toArray();
        if (users) {
            users = users.map(cleanUpDBUser);
        } else {
            users = [];
        }
        
    } finally {
        client.close();
    }
    return users;
}

function cleanUpDBUser(user: Identity): Identity {
    // don't return the access from content...
    const rtnUsr = JSON.parse(JSON.stringify(user));
    if (rtnUsr) {
        delete rtnUsr.access_from;
    }
    // build userFullName
    if (!rtnUsr.name) {
        rtnUsr.name = buildFullName(rtnUsr);
    }
    return rtnUsr;
}