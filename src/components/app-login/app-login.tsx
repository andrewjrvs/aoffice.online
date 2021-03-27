import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.css',
  shadow: true,
})
export class AppLogin {

  render() {
    return (
      <Host>
        <div class='app-login'>
          <h2>Log into</h2>
          <ul>
            <li><a href="/.auth/login/aad">Azure</a></li>
            <li><a href="/.auth/login/github">Github</a></li>
          </ul>

          <h2>Sign out</h2>
          <a href="/.auth/logout">Sign out</a>
        </div>
      </Host>
    );
  }

}
