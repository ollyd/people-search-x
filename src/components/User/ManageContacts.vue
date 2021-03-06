<template>
	<v-container>
		<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card>
				<v-card-title>
					<span class="headline">{{ formTitle }}</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem.name" label="Name"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem.email" label="Email"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem.telephone" label="Telephone"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-radio-group label="Rating" v-model="editedItem.rating" row>
									<v-radio label="1" value="1" color="cyan darken-1"></v-radio>
									<v-radio label="2" value="2" color="cyan darken-1"></v-radio>
									<v-radio label="3" value="3" color="cyan darken-1"></v-radio>
									<v-radio label="4" value="4" color="cyan darken-1"></v-radio>
									<v-radio label="5" value="5" color="cyan darken-1"></v-radio>
								</v-radio-group>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-radio-group label="Availability" v-model="editedItem.availability" row>
									<v-radio label="None" value="None" color="cyan darken-1"></v-radio>
									<v-radio label="Part Time" value="Part Time" color="cyan darken-1"></v-radio>
									<v-radio label="Full Time" value="Full Time" color="cyan darken-1"></v-radio>
								</v-radio-group>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-radio-group label="Work Type" v-model="editedItem.workType" row>
									<v-radio label="Freelance" value="Freelance" color="cyan darken-1"></v-radio>
									<v-radio label="Contract" value="Contract" color="cyan darken-1"></v-radio>
									<v-radio label="Permanent" value="Permanent" color="cyan darken-1"></v-radio>
								</v-radio-group>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem.company" label="Company"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md3>
								<v-text-field color="cyan darken-1" v-model.number="editedItem.hourlyRate" label="Hourly Rate" type="number"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md3>
								<v-text-field color="cyan darken-1" v-model="editedItem.level" label="Level"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md3>
								<v-text-field color="cyan darken-1" v-model="editedItem.location.city" label="Location: City"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md3>
								<v-text-field color="cyan darken-1" v-model="editedItem.location.country" label="Location: Country"></v-text-field>
							</v-flex>
							<v-flex xs12 sm4 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem.role" label="Role"></v-text-field>
							</v-flex>
							<v-flex xs12 sm8 md8>
								<label class="typo__label">Skills</label>
								<multiselect
									v-model="editedItem.skills"
									:options="skillsOptions"
									:multiple="true"
									:taggable="true"
									@tag="addSkill"
									placeholder="Select a Skill"
								>
								</multiselect>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="cyan darken-1" flat @click.native="close">Cancel</v-btn>
					<v-btn color="cyan darken-1" flat @click.native="save">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<ais-index
			:index-name="credentials().algoliaIndexName"
			:appId="credentials().algoliaAppID"
			:apiKey="credentials().algoliaApiKey"
		>
			<v-card>
				<v-card-title>
					<v-btn slot="activator" color="cyan darken-1" dark class="mb-2" @click="create"><v-icon>group_add</v-icon></v-btn>
					<v-spacer></v-spacer>
					<v-text-field
						v-model="search"
						append-icon="search"
						label="Search"
						single-line
						hide-details
						color="cyan darken-1"
					></v-text-field>
				</v-card-title>
				<v-data-table
					:headers="headers"
					:items="getContacts"
					:search="search"
					class="elevation-1"
				>
					<v-progress-linear slot="progress" color="cyan" indeterminate></v-progress-linear>

					<template slot="items" slot-scope="props">
						<td>{{ props.item.name }}</td>
						<td>{{ props.item.email }}</td>
						<td>{{ props.item.telephone }}</td>
						<td>
							<template v-for="n in 5">
								<v-icon size="8px" dark v-if="n <= props.item.rating" :key="n">star</v-icon>
							</template>
						</td>
						<td>{{ props.item.availability }}</td>
						<td>{{ props.item.workType }}</td>
						<td>{{ props.item.company }}</td>
						<td>${{ parseInt(props.item.hourlyRate) }}</td>
						<td>{{ props.item.level }}</td>
						<td>{{ props.item.location ? props.item.location.city : '' }},
							{{ props.item.location ? props.item.location.country : '' }}
						</td>
						<td>{{ props.item.role }}</td>
						<td class="justify-center layout px-0">
							<v-btn icon class="mx-0" @click="editItem(props.item)">
								<v-icon color="cyan">edit</v-icon>
							</v-btn>
							<v-btn icon class="mx-0" @click="deleteItem(props.item)">
								<v-icon color="pink">delete</v-icon>
							</v-btn>
						</td>
					</template>

					<template slot="pageText" slot-scope="props">
						Items {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
					</template>

					<v-alert slot="no-results" :value="true" color="error" icon="warning">
						No results found for your search: {{ search }}.
					</v-alert>
				</v-data-table>
			</v-card>
		</ais-index>

		<confirm-dialog v-if="confirmDialog"
			:confirmDialog="confirmDialog"
			@closeConfirmDialog="confirmDialog = false"
			@deleteConfirmed="deleteConfirmed"
			headline="Confirm Delete"
			content="Are you sure you want to delete this contact?"
		></confirm-dialog>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex';
	import ConfirmDialog from '../Shared/ConfirmDialog.vue';
	import AlgoliaCreds from '../../../algolia.config.js';
	import Multiselect from 'vue-multiselect';
	import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';

	export default {
		components: {
			ConfirmDialog,
			Multiselect
		},
		data: () => ({
			dialog: false,
			confirmDialog: false,
			search: '',
			pagination: {
				sortBy: 'name'
			},
			itemToDelete: '',
			headers: [
				{ text: 'Name', value: 'name' },
				{ text: 'Email', value: 'email' },
				{ text: 'Telephone', value: 'telephone' },
				{ text: 'Rating', value: 'rating' },
				{ text: 'Availability', value: 'availability' },
				{ text: 'Work Type', value: 'work type' },
				{ text: 'Company', value: 'company' },
				{ text: 'Hourly Rate', value: 'hourly rate' },
				{ text: 'Level', value: 'level' },
				{ text: 'Location', value: 'location' },
				{ text: 'Role', value: 'role' },
				{ text: 'Edit/Delete', align: 'center', sortable: false }
			],
			editedIndex: -1,
			editedItem: {
				'name': '',
				'email': '',
				'telephone': '',
				'rating': 0,
				'availability': '',
				'workType': '',
				'company': '',
				'hourlyRate': 0,
				'level': '',
				'location': {
					'city': '',
					'country': ''
				},
				'role': '',
				'skills': []
			},
			defaultItem: {
				'name': '',
				'email': '',
				'telephone': '',
				'rating': 0,
				'availability': '',
				'workType': '',
				'company': '',
				'hourlyRate': 0,
				'level': '',
				'location': {
					'city': '',
					'country': ''
				},
				'role': '',
				'skills': []
			}
		}),
		computed: {
			...mapState([
				'contacts',
				'skills'
			]),
			getContacts() {
				return this.contacts;
			},
			skillsOptions() {
				return this.skills;
			},
			formTitle () {
				return this.editedIndex === -1 ? 'New Contact' : 'Edit Contact'
			}
		},
		watch: {
			dialog (val) {
				val || this.close()
			}
		},
		mounted () {
			this.$store.dispatch('GET_CONTACTS').then(() => {
				this.getContacts;
				this.$store.dispatch('GET_SKILLS');
			});
		},
		methods: {
			credentials() {
				return AlgoliaCreds;
			},
			addSkill(newSkill) {
				this.skillsOptions.push(newSkill);
				this.editedItem.skills.push(newSkill);
			},
			editItem (item) {
				this.editedIndex = this.contacts.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},
			deleteItem (item) {
				this.confirmDialog = true;
				this.itemToDelete = item.id;
			},
			deleteConfirmed() {
				this.$store.dispatch('DELETE_CONTACT', this.itemToDelete);
				this.confirmDialog = false;
			},
			create() {
				this.dialog = true
			},
			close() {
				this.dialog = false;
				setTimeout(() => {
					this.editedItem = this.defaultItem;
				}, 1000);
			},
			save() {
				if(this.formTitle === 'New Contact') {
					this.$store.dispatch('ADD_CONTACT', this.editedItem);
				} else {
					this.$store.dispatch('UPDATE_CONTACT', this.editedItem);
				}
				this.close()
			}
		}
	}
</script>

<style>
	.container { margin: 60px 12px 12px 12px; padding: 6px; max-width: 100%; display: flex;
	justify-content: center;}
	table.v-table th,
	table.v-table td {padding: 0 12px !important;}
	.multiselect__tag {
		background: #01abc1;
	}
	.multiselect__tag-icon:hover {
		background: #0399ad;
		color: white;
	}
	.v-input--radio-group__input label {
		font-size: 12px;
		width: 100%;
	}
</style>
