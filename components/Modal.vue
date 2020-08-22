<template>
	<transition name="fade">
		<div
			v-if="showing"
			class="fixed inset-0 w-full h-screen flex items-center justify-center bg-smoke-200"
			@click.self="closeIfShown"
		>
			<div
				class="relative mx-5 my-5 max-h-screen w-11/12 max-w-2xl bg-white shadow-lg rounded-lg p-8 flex"
			>
				<button
					v-if="showClose"
					aria-label="close"
					class="absolute top-0 right-0 outline-none focus:outline-none my-2 mx-4"
					@click.prevent="close"
				>
          <div class="p-2 bg-gray-200 rounded-full text-gray-700">
					  <svg class="fill-current" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>e-remove</title><g><polygon points="49.678 10.08 32 27.758 14.322 10.08 10.08 14.322 27.758 32 10.08 49.678 14.322 53.92 32 36.242 49.678 53.92 53.92 49.678 36.242 32 53.92 14.322 49.678 10.08"></polygon></g></svg>
          </div>
				</button>
				<div class="overflow-auto max-h-screen w-full">
					<slot />
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: {
			showing: {
				required: true,
				type: Boolean
			},
			showClose: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			showing(value) {
				if (value) {
					return document.querySelector("body").classList.add("overflow-hidden");
				}
				document.querySelector("body").classList.remove("overflow-hidden");
			}
		},
		methods: {
			close() {
				this.$emit("close");
			},
			closeIfShown() {
				if (this.showClose) {
					this.close();
				}
			}
		},
		mounted: function() {
			if (this.showClose) {
				document.addEventListener("keydown", e => {
					if (e.keyCode == 27) {
						this.close();
					}
				});
			}
		}
	};
</script>

<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.6s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>