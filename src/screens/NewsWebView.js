import React, {Component} from 'react';
import {WebView} from 'react-native';

class NewsWebView extends Component {

	render() {

		const { params } = this.props.navigation.state;
		const uri = params.source;
		console.log('WEBVIEW-URI', this.props.navigation.state);

		return(
			<WebView
				source={{uri: uri}}
				style={{marginTop: 20}}
			/>
		);
	}
}

export default NewsWebView;