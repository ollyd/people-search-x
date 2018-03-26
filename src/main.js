import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import * as firebase from 'firebase';
import App from './App.vue';
import router from './router';
import { store } from './store';
import firebaseConfig from '../firebase.config';

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
	created() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.dispatch('autoSignIn', user);
			}
		});
	}
});
