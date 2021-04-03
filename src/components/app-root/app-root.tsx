import { Component, h } from '@stencil/core';
import { RestrictedRoute } from '../restricted-route';
import store from '../../utils/auth-store';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {


  constructor() {
    // start by trying to get the user account right off...
    fetch('/api/user').then((d) => d.json()).then(d =>  store.state.user = d).catch(_ => store.state.user = null);
    
  }

  private logoff(): void {
    fetch('./auth/logout');
    store.state.user = null;
  }

  render() {
    return (
      <div>
        <header>
          <h1><stencil-route-link url="/" exact={true}>A Office Online</stencil-route-link></h1>
          {store.state.isAuthenticated ? 
              <p>
                Welcome: {store.state.user.name}
                &nbsp;<fa-i icon={faSignOutAlt} tabIndex={0} title="sign off" aria-label="sign off" onClick={() => this.logoff()}></fa-i>
              </p> : 
              <p>
                <stencil-route-link url="/login" exact={true}>Login</stencil-route-link> 
              </p>}
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url={['/', 'home']} component='app-home' exact={true} />
              <stencil-route url='/login' component='app-login' />
              <RestrictedRoute url='/users/:userId' oa_role='user_admin' component='app-users-edit' />
              <RestrictedRoute url='/users' oa_role='user_admin' component='app-users-list' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
