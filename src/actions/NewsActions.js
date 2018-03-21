import {SET_ERRORED_NEWS, SET_REFRESHING_NEWS} from "./types";
import * as axios from "axios";

export const fetchNews = (sources) => {
	return (dispatch) => {
		for(let source in sources) {
			axios.get()
		}
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