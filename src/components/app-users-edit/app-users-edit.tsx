import { Component, Host, h, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { Person } from '../../../api/models/person';
import { getUserById } from '../../utils/person-service';

@Component({
  tag: 'app-users-edit',
  styleUrl: 'app-users-edit.css',
  shadow: true,
})
export class AppUsersEdit {
  
  // get info from the route
  // @Prop() match: any;

  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;

  @State() user: Person = null;

  constructor() {
    const _id = this.match?.params?.userId || '';

    if (_id) {
      getUserById(_id).then(d => this.user = d).catch(err => console.error(err));
    }
  }  

  render() {
    if (!this.user) {
      return (<Host></Host>);
    }



    return (
      <Host>
        <h1>Edit user {this.user.name}</h1>
        <div>givenName: {this.user.givenName}</div>
        <div>familyName: {this.user.familyName}</div>
        <div>gender: {this.user.gender}</div>
      </Host>
    );
  }

}
