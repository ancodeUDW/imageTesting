import thunks               from './thunks';
import actionCreators       from './actionCreators';

export * from './actionCreators';

export {
  thunks,
}

export default {
  ...actionCreators,
  thunks,
}
