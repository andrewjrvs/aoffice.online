import { Component, Host, h } from '@stencil/core';
import { faGithub, faWindows } from '@fortawesome/free-brands-svg-icons'

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
            <li><a href="/.auth/login/aad"><fa-i icon={faWindows}></fa-i> Azure</a></li>
            <li><a href="/.auth/login/github"><fa-i icon={faGithub}></fa-i> Github</a></li>
          </ul>
          <h2>Sign out</h2>
          <a href="/.auth/logout">Sign out</a>
        </div>
      </Host>
    );
  }

}
