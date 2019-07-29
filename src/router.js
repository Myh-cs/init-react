import Loadable from 'react-loadable';
// import Loading from './my-loading-component'; // 国际化
const loading = () => <span>loading</span>
const LoadableComponent = Loadable({
    loader: () => import('./pages/Home'),
    loading: Loading,
});
