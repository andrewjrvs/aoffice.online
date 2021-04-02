
import { h } from '@stencil/core';
import store from '../utils/auth-store';
import { userHasRole } from '../utils/person-utls';

export const RestrictedRoute = ({ component, oa_role, ...props}: { [key: string]: any}) => {
    const Component = component;
    return (
      <stencil-route {...props} routeRender={
        (props: { [key: string]: any}) => {
          if (store.state.isAuthenticated && (!oa_role || userHasRole(store.state.user, oa_role))) {
            return <Component {...props} {...props.componentProps}></Component>;
          }
          return <stencil-router-redirect url="/login"></stencil-router-redirect>
        }
      }/>
    );
  }