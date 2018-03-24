import React, {Component} from 'react';
import {connect} from "react-redux";
import {
	getSources, searchSources, onPressedSource, setSourcesRefreshing,
	setSavedSources, sourcesLoadedFromMemory, loadNews
} from "../actions";
import {FlatList, View, ActivityIndicator, AsyncStorage} from "react-native";
import { SearchBar } from "react-native-elements";
import SourceCardView from "../components/SourceCardView";
import {SAVE_KEY_SOURCES} from "../actions/types";

class SourceScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { selected: [] };
	}

	searchText = "";

	componentWillMount() {

		// Used to get sources from AsyncStorage
		SourceScreen.fetch(SAVE_KEY_SOURCES)
			.then((value) => {
				console.log('VALUES', value);
				let sources;
				if(value !== null && value !== undefined) {
					sources = JSON.parse(value);
					console.log('GAINED-SOURCES', sources);
					this.props.sourcesLoadedFromMemory(true);
					this.props.loadNews(sources);
				} else {
					sources = [];
				}
				this.props.setSavedSources(sources);
				this.setState({ selected: sources });
				console.log('STATE', this.state);
			});

		this.props.setSourcesRefreshing(true);
		this.props.getSources();
	}

	static async fetch(key) {
		try {
			let dataString = await AsyncStorage.getItem(key);
			if(dataString !== null) {
				const array = JSON.parse(dataString);
				console.log('SAVED_ARRAY', array);
				return array;
			}
		} catch(error) {
			console.log(`Could not fetch because of ${error}`);
		}
	}

	onSearchChangeText = (text) => {
		this.searchText = text;
		this.props.searchSources({ searchTerm: text, array: this.props.sources });
	};

	renderHeader = () => {
		return <SearchBar
			placeholder="Type Here..."
			lightTheme
			round
			onChangeText={this.onSearchChangeText}
		/>;
	};

	handleRefresh = () => {
		this.props.setSourcesRefreshing(true);
		this.props.getSources();
	};

	selectSourceArray() {
		if(this.searchText !== "") {
			return this.props.searchResultSources;
		} else {
			return this.props.sources;
		}
	}

	renderBackground = (item) => {
		let index = this.state.selected.indexOf(item.id);
		if(index === -1) {
			return {backgroundColor: '#FFF'};
		} else {
			return {backgroundColor: '#CCC'};
		}
	};

	onItemPress(item) {
		console.log('ON-CLICK', item);
		let a = this.state.selected.slice();
		console.log('ON-CLICK-STATE', a);
		let index = a.indexOf(item.id);
		if(index !== -1)
			a.splice(index, 1);
		else
			a.push(item.id);
		console.log('LOCAL-SELECTED', a);
		this.setState({selected: a});
		this.props.onClickedSource(item.id, this.props.selectedSources);
	}

	render() {
		return(
			<View>
				<FlatList
					data={this.selectSourceArray()}
					extraData={this.state}
					renderItem={({ item }) => {
						if(item.name !== null && item.name !== undefined && item.name !== "") {
							return (
								<SourceCardView
									onPress={() => {
										this.onItemPress(item)
									}}
									title={item.name}
									desc={item.desc}
									style={this.renderBackground(item)}
								/>
							);
						}
					}}
					onRefresh={this.handleRefresh}
					refreshing={this.props.refreshingSources}
					keyExtractor={item => item.id}
					ListHeaderComponent={this.renderHeader}
					onEndReachedThreshold={50}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const {sources, searchResultSources, refreshingSources, selectedSources} = state.source;
	return {sources, refreshingSources, searchResultSources, selectedSources};
};

export default connect(mapStateToProps, {
	getSources,
	setSourcesRefreshing,
	searchSources,
	onClickedSource: onPressedSource,
	setSavedSources,
	sourcesLoadedFromMemory,
	loadNews
})(SourceScreen);