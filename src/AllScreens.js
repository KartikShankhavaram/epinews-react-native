import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import NewsScreen from "./screens/NewsScreen";
import SourceScreen from "./screens/SourceScreen";
import {connect} from "react-redux";
import {loadNews, saveToPersist} from "./actions";
import Swiper from 'react-native-swiper';
import HeaderTitle from "./components/HeaderTitle";
import {SAVE_KEY_SOURCES} from "./actions/types";

class AllScreens extends Component{

	static navigationOptions = {
		headerTitle: <HeaderTitle title="EpiNews"/>
	};

	state = {extra: 0};

	onIndexChanged(index) {
		console.log('INDEX', index);
		if(index === 0) {
			Keyboard.dismiss();
			this.props.saveToPersist(SAVE_KEY_SOURCES, this.props.selectedSources);
			if(!this.props.noSources) {
				this.props.loadNews(this.props.sources);
				a = this.state.extra + 1;
				this.setState({extra: a});
			}
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

export default connect(mapStateToProps, {loadNews, saveToPersist})(AllScreens);