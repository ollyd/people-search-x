<template>
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
				<v-btn flat color="cyan accent-1">View Profile</v-btn>
			</v-card-actions>
		</v-card>
	</v-flex>
</template>

<script>
	export default {
		// data() {
		// 	return {
		// 	}
		// },
		// methods: {

		// }
	}
</script>

<style scoped>
	.btn { text-transform: initial; }
	.avatar-container {
		justify-content: center;
		align-items: center;
		position: relative;
		height: 54px;
		border-bottom: 3px solid #84FFFF;
	}
	.avatar {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%,0%);
		border: 3px solid #84FFFF !important;
	}
	.card__title--primary {
		padding-top: 35px !important;
		text-align: center;
	}
	.card__actions { border-top: 1px solid #84FFFF !important; justify-content: center; }
	.card__actions .btn { border: 1px solid #84FFFF !important; }
</style>
