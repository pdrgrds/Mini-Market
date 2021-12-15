import { rootSaga } from './root';
import reducers from './reducer/index';
import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();
let middlewares = applyMiddleware(sagaMiddleware);
const store = createStore(
  reducers,
  compose(middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;