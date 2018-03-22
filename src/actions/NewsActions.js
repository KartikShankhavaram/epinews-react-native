import {LOAD_NEWS, SET_ERRORED_NEWS, SET_REFRESHING_NEWS} from "./types";
import * as axios from "axios";
import {API_KEY} from "../../secret";

export const loadNews = (sources) => {
	return (dispatch) => {
		let promises = [];
		let newsArray = [];
		for(let source of sources) {
			let url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`;
			promises.push(axios.get(url));
		}
		dispatch({type: SET_REFRESHING_NEWS, payload: true});
		axios.all(promises).then(
			(results) => {
				for(let result of results) {
					if(result.data.status === "ok") {
						onStatusOK(result.data, dispatch, newsArray);
					}
				}
			}
		);
	}
};

const onStatusOK = (obj, dispatch, newsArray) => {
	let rawArray = obj.articles;

	for (let object of rawArray) {
		let article = {
			title: object.title,
			author: object.author,
			imgSrc: object.urlToImage,
			weblink: object.url
		};
		newsArray.push(article);
	}
	console.log('NEWS-ARRAY', newsArray);
	dispatch({type: SET_REFRESHING_NEWS, payload: false});
	dispatch({type: LOAD_NEWS, payload: newsArray});
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
