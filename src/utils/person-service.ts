import { Person } from '../../api/models/person';


export async function getUsers(): Promise<Person[]> {
    let rtnUsers: Person[] = null;
    try {
        rtnUsers = await fetch('/api/users').then(d => d.json());
    } catch (ex) {
        throw 'request failed';
    }
    
    return rtnUsers;
}

export async function getUserById(_id: string): Promise<Person> {
    let rtnUser: Person = null;
    try {
        rtnUser = await fetch(`/api/users/${_id}`).then(d => d.json());
    } catch (ex) {
        throw 'request failed';
    }
    
    return rtnUser;
}

export async function createUser(user: Person): Promise<Person> {
    let rtnUser: Person = null;
    try {
        rtnUser = await fetch(`/api/users`, {method: 'POST', body: JSON.stringify(user)}).then(d => d.json());
    } catch (ex) {
        throw 'request failed';
    }
    return rtnUser;
}

export async function deleteUser(_id: string): Promise<boolean> {
    let rtnValue = false;
    try {
        rtnValue = await fetch(`/api/users/${_id}`, {method: 'DELETE'}).then(d => d.status === 410);
    } catch (ex) {
        throw 'request failed';
    }
    return rtnValue;
}