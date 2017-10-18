// reducers local to project
import LoginReducer from '../screens/login/LoginReducer';
import HomeReducer from '../screens/home/HomeReducer';
import AudioTourReducer from '../screens/audio/AudioTourReducer';
import SignUpReducer from '../screens/signup/SignUpReducer';
import ProfileReducer from '../screens/profile/ProfileReducer';
import PurchaseTourDetailReducer from '../screens/purchaseTourDetail/PurchaseTourDetailReducer';
import AudioTourDetailReducer from '../screens/audioTourDetail/AudioTourDetailReducer';
import MapsReducer from '../screens/maps/MapsReducer';
import MoreReducer from '../screens/more/MoreReducer';
import DiscussionReducer from '../screens/content/discussionTab/DiscussionReducer';
import AllTabReducer from '../screens/content/alltabs/AllTabReducer';
import QuestionsReducer from '../screens/content/qandaTab/QuestionsReducer';
import SearchReducer from '../screens/content/searchTab/SearchReducer';
import RouterReducer from '../RouterReducer'
import ContentDetailsReducer from '../screens/content/contentDetail/ContentDetailsReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	LoginReducer: LoginReducer,
	HomeReducer: HomeReducer,
	AudioTourReducer: AudioTourReducer,
	SignUpReducer: SignUpReducer,
	ProfileReducer: ProfileReducer,
	AudioTourDetailReducer: AudioTourDetailReducer,
	PurchaseTourDetailReducer: PurchaseTourDetailReducer,
	MapsReducer: MapsReducer,
	MoreReducer: MoreReducer,
	DiscussionReducer: DiscussionReducer,
	AllTabReducer: AllTabReducer,
	QuestionsReducer: QuestionsReducer,
	SearchReducer: SearchReducer,
	RouterReducer: RouterReducer,
	ContentDetailsReducer: ContentDetailsReducer,
});

export default reducers;
