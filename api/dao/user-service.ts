import { Identity } from '../models/identity';
import { getCollection } from '../utils/my-mongo';
import { auth } from '../utils/validate-auth';


export async function getUserAccountByAuth(passed_auth: auth): Promise<Identity> {
    //{access_from: {$elemMatch: {provider: 'google', userId:'ec551dc645694d5db0fd7a573777a386'}}}
    const query: {[key: string]: any} = {access_from: {$elemMatch: {provider: passed_auth.identityProvider, userId:passed_auth.userId}}};
    let user: Identity = null;
    const [collection, client] = await getCollection('access', 'users');
    try {
        user = await collection.findOne(query);
        // don't return the access from content...
        if (user) {
            delete user.access_from;
        }
    } finally {
        client.close();
    }
    return user;
}