import { Component, h } from '@stencil/core';
import { RestrictedRoute } from '../restricted-route';
import store from '../../utils/auth-store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {


  constructor() {
    fetch('/api/user').then((d) => d.json()).then(d =>  store.state.user = d);
  }

  render() {
    return (
      <div>
        <header>
          <h1><stencil-route-link url="/" exact={true}>A Office Online</stencil-route-link></h1>
          {store.state.isAuthenticated ? <p>Welcome: {store.state.user.name}</p> : <p><stencil-route-link url="/login" exact={true}>Login</stencil-route-link></p>}
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
              <stencil-route url='/login' component='app-login' exact={true} />
              <RestrictedRoute url='/users' oa_role='user_admin' component='app-users-list' exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
