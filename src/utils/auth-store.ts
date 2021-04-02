import { createStore } from '@stencil/store';
import { Person } from '../../api/models/person';

const { state, onChange, dispose } = createStore({
    user: null as Person,
    isAuthenticated: false
});

onChange('user', value => {
    state.isAuthenticated = !!value;
});

export default {state, dispose};
