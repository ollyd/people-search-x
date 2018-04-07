<template>
	<v-container grid-list-xl fill-height>
		<ais-index :index-name="credentials().algoliaIndexName" :appId="credentials().algoliaAppID" :apiKey="credentials().algoliaApiKey">
			<v-layout row wrap>
				<v-flex xs12 md4 fill-height>
					<v-card class="filter-container">
						<v-layout column>
							<v-flex class="filter-title">
								<v-icon size="18px">tune</v-icon>
								<h3 class="subheading">Search Filters</h3>
							</v-flex>
							<v-flex class="search-box-container">
								<ais-search-box :searchOnEnterKeyPressOnly="true">
									<div class="input-group input-group--text-field primary--text" v-bind:class="{ 'input-group--focused': focused }">
										<label for="name-search">Search by name</label>
										<div class="input-group__input">
											<ais-input
												attribute-name="Name"
												v-on:focus.native="onFocus"
												v-on:blur.native="onBlur"
												id="name-search"
												:classNames="{
													'ais-input': 'form-control'
												}"
											/>
										</div>
										<div class="input-group__details"><!----></div>

										<!-- <span class="input-group-btn">
											<ais-clear :classNames="{'ais-clear': 'btn btn-default'}">
												<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
											</ais-clear>
											<button class="btn btn-default" type="submit">
												<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
											</button>
										</span> -->
									</div><!-- /input-group -->
								</ais-search-box>
							</v-flex>
						</v-layout>

						<div class="row">
							<div class="col-md-2 col-sm-3">
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

								<ais-refinement-list attribute-name="materials" :classNames="{
									'ais-refinement-list__count': 'badge',
									'ais-refinement-list__item': 'checkbox'
								}">
									<h3 slot="header">Material</h3>
								</ais-refinement-list>

								<ais-refinement-list attribute-name="colors" :classNames="{
									'ais-refinement-list__count': 'badge',
									'ais-refinement-list__item': 'checkbox'
								}">
									<h3 slot="header">Color</h3>
								</ais-refinement-list>
							</div>
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
				<v-flex xs12 md8 fill-height>
					<v-layout row wrap>
						<ais-results>
							<template slot-scope="{ result }">
								<div class="search-result">
									<card></card>
									<img class="result__image img-responsive" :src="result.image">

									<div class="result__info">
										<h2 class="result__name">
											<ais-highlight :result="result" attribute-name="name"/>
										</h2>
										<div class="result__type">
											<ais-highlight :result="result" attribute-name="type"/>
										</div>
										<div class="result__rating">
											<template v-for="n in 5">
												<span v-if="n <= result.rating" class="result__star" :key="n"></span>
												<span v-else class="result__star--empty" :key="n"></span>
											</template>
										</div>
										<div class="result__price">${{result.price}}</div>
									</div>
								</div>
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

	export default {
		components: {
			Card
		},
		data() {
			return {
				focused: false
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
		}
	}
</script>

<style scoped>
	.ais-index { margin: 12px 0; }
	.container { padding: 64px 0 0 0; }
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
