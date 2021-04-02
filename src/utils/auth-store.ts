import { createStore } from '@stencil/store';
import { Person } from '../../api/models/person';

const StorageKeyName = 'oa_active_user';

let storedUsr: Person = null;
try {
    storedUsr = JSON.parse(sessionStorage.getItem(StorageKeyName));
} catch(ex) {}


const { state, onChange, dispose } = createStore({
    user: storedUsr,
    isAuthenticated: !!storedUsr
});

onChange('user', value => {
    state.isAuthenticated = !!value;
    if (value) {
        sessionStorage.setItem(StorageKeyName, JSON.stringify(value));
    } else {
        sessionStorage.removeItem(StorageKeyName)
    }
    
});



export default {state, dispose};
