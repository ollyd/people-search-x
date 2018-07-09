import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
	apiKey: 'AIzaSyAow6N0f6ErRJMKqfaBel_x0-Tq6jgE9V0',
	authDomain: 'people-search-x.firebaseapp.com',
	databaseURL: 'https://people-search-x.firebaseio.com',
	projectId: 'people-search-x'
})

const db = firebase.firestore();
const auth = firebase.auth();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export { db, auth };
