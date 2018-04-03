<template>
	<v-container grid-list-xl fill-height>
		<v-layout row wrap>
			<v-flex xs12 md3 fill-height>
				<v-card fill-height>
					<!-- <v-layout>
						<v-flex>
							1
						</v-flex>
					</v-layout> -->
				</v-card>
			</v-flex>
			<v-flex xs12 md9 fill-height>
				<v-layout row wrap>
					<v-flex xs12 md6 lg3>
						<v-card tile>
							<div class="avatar-container">
								<v-avatar class="indigo">
									<v-icon dark>account_circle</v-icon>
								</v-avatar>
							</div>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
									<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="orange">Share</v-btn>
								<v-btn flat color="orange">Explore</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
					<v-flex xs12 md6 lg3>
						<v-card tile>
							<div class="avatar-container">
								<v-avatar class="indigo">
									<v-icon dark>account_circle</v-icon>
								</v-avatar>
							</div>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
									<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="orange">Share</v-btn>
								<v-btn flat color="orange">Explore</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
					<v-flex xs12 md6 lg3>
						<v-card tile>
							<div class="avatar-container">
								<v-avatar class="indigo">
									<v-icon dark>account_circle</v-icon>
								</v-avatar>
							</div>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
									<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="orange">Share</v-btn>
								<v-btn flat color="orange">Explore</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
					<v-flex xs12 md6 lg3>
						<v-card tile>
							<div class="avatar-container">
								<v-avatar class="indigo">
									<v-icon dark>account_circle</v-icon>
								</v-avatar>
							</div>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
									<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="orange">Share</v-btn>
								<v-btn flat color="orange">Explore</v-btn>
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
	.title {
		position: absolute;
		bottom: 50px;
		background-color: rgba(0,0,0,0.5);
		color: white;
		font-size: 2em;
		padding: 20px;
	}
	.avatar-container { justify-content: center; align-items: center; }
</style>
