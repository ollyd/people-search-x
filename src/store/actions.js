import { db, auth } from '../../firestore.config.js';

export default {
	GET_SKILLS({ commit }) {
		return new Promise((resolve, reject) => {
			db.collection('skills').get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						commit('SET_SKILLS', doc.data().skills);
					});
					resolve();
				}).catch(error => console.log(error));
		});
	},
	GET_CONTACTS({ commit }) {
		return new Promise((resolve, reject) => {
			const contacts = [];
			db.collection('people').get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						contacts.push({ id: doc.id, ...doc.data(), value: false });
					});
					commit('SET_CONTACTS', contacts);
					resolve();
				}).catch(error => console.log(error));
		});
	},
	CHECK_FOR_NEW_SKILLS({ dispatch, state }, skills) {
		const newSkills = [];
		skills.map(skill => {
			if(!state.skills.includes(skill)) {
				newSkills.push(skill);
			}
		})
		if(newSkills.length > 0) {
			dispatch('INDEX_NEW_SKILLS', newSkills);
		}
	},
	INDEX_NEW_SKILLS({ commit, state }, newSkills) {
		newSkills = newSkills.concat(state.skills);
		db.collection('skills').doc('5w9p1NSCmAl2KW8Q5vWt').update({ skills: newSkills })
			.then(() => {
				commit('SET_NEW_SKILLS', newSkills);
				console.log('New skills updated: ', newSkills);
			})
			.catch(error => console.error('Error updating skills: ', error));
	},
	ADD_CONTACT({ commit, dispatch }, contact) {
		db.collection('people').add(contact)
			.then(ref => {
				const newContact = Object.assign(contact, { id: ref.id });
				dispatch('CHECK_FOR_NEW_SKILLS', newContact.skills);
				commit('SET_CONTACT', newContact);
				console.log('Document written with ID: ', ref.id);
			})
			.catch(error => console.error('Error adding document: ', error));
	},
	UPDATE_CONTACT({ commit, dispatch }, contact) {
		db.collection('people').doc(contact.id).update(contact)
			.then(() => {
				commit('UPDATE_CONTACT', contact);
				dispatch('CHECK_FOR_NEW_SKILLS', contact.skills);
				console.log('Document updated, with ID: ', contact.id)
			})
			.catch(error => console.error('Error updating document: ', error));
	},
	DELETE_CONTACT({ state, commit }, id) {
		db.collection('people').doc(id).delete()
			.then(() => {
				commit('UNSET_CONTACT', id);
				console.log('Document deleted with ID: ', id);
			})
			.catch(error => console.error('Error deleting document: ', error));
	},
	USER_CREDENTIALS({ commit }, user) {
		commit('SET_LOADING', false);
		const SET_USER = {
			id: user.uid
		}
		commit('SET_USER', SET_USER);
	},
	ERROR_CODE({ commit }, error) {
		commit('SET_LOADING', false);
		commit('SET_ERROR', error.message);
	},
	SIGN_USER_UP({ commit, dispatch }, payload) {
		commit('SET_LOADING', true);
		commit('CLEAR_ERROR');
		auth.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(user => {
				dispatch('USER_CREDENTIALS', user);
			})
			.catch(err => {
				dispatch('ERROR_CODE', err);
			})
	},
	SIGN_USER_IN({ commit, dispatch }, payload) {
		commit('SET_LOADING', true);
		commit('CLEAR_ERROR');
		auth.signInWithEmailAndPassword(payload.email, payload.password)
			.then(user => {
				dispatch('USER_CREDENTIALS', user);
			})
			.catch(err => {
				dispatch('ERROR_CODE', err);
			})
	},
	AUTO_SIGN_IN({ commit }, payload) {
		commit('SET_USER', { id: payload.uid });
	},
	LOGOUT({ commit }) {
		auth.signOut()
		commit('SET_USER', null);
	},
	CLEAR_ERROR({ commit }) {
		commit('CLEAR_ERROR');
	}
}
