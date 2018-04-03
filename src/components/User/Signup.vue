<template>
	<v-container>
		<v-layout row align-center>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<v-card-text>
						<v-container>
							<div class="headline">Sign Up</div>
							<form @submit.prevent="onSignup">
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
									<v-flex xs12>
										<v-text-field
											name="confirmPassword"
											label="Confirm Password"
											id="confirmPassword"
											v-model="confirmPassword"
											type="password"
											:rules="[comparePasswords]">
										</v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex  class="signup-container" xs12>
										<v-btn type="submit" :disabled="loading" :loading="loading">
										Sign up
										 <span slot="loader" class="custom-loader">
											<v-icon light>cached</v-icon>
										 </span>
										</v-btn>
										<div class="signin">
											<span>Already registered?</span>
											<router-link class="signin-link" to="/signin">Sign In</router-link>
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
				<app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
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
				password: '',
				confirmPassword: ''
			}
		},
		computed: {
			comparePasswords() {
				return this.password !== this.confirmPassword ? 'Passwords do not match' : '';
			},
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
			onSignup() {
				this.$store.dispatch('signUserUp', { email: this.email, password: this.password });
			},
			onDismissed() {
				this.$store.dispatch('clearError');
			}
		}
	}
</script>

<style lang="stylus">
	@import '../../../node_modules/vuetify/src/stylus/settings/_colors'
	.container { padding: 0; }
	.headline { text-align: center; }
	.btn[type="submit"] { background-color: $blue.darken-2 !important; }
	.signup-container, .signin {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.signin { flex: 2; }
	.signin-link { text-decoration: none; padding-left: 6px; }

	@media only screen and (max-width: 599px) {
		.container { margin-top:28px }
		.headline {
			font-size: 16px !important;
			line-height: 16px !important;
		}
		.signup-container {
			flex-direction: column;
		}
		.btn[type="submit"] { width: 100%; flex: initial; margin-bottom: 12px; }
	}
</style>
