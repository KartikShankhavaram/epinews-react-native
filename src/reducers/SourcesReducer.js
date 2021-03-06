import {
	LOAD_SOURCES, SEARCH_SOURCES_RESULT, SET_ERRORED_SOURCES, SET_REFRESHING_SOURCES,
	ON_CLICKED_SOURCES, SET_NO_SOURCES, SET_SOURCES_FROM_STORAGE, STORING_SOURCE, SET_SAVED_SOURCES
} from "../actions/types";

const INITIAL_STATE = {
	sources: [{
		id: '',
		name: '',
		desc: '',
	}],
	refreshingSources: false,
	erroredSources: false,
	searchResultSources: [{
		id: '',
		name: '',
		desc: '',
	}],
	selectedSources: [],
	noSources: true,
	storingSources: false,
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SET_REFRESHING_SOURCES:
			return { ...state, refreshingSources: action.payload};
		case SET_ERRORED_SOURCES:
			return { ...state, erroredSources: action.payload};
		case LOAD_SOURCES:
			return { ...state, sources: action.payload};
		case SEARCH_SOURCES_RESULT:
			return { ...state, searchResultSources: action.payload};
		case ON_CLICKED_SOURCES:
			return {...state, selectedSources: action.payload};
		case SET_NO_SOURCES:
			return { ...state, noSources: action.payload};
		case SET_SAVED_SOURCES:
			return { ...state, selectedSources: action.payload};
		default:
			return state;
	}
}