import { Identity } from '../models/identity';
import { getCollection } from '../utils/my-mongo';
import { auth } from '../utils/validate-auth';
import { buildFullName } from '../utils/identity-utils';
import { ObjectID } from 'mongodb';
import { Person } from '../models/person';

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

export async function getUserById(id: string): Promise<Identity> {
    const o_id = new ObjectID(id);
    const query: {[key: string]: any} = {_id: o_id};
    let user: Identity = null;
    const [collection, client] = await getCollection('access', 'users');
    try {
        user = await collection.findOne(query);
        if (user) {
            user = cleanUpDBUser(user);
        }
        
    } finally {
        client.close();
    }
    return user;
}


export async function getUsers(filter: any = null): Promise<Identity[]> {
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

export async function assignAuthToUser(id: string, passed_auth: auth): Promise<boolean> {
    const o_id = new ObjectID(id);
    const query: {[key: string]: any} = {_id: o_id};
    let rtnResult = false;
    const [collection, client] = await getCollection('access', 'users');

    try {
        const reply = await collection.updateOne(query,  { $push: {
            access_from: { provider: passed_auth.identityProvider, userId: passed_auth.userId}
        }});
        if (reply.matchedCount === 1 && reply.modifiedCount === 1) {
            rtnResult = true;
        }
    } catch (ex) {

    } finally {
        client.close();
    }
    return rtnResult;
}

export async function insertUser(user: Person): Promise<string> {
    let rtnEntryId: string = null;
    const [collection, client] = await getCollection('access', 'users');
    try {
        // we don't want any 'ao_' roles getting assigned this way...
        if (user.roles) {
            user.roles = user.roles.filter((v) => !v.startsWith('ao_'));
        }
        // we don't want access from assigned either...
        if ((user as any).access_from){
            delete (user as any).access_from;
        }

        const reply = await collection.insertOne(user);
        if (reply && reply.insertedId) {
            rtnEntryId = reply.insertedId;
        }
    } finally {
        client.close();
    }
    return rtnEntryId;
}

export async function unassignAuthFromUser(id: string, provider: string): Promise<boolean> {
    const o_id = new ObjectID(id);
    const query: {[key: string]: any} = {_id: o_id};
    let rtnResult = false;
    const [collection, client] = await getCollection('access', 'users');
    try {
        const reply = await collection.updateOne(query,  { $pull: {
            access_from: { provider: provider }
        }});
        if (reply.matchedCount === 1 && reply.modifiedCount === 1) {
            rtnResult = true;
        }
    } catch (ex) {

    } finally {
        client.close();
    }
    return rtnResult;
}


export async function removeUser(id: string): Promise<boolean> {
    const o_id = new ObjectID(id);
    const query: {[key: string]: any} = {_id: o_id};
    let rtnResult = false;
    const [collection, client] = await getCollection('access', 'users');
    try {
        const reply = await collection.deleteOne(query);
        if (reply.deletedCount === 1) {
            rtnResult = true;
        }
    } catch (ex) {

    } finally {
        client.close();
    }
    return rtnResult;
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
