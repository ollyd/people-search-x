import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: null,
		loading: false,
		error: null
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
		setLoading(state, payload) {
			state.loading = payload;
		},
		setError(state, payload) {
			state.error = payload;
		},
		clearError(state) {
			state.error = null;
		}
	},
	actions: {
		userCredentials({ commit }, user) {
			commit('setLoading', false);
			const setUser = {
				id: user.uid
			}
			commit('setUser', setUser);
		},
		errorCode({ commit }, error) {
			let customMessage;
			switch (error.code) {
			case 'EMAIL_ALREADY_EXISTS':
				customMessage = 'This email is already registered.'
				break;
			case 'auth/user-not-found':
				customMessage = 'The email address provided can\'t be found.'
				break;
			default:
				customMessage = error
			}
			commit('setLoading', false);
			commit('setError', customMessage);
			console.log(customMessage);
		},
		signUserUp ({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearError');
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					dispatch('userCredentials', user);
				})
				.catch(error => {
					dispatch('errorCode', error);
				})
		},
		signUserIn ({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearError');
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					dispatch('userCredentials', user);
				})
				.catch(error => {
					dispatch('errorCode', error);
				})
		},
		autoSignIn ({ commit }, payload) {
			commit('setUser', { id: payload.uid });
		},
		logout ({ commit }) {
			firebase.auth().signOut()
			commit('setUser', null);
		},
		clearError ({ commit }) {
			commit('clearError');
		}
	},
	getters: {
		user(state) {
			return state.user;
		},
		loading(state) {
			return state.loading;
		},
		error(state) {
			return state.error;
		}
	}
});
