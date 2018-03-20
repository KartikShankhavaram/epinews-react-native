import {SET_ERRORED_NEWS, SET_REFRESHING_NEWS} from "../actions/types";

const INITIAL_STATE = {
	articles: [{
		title: '',
		author: '',
		imgSrc: '',
		weblink: ''
	}],
	refreshingNews: false,
	erroredNews: false,
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SET_REFRESHING_NEWS:
			return {...state, refreshingNews: action.payload};
		case SET_ERRORED_NEWS:
			return { ...state, erroredNews: action.payload};
		default:
			return state;
	}
};