import {
	LOAD_SOURCES, ON_CLICKED_SOURCES, SEARCH_SOURCES_RESULT, SET_ERRORED_SOURCES, SET_NO_SOURCES,
	SET_REFRESHING_SOURCES, SET_SAVED_SOURCES

} from "./types";
import * as axios from "axios";
import {API_KEY} from "../../env_var";

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
		console.log('API_KEY', API_KEY);
		axios.get(`https://newsapi.org/v2/sources?apiKey=${API_KEY}&language=en`)
			.then((response) => onFetchSuccess(response, dispatch))
			.catch(() => onFetchFailed(dispatch));
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
		let term = searchTerm.toLowerCase();
		let text;
		for ({id, name, desc} of array) {
			text = name.toLowerCase();
			if (text.includes(term)) {
				searchedArray.push({id, name, desc});
			}
		}
		dispatch({ type: SEARCH_SOURCES_RESULT, payload: searchedArray})
	}
};

export const onPressedSource = (source, selectedSources) => {
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

export const setNoSources = (value) => {
	return {
		type: SET_NO_SOURCES,
		payload: value
	}
};

export const setSavedSources = (sources) => {
	return {
		type: SET_SAVED_SOURCES,
		payload: sources
	}
};

