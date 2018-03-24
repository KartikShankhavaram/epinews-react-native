import {LOAD_NEWS, SET_ERRORED_NEWS, SET_REFRESHING_NEWS, SOURCES_LOADED_FROM_MEMORY} from "./types";
import * as axios from "axios";
import {API_KEY} from "../../env_var";

export const loadNews = (sources) => {
	console.log('news', 'loading...');
	console.log('news_sources', sources);
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
		).catch(
			() => {
				onRequestErrored(dispatch);
			}
		);
	}
};

const onRequestErrored = (dispatch) => {
	dispatch({type: SET_ERRORED_NEWS, payload: true});
	dispatch({type: SET_REFRESHING_NEWS, payload: false});
	dispatch({type: SOURCES_LOADED_FROM_MEMORY, payload: false});

};

const onStatusOK = (obj, dispatch, newsArray) => {
	let rawArray = obj.articles;

	for (let object of rawArray) {
		let author = object.author;
		if(author !== null && author.startsWith('http')) {
			author = "";
		}
		let article = {
			source: object.source.name,
			title: object.title,
			author: author,
			imgSrc: object.urlToImage,
			weblink: object.url
		};
		newsArray.push(article);
	}
	console.log('news', newsArray);
	dispatch({type: SET_REFRESHING_NEWS, payload: false});
	dispatch({type: LOAD_NEWS, payload: newsArray});
	dispatch({type: SOURCES_LOADED_FROM_MEMORY, payload: false});
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
