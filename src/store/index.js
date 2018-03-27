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
			console.log(payload);
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
		errorCode({ commit }, err) {
			let error;
			switch (err.code) {
			case 'auth/email-already-in-use':
				error.message = 'The email address provided is already registered.'
				break;
			case 'auth/user-not-found':
				error.message = 'The email address provided isn\'t recognised.'
				break;
			case 'auth/wrong-password':
				error.message = 'The password provided is incorrect.'
				break;
			default:
				error = err
			}
			commit('setLoading', false);
			commit('setError', error);
			console.log(error);
		},
		signUserUp ({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearError');
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					dispatch('userCredentials', user);
				})
				.catch(err => {
					dispatch('errorCode', err);
				})
		},
		signUserIn ({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearError');
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					dispatch('userCredentials', user);
				})
				.catch(err => {
					dispatch('errorCode', err);
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
