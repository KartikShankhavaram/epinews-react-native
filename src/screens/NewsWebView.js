import React, {Component} from 'react';
import {View, WebView} from 'react-native';
import HeaderTitle from "../components/HeaderTitle";

class NewsWebView extends Component {

	static navigationOptions = ({ navigation }) => {
		const {params} = navigation.state;
		return {
			headerTitle: <HeaderTitle title={params.source}/>,
			headerTitleStyle :{textAlign: 'center',alignSelf:'center', marginRight: 56},
			headerRight: <View />
		}
	};

	render() {

		const { params } = this.props.navigation.state;
		const uri = params.uri;

		return(
			<WebView
				source={{uri: uri}}
				style={{marginTop: 20}}
			/>
		);
	}
}

export default NewsWebView;