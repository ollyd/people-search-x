import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import * as firebase from 'firebase';
import InstantSearch from 'vue-instantsearch';
import App from './App.vue';
import router from './router';
import { store } from './store';
import firebaseConfig from '../firebase.config';
import algoliaConfig from '../algolia.config';
import AlertCmp from './components/Shared/Alert.vue';


Vue.component('app-alert', AlertCmp);
Vue.use(InstantSearch);
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
	created() {
		// configure firebase
		firebase.initializeApp(firebaseConfig);
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.dispatch('autoSignIn', user);
			}
		});

		// configure algolia
		const algolia = algoliasearch(algoliaConfig.algoliaAppID, algoliaConfig.algoliaApiKey);
		algolia.initIndex(algoliaConfig.algoliaIndexName);
	}
});
