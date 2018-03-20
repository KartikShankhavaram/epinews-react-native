import {combineReducers} from 'redux';
import NewsReducer from "./NewsReducer";
import SourcesReducer from "./SourcesReducer";

export default combineReducers({
	news: NewsReducer,
	source: SourcesReducer
});