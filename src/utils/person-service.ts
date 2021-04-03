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