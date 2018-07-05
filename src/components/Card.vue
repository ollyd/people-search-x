<template>
	<v-card tile>
		<div class="avatar-container">
			<v-avatar class="cyan lighten-1" size="70">
				<v-icon dark x-large>account_circle</v-icon>
			</v-avatar>
		</div>
		<v-card-title class="white" primary-title>
			<div class="main-content">
				<h3 class="title pb-1">{{ Name }}</h3>
				<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
			</div>
		</v-card-title>
		<v-card-actions>
			<v-btn flat color="cyan darken-4">View Profile</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		props: [
			'Name'
			// 'Email',
			// 'Skills'
		],
		methods: {
		}
	}
</script>

<style scoped>
	.avatar-container {
		background-color: #B2EBF2;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 54px;
		border-bottom: 3px solid white;
		color: #616161;
	}
	.avatar {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%,0%);
		border: 3px solid white !important;
	}
	.card__title--primary {
		padding-top: 35px !important;
		text-align: center;
		color: #616161;
	}
	.main-content { width: 100%; }
	.card__actions { background-color: #B2EBF2; justify-content: center; }
	/*.card__actions .btn { border: 1px solid #84FFFF !important; }*/
</style>
