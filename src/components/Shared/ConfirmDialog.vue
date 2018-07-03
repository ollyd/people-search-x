<template>
	<v-layout row justify-center>
		<v-dialog
		:value="dialog"
		max-width="290"
		>
			<v-card>
				<v-card-title class="headline">{{ headline }}</v-card-title>
				<v-card-text>{{ content }}</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn
						color="cyan darken-1"
						flat="flat"
						@click="close"
					>
					Cancel
					</v-btn>

					<v-btn
						color="cyan darken-1"
						flat="flat"
						@click="confirm"
					>
					Confirm
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
	export default {
		name: 'confirm-dialog',
		data: () => ({
		}),
		props: [
			'headline',
			'content',
			'confirmDialog'
		],
		methods: {
			close() {
				this.$emit('closeConfirmDialog')
			},
			confirm() {
				this.$emit('deleteConfirmed')
			}
		},
		computed: {
			dialog() {
				return this.confirmDialog ? this.confirmDialog : false;
			}
		}
	}
</script>
