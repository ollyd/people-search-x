<template>
	<v-container grid-list-lg>
		<ais-index
			:index-name="credentials().algoliaIndexName"
			:appId="credentials().algoliaAppID"
			:apiKey="credentials().algoliaApiKey"
			:query-parameters="{
				restrictSearchableAttributes: ['name', 'email', 'role']
			}">
			<v-layout xs12 row wrap>
				<v-flex xs12 md4 lg4 fill-height style="flex: 1;">
					<v-card class="filter-container">
						<v-layout column>
							<v-flex class="filter-title">
								<v-icon size="18px">tune</v-icon>
								<h3 class="subheading">Search Filters</h3>
							</v-flex>
							<v-flex class="search-box-container">
								<ais-search-box>
									<div class="v-input v-text-field" v-bind:class="{ 'v-input--is-focused cyan--text text--darken-1': focused }">
										<div class="v-input__control">
											<div class="v-input__slot">
												<div class="v-text-field__slot">
													<label aria-hidden="true" class="v-label" v-bind:class="{ 'v-label--active cyan--text text--darken-1': focused }" style="left: 0px; right: auto; position: absolute;">Search by Name, Email or Job Role</label>
													<ais-input
														@focus.native="onFocus"
														@blur.native="onBlur"
														id="name-search"
														:classNames="{
															'ais-input': 'form-control'
														}"
													/>
												</div>
											</div>
											<div class="v-text-field__details"></div>
										</div>
										<!-- <label for="name-search">Search by Name, Email or Job Role</label>
										<div class="input-group__input">
											<ais-input
												v-on:focus.native="onFocus"
												v-on:blur.native="onBlur"
												id="name-search"
												:classNames="{
													'ais-input': 'form-control'
												}"
											/>
										</div>
										<div class="input-group__details"></div> -->

										<!-- <span class="input-group-btn">
											<ais-clear :classNames="{'ais-clear': 'btn btn-default'}">
												<v-icon size="18px">remove</v-icon>
											</ais-clear>
											<button class="btn btn-default" type="submit">
												<v-icon size="18px">search</v-icon>
											</button>
										</span> -->
									</div><!-- /input-group -->
								</ais-search-box>
							</v-flex>
						</v-layout>

						<v-layout>
							<v-flex>
								<ais-refinement-list attribute-name="skills">
									<h4 slot="header" style="margin-bottom: 6px; color: #00acc1;">Refine by Job Skills</h4>
								</ais-refinement-list>
							</v-flex>
						</v-layout>

						<v-divider></v-divider>

						<v-layout>
							<v-flex>
								<h4 slot="header" style="color: #00acc1;">Hourly Rate</h4>
								<ais-price-range attribute-name="hourlyRate" :classNames="{
									'ais-price-range__input': 'form-control'
								}">
								</ais-price-range>
							</v-flex>
						</v-layout>

						<v-divider></v-divider>

						<v-layout>
							<v-flex>
								<ais-refinement-list attribute-name="availability">
									<h4 slot="header" style="margin-bottom: 6px; color: #00acc1;">Availability</h4>
								</ais-refinement-list>
							</v-flex>
						</v-layout>

						<v-divider></v-divider>

						<v-layout>
							<v-flex>
								<ais-refinement-list attribute-name="workType">
									<h4 slot="header" style="margin-bottom: 6px; color: #00acc1;">Work Type</h4>
								</ais-refinement-list>
							</v-flex>
						</v-layout>

						<v-divider></v-divider>


						<v-layout>
							<v-flex>
								<ais-rating attribute-name="rating">
									<h4 slot="header"  style="margin-bottom: 6px; color: #00acc1;">Rating</h4>
								</ais-rating>
							</v-flex>
						</v-layout>

						<v-divider></v-divider>

						<!-- <v-layout> -->
							<!-- <v-flex>
								<multiselect :options="skills()" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
									<template slot="tag" slot-scope="props"><span class="custom__tag"><span>{{ props.option.language }}</span><span class="custom__remove" @click="props.remove(props.option)">❌</span></span></template>
							  </multiselect>
							</v-flex> -->
						<!-- </v-layout> -->

						<!-- 	<ais-tree-menu :attributes="['category', 'sub_category']" :classNames="{
									'ais-tree-menu__list': 'list-unstyled',
									'ais-tree-menu__count': 'badge'
								}">
									<h3 slot="header">Browse by</h3>
								</ais-tree-menu> -->
