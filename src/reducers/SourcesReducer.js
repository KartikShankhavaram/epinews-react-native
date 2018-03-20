import {
	LOAD_SOURCES, SEARCH_SOURCES_RESULT, SET_ERRORED_SOURCES, SET_REFRESHING_SOURCES,
	ON_CLICKED_SOURCES
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
	selectedSources: []
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
			console.log('ACTION-PAYLOAD', action.payload);
			return { ...state, searchResultSources: action.payload};
		case ON_CLICKED_SOURCES:
			console.log('SELECTED-ARRAY', action.payload);
			return { ...state, selectedSources: action.payload};
		default:
			return state;
	}
}