export default {
	SET_CONTACTS(state, contacts) {
		state.contacts = contacts;
	},
	SET_SKILLS(state, skills) {
		state.skills = skills;
	},
	SET_NEW_SKILLS(state, newSkills) {
		state.skills = newSkills;
	},
	SET_CONTACT(state, contact) {
		state.contacts.unshift(contact);
	},
	UNSET_CONTACT(state, id) {
		const filteredContacts = state.contacts.filter(contact => contact.id !== id);
		state.contacts = filteredContacts;
	},
	UPDATE_CONTACT(state, contact) {
		const index = state.contacts.findIndex(item => item.id === contact.id);
		state.contacts.splice(index, 1, contact);
	},
	SET_USER(state, payload) {
		state.user = payload;
	},
	SET_LOADING(state, payload) {
		state.loading = payload;
	},
	SET_ERROR(state, payload) {
		state.error = payload;
	},
	CLEAR_ERROR(state) {
		state.error = null;
	}
}
