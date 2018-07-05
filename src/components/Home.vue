<template>
	<v-container grid-list-xl fill-height>
		<ais-index
			:index-name="credentials().algoliaIndexName"
			:appId="credentials().algoliaAppID"
			:apiKey="credentials().algoliaApiKey"
			:query-parameters="{
				restrictSearchableAttributes: ['Name', 'Email']
			}">
			<v-layout xs12 row wrap>
				<v-flex xs12 md4 fill-height style="flex: 1;">
					<v-card class="filter-container">
						<v-layout column>
							<v-flex class="filter-title">
								<v-icon size="18px">tune</v-icon>
								<h3 class="subheading">Search Filters</h3>
							</v-flex>
							<v-flex class="search-box-container">
								<ais-search-box>
									<div class="input-group input-group--text-field primary--text" v-bind:class="{ 'input-group--focused': focused }">
										<label for="name-search">Search by name or email</label>
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
										<div class="input-group__details"><!----></div>

										<span class="input-group-btn">
											<ais-clear :classNames="{'ais-clear': 'btn btn-default'}">
												<v-icon size="18px">remove</v-icon>
											</ais-clear>
											<button class="btn btn-default" type="submit">
												<v-icon size="18px">search</v-icon>
											</button>
										</span>
									</div><!-- /input-group -->
								</ais-search-box>
							</v-flex>
							<ais-refinement-list attribute-name="Skills">
								<h3 slot="skills">Skills</h3>
							</ais-refinement-list>
						</v-layout>

						<v-layout>
							<!-- <v-flex>
								<multiselect :options="skills()" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
									<template slot="tag" slot-scope="props"><span class="custom__tag"><span>{{ props.option.language }}</span><span class="custom__remove" @click="props.remove(props.option)">❌</span></span></template>
							  </multiselect>
							</v-flex> -->
						</v-layout>

						<div class="row">
							<!-- <div class="col-md-2 col-sm-3">
								<ais-tree-menu :attributes="['category', 'sub_category']" :classNames="{
									'ais-tree-menu__list': 'list-unstyled',
									'ais-tree-menu__count': 'badge'
								}">
									<h3 slot="header">Browse by</h3>
								</ais-tree-menu>

								<ais-price-range attribute-name="Hourly Rate" :classNames="{
									'ais-price-range__input': 'form-control'
								}">
									<h3 slot="header">Price</h3>
								</ais-price-range>
							</div> -->
							<!-- <div class="col-md-10 col-sm-9">
								<div class="search-controls form-inline">
									<ais-sort-by-selector :indices="[
										{name: 'ikea', label: 'Relevance'},
										{name: 'ikea_price_asc', label: 'Lowest price'},
										{name: 'ikea_price_desc', label: 'Highest price'}
									]"
									:classNames="{'ais-sort-by-selector': 'form-control' }"
									/>

									<ais-results-per-page-selector :options="[12, 24, 48]" :classNames="{'ais-results-per-page-selector': 'form-control' }"/>

									<ais-powered-by />

									<ais-stats/>
								</div>
							</div> -->
						</div>
					</v-card>
				</v-flex>
				<v-flex fill-height>
					<v-layout row wrap>
						<ais-results>
							<template slot-scope="{ result }">
								<v-flex xs12 md6>
									<div class="search-result">
										<card v-bind="result"></card>

										<!-- <div>{{skills(result['Skills'])}}</div>
										<img class="result__image img-responsive" :src="result.image">
										<div class="result__info">
											<h2 class="result__name">
												<ais-highlight :result="result" attribute-name="Name"/>
											</h2>
											<h2 class="result__skills">
												<ais-highlight :result="result" attribute-name="Skills" v-model="result" v-on:change="facets()"/>
											</h2>
											<div class="result__rating">
												<template v-for="n in 5">
													<span v-if="n <= result.rating" class="result__star" :key="n"></span>
													<span v-else class="result__star--empty" :key="n"></span>
												</template>
											</div>
											<div class="result__price">${{result['Hourly Rate']}}</div> -->
										</div>
									</div>
								</v-flex>
							</template>
						</ais-results>

						<ais-no-results/>

					<!-- 	<ais-pagination class="pagination" :classNames="{
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
				options: []
			}
		},
		methods: {
			onFocus() {
				this.focused = true;
			},
			onBlur() {
				this.focused = false;
			},
			credentials() {
				return AlgoliaCreds;
			}
			// skills(result) {
			// 	console.log(result, 'skills');
			// 	return result;
			// }
		},
		computed: {

		}
	}
</script>

<style scoped>
	.ais-index { margin: 16px; width: 100%;}
	.ais-results { width: 100%; display: flex;}
	.container { padding: 64px 0 0 0; max-width: 100% !important;}
	.filter-container { display: flex; flex-direction: column; height: 100% !important; padding: 12px; }
	.filter-title { display: flex; border-bottom: 1px solid #616161; }
	.filter-title .subheading { padding-left: 6px; font-weight: 500; }
	.title { font-weight: 400; line-height: initial !important;}
	.search-box-container { padding-top: 3px !important; }
	.input-group.primary--text.input-group--focused  { color: #26C6DA !important; }
	.primary--text input, .primary--text textarea { caret-color: #26C6DA !important; }
	.input-group { padding: 12px 0 0 !important; }
	.input-group label { font-size: 14px !important; line-height: 18px !important; }
</style>
