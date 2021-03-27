import { Component, h, State } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {


  @State()
  private username: string;

  constructor() {
    fetch('/.auth/me').then((d) => d.json()).then(d => this.username = d?.clientPrincipal?.userDetails)
  }

  render() {
    return (
      <div>
        <header>
          <h1>A Office Online</h1>
          {this.username ? <p>Welcome: {this.username}</p> : <p><stencil-route-link url="/login" exact={true}>Login</stencil-route-link></p>}
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
              <stencil-route url='/login' component='app-login' exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
