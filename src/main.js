import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import VueFirestore from 'vue-firestore';
import InstantSearch from 'vue-instantsearch';
import App from './App.vue';
import router from './router';
import { store } from './store';

import AlertCmp from './components/Shared/Alert.vue';

Vue.component('app-alert', AlertCmp);
Vue.use(InstantSearch);
Vue.use(VueFirestore);
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
	created() {
		// firebase.initializeApp(firebaseConfig);
		// firebase.firestore();
		// firebase.auth().onAuthStateChanged((user) => {
		// 	if (user) {
		// 		this.$store.dispatch('autoSignIn', user);
		// 	}
		// });
	}
});
