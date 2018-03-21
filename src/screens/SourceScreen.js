import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSources, searchSources, onClickedSource, setSourcesRefreshing} from "../actions";
import {FlatList, View, ActivityIndicator} from "react-native";
import { SearchBar } from "react-native-elements";
import SourceCardView from "../components/SourceCardView";

class SourceScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { selected: [] };
	}

	componentWillMount() {
		this.props.setSourcesRefreshing(true);
		this.props.getSources();
	}

	onSearchChangeText = (text) => {
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
		if(this.props.searchResultSources[0].name === "") {
			return this.props.sources;
		}
		return this.props.searchResultSources;
	}

	renderLoadingShimmer() {
		console.log('REFRESHING', this.props.refreshingSources);
		if(this.props.refreshingSources) {
			console.log('REFRESHING', 'true');
			return(
				<View style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<ActivityIndicator
						size={'large'}
					/>
				</View>
			);
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
		this.props.onClickedSource(item.id, this.props.selectedSources);
		let a = this.state.selected;
		let index = a.indexOf(item.id);
		if(index !== -1)
			a.splice(index, 1);
		else
			a.push(item.id);
		this.setState({selected: a});
	}

	render() {
		console.log('Entered');
		console.log("DATA-ARRAY", this.props.sources);
		console.log("ARRAY-SELECTED", this.props.searchResultSources);
		return(
				<FlatList
					data={this.selectSourceArray()}
					extraData={this.state}
					renderItem={({ item }) => {
						return(
							<SourceCardView
								onPress={() => {this.onItemPress(item)}}
								title={item.name}
								desc={item.desc}
								style={this.renderBackground(item)}
							/>
						);
					}}
					onRefresh={this.handleRefresh}
					refreshing={this.props.refreshingSources}
					keyExtractor={item => item.id}
					ListHeaderComponent={this.renderHeader}
					onEndReachedThreshold={50}
				/>

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
	onClickedSource
})(SourceScreen);