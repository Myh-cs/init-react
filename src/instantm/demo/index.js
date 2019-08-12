import React from 'react';
import { gethi } from '@/redux/actions';
// import homeStyle from './home.module.scss';
import homeStyle from './home.module.scss';
gethi()();
export default () => (<h1 className={homeStyle.red}>Home page! </h1>)
