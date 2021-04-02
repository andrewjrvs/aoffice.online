import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-users-list',
  styleUrl: 'app-users-list.css',
  shadow: true,
})
export class AppUsersList {

  render() {
    return (
      <Host>
        userList
        <slot></slot>
      </Host>
    );
  }

}
