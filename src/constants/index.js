//beatles in london
	// export const COMPANY = '13';
	// export const APP = '221b3ecd-7bb8-47ae-afbb-51bb59406eab';

//taft museum
	//export const COMPANY = '1';
	//export const APP = 'ae90e835-f1b8-47ec-942a-916f6141f0e0';

// corvette museum
	export const COMPANY = '16';
	export const APP = 'd7f411b4-98a2-4630-bb9c-874a9c2e68de';

// // National museum of US Air Force
	// export const COMPANY = '17';
	// export const APP = '3a297ab9-39fa-487a-a3a2-6b13003e7f5f';
export const HOME_SCREEN_API = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '.json';
export const GET_AUDIO_TOUR = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '/tours.json?page=';
export const GET_PURCHASE_TOUR = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '/tours.json?page=1&per_page=10';
export const GET_FEATURED_TOURS = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '/featured.json';
export const REGISTER_API = 'http://www.tourize.com/api/v1/registrations.json';
export const LOGIN_API = 'http://www.tourize.com/api/v1/tokens.json';
export const TOUR_DETAIL = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '/tours/';
export const PURCHASE_DETAIL = 'http://www.tourize.com/api/v1/purchases/';
export const BUY_FREE_TOUR = 'http://www.tourize.com/api/v1/tours/';
export const PURCHASED_TOURS = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '/purchases.json?user_token=';
export const GET_ALL_CONTENT = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '/contents.json?page=';
export const GET_MAP_DATA = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '/maps';
export const GET_MY_PROFILE = 'http://www.tourize.com/api/v1/users/';
export const GET_MORE_LIST = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP + '/more.json';
export const GET_DISCUSSION_DATA = 'http://www.tourize.com/api/v1/companies/'  + COMPANY + '/apps/' + APP + "/contents?page=";
export const GET_ALL_CONTENT_DATA = 'http://www.tourize.com/api/v1/companies/'+COMPANY + '/apps/' + APP + "/all_content?page=";
export const GET_QUESTIONS_DATA = 'http://www.tourize.com/api/v1/companies/'+COMPANY + '/apps/' + APP + "/questions?page=";
export const SEARCH_RESULT = 'http://www.tourize.com/api/v1/companies/'+COMPANY + '/apps/' + APP +'/search?q=';
export const TABS = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP +'/app_screens';
export const CONTENT_DETAILS = 'http://www.tourize.com/api/v1/companies/' + COMPANY + '/apps/' + APP +'/contents/';
//=test&page=1&per_page=10&user_token=RhGyfbgMTkr_5nPhDesY'
