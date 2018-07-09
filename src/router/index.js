import Vue from 'vue';
import Router from 'vue-router';
import Search from '~/components/Search';
import Profile from '~/components/User/Profile';
import Signup from '~/components/User/Signup';
import Signin from '~/components/User/Signin';
import ManageContacts from '~/components/User/ManageContacts';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Search,
			beforeEnter: AuthGuard
		},
		{
			path: '/search',
			name: 'Search',
			component: Search,
			beforeEnter: AuthGuard
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			beforeEnter: AuthGuard
		},
		{
			path: '/signup',
			name: 'Signup',
			component: Signup
		},
		{
			path: '/signin',
			name: 'Signin',
			component: Signin
		},
		{
			path: '/manage-contacts',
			name: 'Manage',
			component: ManageContacts,
			beforeEnter: AuthGuard
		}
	],
	mode: 'history'
});
