import React, {Component} from 'react';
import NewsScreen from "./screens/NewsScreen";
import SourceScreen from "./screens/SourceScreen";
import {connect} from "react-redux";
import {loadNews} from "./actions";
import Swiper from 'react-native-swiper';

class AllScreens extends Component{

	state = {extra: 0};

	onIndexChanged(index) {
		console.log('INDEX', index);
		if(index === 0 && !this.props.noSources) {
			this.props.loadNews(this.props.sources);
			a = this.state.extra + 1;
			this.setState({extra: a});
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
				<NewsScreen extraData={this.state}/>
				<SourceScreen/>
			</Swiper>
		);
	}
}

const mapStateToProps = (state) => {
	const { sources, noSources } = state.source;
	return { sources, noSources };
};

export default connect(mapStateToProps, {loadNews})(AllScreens);