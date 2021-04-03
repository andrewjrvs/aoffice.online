import { Component, Host, h, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { Person } from '../../../api/models/person';
import { getUserById, deleteUser, createUser } from '../../utils/person-service';

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
    
  }  

  componentWillLoad() {
    const _id = this.match?.params?.userId || '';

    if (_id === 'new') {
      
      const nUser = { 
        name: 'N00b' };
      this.user = nUser;
      
    } else if (_id) {
      getUserById(_id).then(d => this.user = d).catch(err => console.error(err));
    }
  }

  handleDelete() {
    deleteUser(this.user._id).then(d => {
      alert(`User was deleted [${d}]`);
      this.history.push('/users');
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.user._id) {
      const psdUser = JSON.parse(JSON.stringify(this.user));
      delete psdUser.name;
      createUser(psdUser).then(d => {
        this.user = d;
        this.history.push(`/users/${d._id}`)
      })
    } else {
      console.log('SHOULD UPDATE but not...', this.user);
    }
    
  }

  render() {
    if (!this.user) {
      return (<Host>Please wait...</Host>);
    }
    return (
      <Host>
        <h1>Edit user {this.user.name || [this.user?.givenName, this.user?.familyName].join(' ')}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Given name:
            <input type="text" value={this.user?.givenName} onInput={(e) => this.user.givenName = (e.target as any).value} />
          </label>
          <label>
            family name:
            <input type="text" value={this.user?.familyName} onInput={(e) => this.user.familyName = (e.target as any).value} />
          </label>
          <label>
            gender:
            <input type="text" value={this.user?.gender} onInput={(e) => this.user.gender = (e.target as any).value} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {this.user._id ? 
          <button type="button" onClick={() => this.handleDelete()}>Delete this user</button>
          : '' }
      </Host>
    );
  }

}
