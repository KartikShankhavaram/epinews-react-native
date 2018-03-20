import {SET_ERRORED_NEWS, SET_REFRESHING_NEWS} from "./types";

export const fetchNews = (sources) => {
	return (dispatch) => {

	}
};

export const setRefreshingNews = (value) => {
	return {
		type: SET_REFRESHING_NEWS,
		payload: value,
	}
};

export const setErroredNews = (value) => {
	return {
		type: SET_ERRORED_NEWS,
		payload: value,
	}
};