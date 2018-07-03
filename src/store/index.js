import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: null,
		loading: false,
		error: null,
		contacts: [],
		skills: []
	},
	mutations,
	actions,
	getters
});
