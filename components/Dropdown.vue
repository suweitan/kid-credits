<template>
    <div class="dropdown relative">
        <div class="dropdown-trigger"
             @click.prevent="isOpen = ! isOpen"
             aria-haspopup="true"
             :aria-expanded="isOpen"
        >
            <slot name="trigger">
                <button class="px-2 py-2 rounded focus:outline-none text-white hover:bg-indigo-800">
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 64 64"><title>menu-5</title><g><circle cx="8" cy="32" r="6"></circle> <circle cx="32" cy="32" r="6"></circle> <circle cx="56" cy="32" r="6"></circle></g></svg>
                </button>
            </slot>
        </div>

        <transition name="pop-out-quick">
          <ul v-show="isOpen"
              class="dropdown-menu absolute right-0 w-48 bg-gray-100 mt-2 py-2 rounded shadow text-white z-10"
              :class="classes"
          >
              <slot></slot>
          </ul>
        </transition>
    </div>
</template>

<script>
  export default {
      props: {
        classes: {
				  default: '',
          type: String
        }
      },
      data() {
          return {
              clickListener: null, 
              isOpen: false
          };
      },
      watch: {
          isOpen(isOpen) {
              if (isOpen) {
                  document.addEventListener(
                      'click',
                      this.closeIfClickedOutside
                  );
              }
          }
      },
      methods: {
          closeIfClickedOutside(event) {
              if (! event.target.closest('.dropdown')) {
                  this.isOpen = false;
                  document.removeEventListener('click', this.closeIfClickedOutside);
              }
          }
      }
  }
</script>

<style>
    .pop-out-quick-enter-active,
    .pop-out-quick-leave-active {
        transition: all 0.4s;
    }
    .pop-out-quick-enter,
    .pop-out-quick-leave-active {
        opacity: 0;
        transform: translateY(-7px);
    }
</style>