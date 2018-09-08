import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import createHistory from "history/createBrowserHistory";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";

export const history = createHistory();

const middleware = [
	thunkMiddleware,
	routerMiddleware(history)
];

const persistConfig = {
	key: "root",
	storage,
	blacklist: ['nav']
};

const rootReducer = persistCombineReducers(persistConfig, {
	
	routing: routerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

export default () => {
	const store = createStore(rootReducer, enhancers);
	const persistor = persistStore(store);
	return {store, persistor};
}