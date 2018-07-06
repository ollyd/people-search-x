<template>
	<v-card tile>
		<div class="avatar-header">
			<div class="result__rating">
				<template v-for="n in 5">
					<v-icon size="14px" light v-if="n <= rating" :key="n">star</v-icon>
					<v-icon size="14px" light v-else>star_border</v-icon>
				</template>
			</div>
			<v-avatar class="cyan lighten-1" size="70">
				<v-icon dark x-large>account_circle</v-icon>
			</v-avatar>
		</div>
		<v-card-title class="white" primary-title>
			<div class="main-content">
				<h3 class="title pb-1">{{ name }}</h3>
				<h4 class="result__role">{{ role }}</h4>
				<div class="result__price">${{ hourlyRate }}</div>
				<!-- <h2 class="result__skills"> -->
					<!-- <ais-highlight :result="result" attribute-name="Skills" v-model="result" v-on:change="facets()"/> -->
				<!-- </h2> -->
			</div>
		</v-card-title>
		<v-card-actions>
			<v-btn flat color="cyan darken-4">View Profile</v-btn>
			<v-btn flat color="cyan darken-4">Add to List</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		props: [
			'name',
			'email',
			'skills',
			'rating',
			'availability',
			'company',
			'hourlyRate',
			'level',
			'location',
			'role',
			'skills',
			'telephone',
			'workType'
		],
		methods: {
		}
	}
</script>

<style scoped>
	.avatar-header {
		background-color: #B2EBF2;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 54px;
		border-bottom: 3px solid white;
		color: #616161;
	}
	.v-avatar {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%,0%);
		border: 3px solid white !important;
	}
	.v-card__title--primary {
		padding-top: 35px !important;
		text-align: center;
		color: #616161;
	}
	.main-content { width: 100%; }
	.v-card__actions { background-color: #B2EBF2; justify-content: center; }
	.result__rating {
		padding: 3px 6px;
	}
</style>