<!--
						<v-layout row class="ais-price-range">
							<v-flex
								shrink
								style="width: 64px"
							>
								<v-text-field
									@keyup="hourlyRateFrom($event)"
									v-model="price[0]"
									class="mt-0"
									hide-details
									single-line
									type="number"
								></v-text-field>
							</v-flex>

							<v-flex>
								<v-range-slider
									v-model="price"
									:max="1500"
									:min="0"
									:step="10"
								></v-range-slider>
							</v-flex>

							<v-flex class="form-control ais-price-range__input--to"
								shrink
								style="width: 64px"
							>
								<v-text-field
									@keyup="hourlyRateTo()"
									v-model="price[1]"
									class="mt-0"
									hide-details
									single-line
									type="number"
								></v-text-field>
							</v-flex>
						</v-layout> -->


					<!-- 	<v-layout>
							<v-flex>
								<ais-sort-by-selector :indices="[
									{name: 'people', label: 'Most Relevant'},
									]"
								>
								<template slot-scope="{ indexName, label }">
									<option :value="indexName">Sort by: {{ label }}</option>
								</template>
								</ais-sort-by-selector>
							</v-flex>
						</v-layout> -->
<!--
								<ais-results-per-page-selector :options="[12, 24, 48]" :classNames="{'ais-results-per-page-selector': 'form-control' }"/>

								<ais-powered-by />

								<ais-stats/> -->
							<!-- </div> -->
						<!-- </v-flex> -->
					</v-card>
				</v-flex>
				<v-flex xs12 md8 lg8 fill-height>
					<v-layout row wrap>
						<ais-results>
							<template slot-scope="{ result }">
								<v-flex xs12 md6 lg4>
									<div class="search-result">
										<card v-bind="result"></card>
									</div>
								</v-flex>
							</template>
						</ais-results>

						<ais-no-results/>
<!--
						<ais-pagination class="pagination" :classNames="{
							'ais-pagination': 'pagination',
							'ais-pagination__item--active': 'active',
							'ais-pagination__item--disabled': 'disabled'
						}" v-on:page-change="onPageChange"/> -->
					</v-layout>
				</v-flex>
				<!-- <v-layout v-if="loading">
					<v-flex xs12 class="text-xs-center">
						<v-progress-circular
							indeterminate
							class="primary--text"
							:width="3"
							:size="50">
						</v-progress-circular>
					</v-flex>
				</v-layout> -->
			</v-layout>
		</ais-index>
	</v-container>
</template>

<script>
	import Card from '~/components/Card';
	import AlgoliaCreds from '../../algolia.config.js';
	import Multiselect from 'vue-multiselect';

	export default {
		components: {
			Card,
			Multiselect
		},
		data() {
			return {
				focused: false,
				options: [],
				price: [0, 2000]
			}
		},
		methods: {
			onFocus() {
				this.focused = true;
			},
			onBlur() {
				this.focused = false;
			},
			// hourlyRateFrom(event) {
			// 	document.getElementsByClassName('ais-price-range__input--from').value = event.target.value;
			// },
			credentials() {
				return AlgoliaCreds;
			}
		},
		computed: {

		}
	}
</script>

<style>
	.ais-index {width: 100%; max-width: 1280px;}
	.ais-results { width: 100%; display: flex; flex-wrap: wrap; }
	.container { margin: 60px 12px 12px 12px; padding: 6px; max-width: 100%; display: flex;
	justify-content: center;}
	.filter-container { display: flex; flex-direction: column; height: 100%; padding: 12px; }
	.filter-title { display: flex; border-bottom: 1px solid #616161; }
	.filter-title .subheading { padding-left: 6px; font-weight: 500; }
	.title { font-weight: 400; line-height: initial !important;}
	.search-box-container { padding-top: 3px !important; }
	.v-slider__track-fill, .v-slider__thumb {background-color: #00acc1 !important;}
	.v-text-field__slot label { pointer-events: none; }
	.form-control.ais-price-range__input--from,
	.form-control.ais-price-range__input--to {
		height: 32px;
		max-width: 64px;
	}
	/* -- Checkbox inputs -- */
	.ais-refinement-list__checkbox {
		position: relative;
		margin-right: 8px;
		transition: color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
	/* -- Rating override -- */
	.ais-rating__item a {
		text-decoration: none;
		color: white;
	}
	.ais-rating__star.ais-rating__star--empty {
		font-size: 12px;
		position: relative;
		top: -1px;
		margin-left: 2px;
	}
	/* -- badge counts -- */
	.ais-rating__count,
	.ais-refinement-list__count {
		font-size: 12px;
	    color: #00acc1;
	}
</style>
