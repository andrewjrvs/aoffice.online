import { Component, Host, h, State } from '@stencil/core';
import { Person } from '../../../api/models/person';
import { getUsers } from '../../utils/person-service';


@Component({
  tag: 'app-users-list',
  styleUrl: 'app-users-list.css',
  shadow: true,
})
export class AppUsersList {

  @State() public usersList: Person[] = null;

  constructor() {
    getUsers().then(d => this.usersList = d).catch(_ => console.error(_));
  }

  render() {
    const lst = this.usersList || [];
    
    return (
      <Host>
        <h1>Users Admin</h1>
        <ul>
          {lst.map((v) =>
            <li>{ v.name } {v?.roles?.map(rl => <span class="role">{rl}</span>)} <stencil-route-link url={`/users/${v._id}`}>edit</stencil-route-link></li>
          )}
        </ul>
        <stencil-route-link url={`/users/new`}>Add new user</stencil-route-link>
      </Host>
    );
  }

}
