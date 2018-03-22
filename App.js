import React, {Component} from 'react';
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from 'redux-thunk';
import {Provider} from "react-redux";
import reducer from './src/reducers'
import AllScreens from "./src/AllScreens";


export default class App extends Component {
	render() {
		let store=createStore(reducer, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<AllScreens />
			</Provider>
		);
	}
}