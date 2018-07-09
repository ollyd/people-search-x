<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<v-card-text>
						<v-container>
							<div class="headline">Sign In</div>
							<form @submit.prevent="onSignin">
								<v-layout row>
									<v-flex xs12>
										<v-text-field
											name="email"
											label="Mail"
											id="email"
											v-model="email"
											type="email"
											required>
										</v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field
											name="password"
											label="Password"
											id="password"
											v-model="password"
											type="password"
											required>
										</v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex class="signin-container" xs12>
										<v-btn type="submit" :disabled="loading" :loading="loading">
											Sign in
											<span slot="loader" class="custom-loader">
												<v-icon light>cached</v-icon>
											</span>
										</v-btn>
										<div class="register">
											<span>Not registered?</span>
											<router-link class="signup-link" to="/signup">Sign Up</router-link>
										</div>
									</v-flex>
								</v-layout>
							</form>
						</v-container>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout row v-if="error">
			<v-flex xs12 sm6 offset-sm3>
				<app-alert @dismissed="onDismissed" :text="error"></app-alert>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},
		computed: {
			...mapGetters([
				'user',
				'error',
				'loading'
			])
		},
		watch: {
			user (value) {
				if (value !== null && value !== undefined) {
					this.$router.push('/')
				}
			}
		},
		methods: {
			onSignin() {
				this.$store.dispatch('SIGN_USER_IN', { email: this.email, password: this.password });
			},
			onDismissed() {
				this.$store.dispatch('CLEAR_ERROR');
			}
		}
	}
</script>

<style lang="stylus">
	@import '../../../node_modules/vuetify/src/stylus/settings/_colors'
	.container { padding: 0; }
	.headline { text-align: center; }
	.btn[type="submit"] { background-color: $blue.darken-2 !important; flex: 2; }
	.signin-container, .register {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.register { flex: 2; }
	.signup-link { text-decoration: none; padding-left: 6px; }

	@media only screen and (max-width: 599px) {
		.container { margin-top:28px }
		.headline {
			font-size: 16px !important;
			line-height: 16px !important;
		}
		.signin-container {
			flex-direction: column;
		}
		.btn[type="submit"] { width: 100%; flex: initial; margin-bottom: 12px; }
	}
</style>
