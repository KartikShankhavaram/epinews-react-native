import {
	LOAD_SOURCES, ON_CLICKED_SOURCES, SEARCH_SOURCES_RESULT, SET_ERRORED_SOURCES, SET_REFRESHING_SOURCES,

} from "./types";
import * as axios from "axios";

export const setSourcesRefreshing = (value) => {
	return {
		type: SET_REFRESHING_SOURCES,
		payload: value,
	}
};

export const setSourcesFetchErrored = (value) => {
	return {
		type: SET_ERRORED_SOURCES,
		payload: value,
	}
};

export const getSources = () => {
	return (dispatch) => {
		dispatch({ type: SET_REFRESHING_SOURCES, payload: true});
		axios.get('https://newsapi.org/v2/sources?apiKey=e9f9005bce6a4342ab3030555214596b&language=en')
			.then((response) => onFetchSuccess(response, dispatch))
			.catch((error) => onFetchFailed(dispatch));
	}
};

const onFetchSuccess = (response, dispatch) => {
	let sourceArray = [];
	let rawArray = response.data.sources;

	// using foreach
	/*rawArray.forEach(function (value, index) {
		source = {
			id: value.id,
			name: value.name,
			desc: value.description,
		};
		sourceArray.push(source);
	})*/

	for ({id, name, description} of rawArray) {
		let source = {
			id: id,
			name: name,
			desc: description,
		};
		sourceArray.push(source);
	}
	console.log('ARRAY', sourceArray);
	dispatch({ type: LOAD_SOURCES, payload: sourceArray});
	dispatch({ type: SET_REFRESHING_SOURCES, payload: false});
};

const onFetchFailed = (dispatch) => {
	dispatch( {type: SET_ERRORED_SOURCES, payload: true} );
	dispatch({ type: SET_REFRESHING_SOURCES, payload: false});
};

export const searchSources = ({searchTerm, array}) => {
	return (dispatch) => {
		let searchedArray = [];
		console.log('SEARCH-TERM', searchTerm);
		console.log('SOURCE-ARRAY', array);
		let term = searchTerm.toLowerCase();
		console.log('TERM', term);
		let text;
		for ({id, name, desc} of array) {
			console.log('NAME', name);
			text = name.toLowerCase();
			console.log('LOWER-CASE-NAME', text);
			if (text.includes(term)) {
				searchedArray.push({id, name, desc});
			}
		}
		dispatch({ type: SEARCH_SOURCES_RESULT, payload: searchedArray})
	}
};

export const onClickedSource = (source, selectedSources) => {
	let index = selectedSources.indexOf(source);
	if (index === -1) {
		selectedSources.push(source);
	} else {
		selectedSources.splice(index, 1);
	}

	return {
		type: ON_CLICKED_SOURCES,
		payload: selectedSources
	};
};