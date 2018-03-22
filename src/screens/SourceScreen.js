import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSources, searchSources, onPressedSource, setSourcesRefreshing, getFromPersist} from "../actions";
import {FlatList, View, ActivityIndicator} from "react-native";
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
		this.props.getFromPersist(SAVE_KEY_SOURCES);

		this.props.setSourcesRefreshing(true);
		this.props.getSources();
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
		this.props.getFromPersist();
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
		console.log('SOURCE_PROPS', this.props);
		let a = this.state.selected;
		let index = a.indexOf(item.id);
		if(index !== -1)
			a.splice(index, 1);
		else
			a.push(item.id);
		this.setState({selected: a});
		this.props.onClickedSource(item.id, this.props.selectedSources);
	}

	render() {
		console.log('Entered');
		console.log("DATA-ARRAY", this.props.sources);
		console.log("ARRAY-SELECTED", this.props.searchResultSources);
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
	getFromPersist,
})(SourceScreen);