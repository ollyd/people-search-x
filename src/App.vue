<template>
	<v-app dark>
		<v-navigation-drawer
			clipped
			fixed
			v-model="drawer"
			app
		>
			<v-list dense>
				<v-list-tile @click="">
					<v-list-tile-action>
						<v-icon>dashboard</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Dashboard</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="">
					<v-list-tile-action>
						<v-icon>settings</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Settings</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar app fixed clipped-left>
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>StackMark</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-xs-only">
				<v-btn
					flat
					v-for="item in menuItems"
					:key="item.title"
					:to="item.link">
					<v-icon left dark>{{ item.icon }}</v-icon>
					{{ item.title }}
				</v-btn>
				<v-btn
					v-if="userIsAuthenticated"
					flat
					@click="onLogout">
					<v-icon left dark>exit_to_app</v-icon>
					Logout
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
			<main>
				<router-view></router-view>
			</main>
		<v-footer app fixed>
			<span>&copy; 2017</span>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		data: () => ({
			drawer: false
		}),
		props: {
			source: String
		},
		computed: {
			menuItems () {
				let menuItems = [
					{ icon: 'power_settings_new', title: 'Sign in', link: '/signin' }
				]
				if (this.userIsAuthenticated) {
					menuItems = [
						{ icon: 'person', title: 'Profile', link: '/profile' }
					]
				}
				return menuItems;
			},
			userIsAuthenticated () {
				return this.$store.getters.user !== null && this.$store.getters.user !== undefined
			}
		},
		methods: {
			onLogout () {
				this.$store.dispatch('logout')
			}
		}
	}
</script>

<style lang="stylus">
	@import '../node_modules/vuetify/src/stylus/settings/_colors'
	.toolbar__content { border-bottom: 1px solid $blue.darken-2; }
	.btn--active .btn__content:before, .btn:focus .btn__content:before {
		background-color: $grey.darken-4;
	}
	.btn:hover .btn__content:before {
		background-color: $grey.darken-2;
	}
	main {
		display: flex;
		justify-content: center;
		height: 100%;
	}
</style>
