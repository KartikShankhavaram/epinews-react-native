import React, {Component} from 'react';
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from 'redux-thunk';
import {Provider} from "react-redux";
import reducer from './src/reducers'
import AllScreens from "./src/AllScreens";
import {StackNavigator} from 'react-navigation';
import NewsWebView from "./src/screens/NewsWebView";

const RootStack = StackNavigator(
	{
		Main: {
			screen: AllScreens,
		},
		WebView: {
			screen: NewsWebView
		}
	},
	{
		initialRouteName: 'Main',
	}
);


export default class App extends Component {
	render() {
		let store=createStore(reducer, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<RootStack />
			</Provider>
		);
	}
}