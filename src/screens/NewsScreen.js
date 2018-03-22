import React, {Component } from 'react';
import {FlatList, Text, View} from "react-native";
import {connect} from "react-redux";
import {loadNews, setNoSources, setRefreshingNews} from "../actions";
import NewsCardView from "../components/NewsCardView";

class NewsScreen extends Component {

	componentWillMount() {
		if(this.props.selectedSources === undefined || this.props.selectedSources.length === 0) {
			this.props.setNoSources(true);
		} else {
			this.props.setRefreshingNews(true);
			this.props.loadNews(this.props.selectedSources);
		}
	}

	goToLink(uri) {
		console.log('URI', uri);
		console.log('navigationProps', this.props.navigation);
		this.props.navigation.navigate('WebView',{
			source: uri
		});
	}

	handleRefresh = () => {
		console.log('REFRESH-SOURCES', this.props.selectedSources);
		if(this.props.selectedSources === undefined || this.props.selectedSources.length === 0) {
			this.props.setNoSources(true);
		} else {
			this.props.setRefreshingNews(true);
			this.props.loadNews(this.props.selectedSources);
		}
	};

	render() {
		console.log('SELECTED-SOURCES', this.props.selectedSources);
		return(
			<View style={{flex: 1}} extraData={this.props.extraData}>
				<View style={styles.selectSourceTextContainerStyle} extraData={this.props.extraData}>
					<Text style={styles.selectSourceTextStyle}>
						Select news sources by swiping towards right
					</Text>
				</View>
				<FlatList
					data={this.props.articles}
					extraData={this.props.extraData}
					renderItem={({ item }) => {
						if(item.title !== null && item.title !== undefined && item.title !== "") {
							return (
								<NewsCardView
									title={item.title}
									author={item.author}
									imgSrc={item.imgSrc}
									onPress={() => {
										this.goToLink(item.weblink);
									}}
								/>
							);
						}
					}}
					onRefresh={this.handleRefresh}
					refreshing={this.props.refreshingNews}
					onEndReachedThreshold={50}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const {articles, refreshingNews, } = state.news;
	const { selectedSources, noSources, } = state.source;
	return { articles, refreshingNews, selectedSources, noSources,};
};

const styles = {
	selectSourceTextContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	selectSourceTextStyle: {
		fontSize: 15,
		color: '#333',
		justifyContent: 'center'
	}
};

export default connect(mapStateToProps, { loadNews, setRefreshingNews, setNoSources})(NewsScreen);