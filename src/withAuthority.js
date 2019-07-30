import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToLogin = () => <Redirect to='/login' />
export default function withAuthority(WarpComponent) {
  
  const auth=true;//  some  validation
  // ...
  return auth ? WarpComponent : RedirectToLogin

}