import React, {Component} from 'react';
import {Keyboard, AsyncStorage} from 'react-native';
import NewsScreen from "./screens/NewsScreen";
import SourceScreen from "./screens/SourceScreen";
import {connect} from "react-redux";
import {loadNews} from "./actions";
import Swiper from 'react-native-swiper';
import HeaderTitle from "./components/HeaderTitle";
import {SAVE_KEY_SOURCES} from "./actions/types";

class AllScreens extends Component{

	static navigationOptions = {
		headerTitle: <HeaderTitle title="EpiNews"/>
	};

	state = {extra: 0};

	onIndexChanged(index) {
		if(index === 0) {
			Keyboard.dismiss();
			let dataString = JSON.stringify(this.props.selectedSources);
			if(dataString !== '[]') {
				AllScreens.save(SAVE_KEY_SOURCES, dataString)
					.then();
			}
			if(!this.props.noSources) {
				this.props.loadNews(this.props.sources);
				a = this.state.extra + 1;
				this.setState({extra: a});
			}
		}
	}

	static async save(key, data) {
		let dataString = JSON.stringify(data);
		try {
			await AsyncStorage.setItem(key, dataString);
		} catch(error) {
		}
	}

	render() {
		return (
			<Swiper
				style={{flex: 1}}
				onIndexChanged={(index) => this.onIndexChanged(index)}
				loadMinimal={true}
				loadMinimalSize={1}
				loop={false}
				extraData={this.state}
			>
				<NewsScreen navigation={this.props.navigation}/>
				<SourceScreen/>
			</Swiper>
		);
	}
}

const mapStateToProps = (state) => {
	const { sources, noSources, selectedSources } = state.source;
	return { sources, noSources, selectedSources };
};

export default connect(mapStateToProps, {loadNews})(AllScreens);