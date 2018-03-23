import React, {Component} from 'react';
import {ActivityIndicator, View, WebView} from 'react-native';
import HeaderTitle from "../components/HeaderTitle";

class NewsWebView extends Component {

	static navigationOptions = ({ navigation }) => {
		const {params} = navigation.state;
		return {
			headerTitle: <HeaderTitle title={params.source}/>,
			headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
			headerRight: <View/>
		}
	};

	renderLoadingView() {
		return (
			<ActivityIndicator
				color='#bc2b78'
				size='large'
				style={styles.activityIndicator}
			/>
		);
	}

	render() {

		const { params } = this.props.navigation.state;
		const uri = params.uri;

		return(
			<WebView
				source={{uri: uri}}
				style={{marginTop: 20}}
				renderLoading={this.renderLoadingView}
				startInLoadingState={true}
			/>
		);
	}
}

const styles = {
	activityIndicator: {
		alignItems: 'center',
		justifyContent: 'center'
	}
};

export default NewsWebView;