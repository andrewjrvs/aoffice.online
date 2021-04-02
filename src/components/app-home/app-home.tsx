import { Component, h } from '@stencil/core';
import store from '../../utils/auth-store';
import { userHasRole } from '../../utils/person-utls';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  render() {
    return (
      <div class='app-home'>
        <p>
         This is a test page.
        </p>
        <pre>
          userHasRole { userHasRole(store.state.user, 'oa_admin') ? 'true' : 'false' }<br />
          userRoles: { store?.state?.user?.roles && store.state.user.roles.join(', ')}
        </pre>
        <ul>
        { userHasRole(store.state.user, 'oa_admin') ? <li><stencil-route-link url="/users" exact={true}>Manage Users</stencil-route-link></li> : ''}
        </ul>
        {/* <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link> */}
      </div>
    );
  }
}
