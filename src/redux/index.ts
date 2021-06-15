import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

// eslint-disable-next-line import/no-anonymous-default-export
export const getStore =  () => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];

	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(...middlewares))
	);

	sagaMiddleware.run(rootSaga);

	return store;
};
