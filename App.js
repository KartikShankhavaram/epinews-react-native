import React, {Component} from 'react';
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from 'redux-thunk';
import {Provider} from "react-redux";
import {Text, View} from "react-native";
import reducer from './src/reducers'
import * as axios from "axios";
import NewsCardView from "./src/components/NewsCardView";
import SourceCardView from "./src/components/SourceCardView";
import SourceScreen from "./src/screens/SourceScreen";

export default class App extends Component {
	componentWillMount() {
		axios.get('https://newsapi.org/v2/sources?apiKey=e9f9005bce6a4342ab3030555214596b&language=en')
			.then((response) => console.log('RESPONSE', response.data))
			.catch((error) => console.log('ERROR', error));

	}

	render() {
		let store=createStore(reducer, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<SourceScreen />
			</Provider>
		);
	}
}