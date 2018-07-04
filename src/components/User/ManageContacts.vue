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
								<v-text-field color="cyan darken-1" v-model="editedItem['Name']" label="Name"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem['Email']" label="Email"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem['Telephone']" label="Telephone"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-radio-group label="Availability" v-model="editedItem['Availability']" row>
									<v-radio label="Part Time" value="Part Time" color="cyan darken-1"></v-radio>
									<v-radio label="Full Time" value="Full Time" color="cyan darken-1"></v-radio>
								</v-radio-group>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem['Work Type']" label="Work Type"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem['Company']" label="Company"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md3>
								<v-text-field color="cyan darken-1" v-model="editedItem['Hourly Rate']" label="Hourly Rate"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md3>
								<v-text-field color="cyan darken-1" v-model="editedItem['Level']" label="Level"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md3>
								<v-text-field color="cyan darken-1" v-model="editedItem['Location']['City']" label="Location: City"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md3>
								<v-text-field color="cyan darken-1" v-model="editedItem['Location']['Country']" label="Location: Country"></v-text-field>
							</v-flex>
							<v-flex xs12 sm4 md4>
								<v-text-field color="cyan darken-1" v-model="editedItem['Role']" label="Role"></v-text-field>
							</v-flex>
							<v-flex xs12 sm8 md8>
								<label class="typo__label">Skills</label>
								<multiselect
									v-model="editedItem['Skills']"
									:options="skillsOptions"
									:multiple="true"
									:taggable="true"
									@tag="addSkill"
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
						<td>{{ props.item['Name'] }}</td>
						<td>{{ props.item['Email'] }}</td>
						<td>{{ props.item['Telephone'] }}</td>
						<td>{{ props.item['Availability'] }}</td>
						<td>{{ props.item['Work Type'] }}</td>
						<td>{{ props.item['Company'] }}</td>
						<td>${{ props.item['Hourly Rate'] }}</td>
						<td>{{ props.item['Level'] }}</td>
						<td>{{ props.item['Location'] ? props.item['Location']['City'] : '' }},
							{{ props.item['Location'] ? props.item['Location']['Country'] : '' }}
						</td>
						<td>{{ props.item['Role'] ? props.item['Role'].join(', ', '') : '' }}</td>
						<td>{{ props.item['Skills'] ? props.item['Skills'].join(', ', '') : '' }}</td>
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

		<confirm-dialog
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
				{ text: 'Availability', value: 'availability' },
				{ text: 'Work Type', value: 'work type' },
				{ text: 'Company', value: 'company' },
				{ text: 'Hourly Rate', value: 'hourly rate' },
				{ text: 'Level', value: 'level' },
				{ text: 'Location', value: 'location' },
				{ text: 'Role', value: 'role' },
				{ text: 'Skills', value: 'skills' },
				{ text: 'Edit/Delete', align: 'center', sortable: false }
			],
			editedIndex: -1,
			editedItem: {
				'Name': '',
				'Email': '',
				'Telephone': '',
				'Availability': '',
				'Work Type': '',
				'Company': '',
				'Hourly Rate': 0,
				'Level': '',
				'Location': {
					'City': '',
					'Country': ''
				},
				'Role': '',
				'Skills': []
			},
			defaultItem: {
				name: '',
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
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
				this.editedItem['Skills'].push(newSkill);
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

<style scoped>
	.container { padding: 64px 0 0 0; max-width: 100% !important; margin: 12px auto;}
</style>
