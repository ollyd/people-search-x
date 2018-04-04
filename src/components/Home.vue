<template>
	<v-container grid-list-xl fill-height>
		<v-layout row wrap>
			<v-flex xs12 md4 fill-height>
				<v-card class="filter-container">
					<!-- <v-layout>
						<v-flex>
							1
						</v-flex>
					</v-layout> -->
				</v-card>
			</v-flex>
			<v-flex xs12 md8 fill-height>
				<v-layout row wrap>
					<v-flex xs12 md6 lg3>
						<v-card tile>
							<div class="avatar-container">
								<v-avatar class="cyan darken-3" size="70">
									<v-icon dark x-large>account_circle</v-icon>
								</v-avatar>
							</div>
							<v-card-title class="grey darken-2" primary-title>
								<div>
									<h3 class="title pb-1">Kangaroo Valley Safari</h3>
									<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="cyan accent-2">View Profile</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
					<v-flex xs12 md6 lg3>
						<v-card tile>
							<div class="avatar-container">
								<v-avatar class="cyan darken-3" size="70">
									<v-icon dark x-large>account_circle</v-icon>
								</v-avatar>
							</div>
							<v-card-title class="grey darken-2" primary-title>
								<div>
									<h3 class="title pb-1">Kangaroo Valley Safari</h3>
									<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="cyan accent-2">View Profile</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
					<v-flex xs12 md6 lg3>
						<v-card tile>
							<div class="avatar-container">
								<v-avatar class="cyan darken-3" size="70">
									<v-icon dark x-large>account_circle</v-icon>
								</v-avatar>
							</div>
							<v-card-title class="grey darken-2" primary-title>
								<div>
									<h3 class="title pb-1">Kangaroo Valley Safari</h3>
									<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="cyan accent-2">View Profile</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
					<v-flex xs12 md6 lg3>
						<v-card tile>
							<div class="avatar-container">
								<v-avatar class="cyan darken-3" size="70">
									<v-icon dark x-large>account_circle</v-icon>
								</v-avatar>
							</div>
							<v-card-title class="grey darken-2" primary-title>
								<div>
									<h3 class="title pb-1">Kangaroo Valley Safari</h3>
									<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="cyan accent-2">View Profile</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-flex>
			<v-layout v-if="loading">
				<v-flex xs12 class="text-xs-center">
					<v-progress-circular
						indeterminate
						class="primary--text"
						:width="3"
						:size="50">
					</v-progress-circular>
				</v-flex>
			</v-layout>
		</v-layout>
	</v-container>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.container { padding: 64px 0 0 0; }
	.filter-container { height: 100% !important; }
	.title { font-weight: 400; }
		/*position: absolute;
		bottom: 50px;
		background-color: rgba(0,0,0,0.5);
		color: white;
		font-size: 2em;
		padding: 20px;
	}*/
	.avatar-container {
		justify-content: center;
		align-items: center;
		position: relative;
		height: 55px;
		border-bottom: 3px solid #18FFFF;
	}
	.avatar {
		position:absolute;
		top:28%;
		left:50%;
		transform:translate(-50%,0%);
		border: 3px solid #18FFFF !important;
	}
	.card__title--primary {
		padding-top: 35px !important;
		text-align: center;
	}
	.card__actions { border-top: 1px solid #18FFFF !important; justify-content: center; }
	.card__actions .btn { border: 1px solid #18FFFF !important; }
</style>
