import { db } from '../../firestore.config.js';

export default {
	GET_SKILLS({ commit }) {
		// return new Promise((resolve, reject) => {
		db.collection('skills').get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					commit('SET_SKILLS', doc.data().skills);
					// console.log(doc.data().skills, 'klklk');
				});
				// resolve();
			}).catch(error => console.log(error));
		// });
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
	ADD_CONTACT({ commit }, contact) {
		if(contact['Skills'].length > 0) {
			contact['Skills'] = contact['Skills'].split(',');
		}
		if(contact['Role'].length > 0) {
			contact['Role'] = contact['Role'].split(',');
		}
		db.collection('people').add(contact)
			.then(ref => {
				const newContact = Object.assign(contact, { id: ref.id });
				commit('SET_CONTACT', newContact);
				console.log('Document written with ID: ', ref.id);
			})
			.catch(error => console.error('Error adding document: ', error));
	},
	UPDATE_CONTACT({ commit }, contact) {
		if(contact['Skills'].length > 0) {
			contact['Skills'] = contact['Skills'].split(',');
		}
		if(contact['Role'].length > 0) {
			contact['Role'] = contact['Role'].split(',');
		}
		db.collection('people').doc(contact.id).update(contact)
			.then(() => {
				commit('UPDATE_CONTACT', contact);
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
		db.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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
		db.auth().signInWithEmailAndPassword(payload.email, payload.password)
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
		db.auth().signOut()
		commit('setUser', null);
	},
	clearError ({ commit }) {
		commit('clearError');
	}
}
