<template>
	<v-app dark>
		<v-navigation-drawer
			disable-resize-watcher
			clipped
			fixed
			v-model="drawer"
			app
		>
			<v-list dense>
				<v-list-tile @click="goToRoute('/search')">
					<v-list-tile-action>
						<v-icon>search</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Contact Search</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="goToRoute('manage-contacts')">
					<v-list-tile-action>
						<v-icon>person_add</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Manage Contacts</v-list-tile-title>
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
		<v-toolbar app fixed clipped-left class="cyan darken-4">
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>Contact DB</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-xs-only">
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
		<v-footer></v-footer>
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
			userIsAuthenticated () {
				return this.$store.getters.user !== null && this.$store.getters.user !== undefined
			}
		},
		methods: {
			onLogout () {
				this.$store.dispatch('logout');
			},
			goToRoute(route) {
				this.drawer = false;
				this.$router.push(route);
			}
		}
	}
</script>

<style lang="stylus">
	@import '../node_modules/vuetify/src/stylus/settings/_colors'
	.v-btn--active .btn__content:before, .btn:focus .btn__content:before {
		background-color: $grey.darken-4;
	}
	.v-btn:hover .btn__content:before {
		background-color: $grey.darken-2;
	}
	main {
		display: flex;
		justify-content: center;
		height: 100%;
	}
	.v-toolbar {
		box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.1);
	}
	.v-toolbar__content {
		height: 48px !important;
	}
	.v-navigation-drawer {
		margin-top: 48px !important;
	}
</style>
