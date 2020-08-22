<template>
  <div class="bg-indigo-500 overflow-auto">
    <nav class="bg-indigo-700 border-b-4 border-indigo-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <nuxt-link to="/">
                <img class="h-8 w-8" src="~/assets/img/logo.png" alt="Logo">
              </nuxt-link>
            </div>
            <h1 class="ml-5 text-sm font-medium text-indigo-200">Today's <span class="ml-1 font-bold text-gray-100">{{ today }}</span></h1>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <div class="ml-3 relative">
                <div>
                  <button ref="menuBtn" type="button" @click="isOpen = !isOpen" class="max-w-xs flex items-center text-sm rounded-full text-indigo-200 focus:outline-none" id="user-menu" aria-label="User menu" aria-haspopup="true">
                    <!-- <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> -->
                    <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>logout</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><line fill="none" stroke-miterlimit="10" x1="20" y1="24" x2="42" y2="24"></line> <polyline fill="none" stroke-miterlimit="10" points=" 34,32 42,24 34,16 "></polyline> <polyline fill="none" stroke="currentColor" stroke-miterlimit="10" points="38,8 38,2 10,2 10,46 38,46 38,40 "></polyline></g></svg>
                  </button>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100 transform"
                  enter-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75 transform"
                  leave-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
                >
                <div v-click-outside="{ exclude: ['menuBtn', 'mobileMenuBtn'], handler: 'hide' }" v-show="isOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  <div class="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <!-- <nuxt-link to="/kids" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Add Kid 
                    </nuxt-link> -->
                    <span @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Sign Out
                    </span>
                  </div>
                </div>
                </transition>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button ref="mobileMenuBtn" type="button" @click="toggleMenu" class="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 focus:outline-none focus:bg-gray-700 focus:text-white">
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg :class="isOpen ? 'hidden' : 'block'" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg :class="isOpen ? 'block' : 'hidden'" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!--
        Mobile menu, toggle classes based on menu state.

        Open: "block", closed: "hidden"
      -->
      <div :class="isOpen ? 'block md:hidden' : 'hidden'">
        <div class="pt-4 pb-3 border-t border-indigo-900">
          <!-- <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">Molo</div>
              <div class="mt-1 text-sm font-medium leading-none text-white">{{ user ? user.email : '' }}</div>
            </div>
          </div> -->
          <div class="mt-3 px-2">
            <span @click="logout" class="mt-1 block cursor-pointer px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-indigo-800 focus:outline-none focus:text-white focus:bg-indigo-700">Sign out</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- <header class="bg-white">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-lg text-center font-bold leading-tight text-gray-900">
          {{ today }}
        </h1>
      </div>
    </header> -->
    <main class="h-screen">
      <div class="w-full">
      <!-- <div class="h-full max-w-7xl mx-auto py-3 sm:px-6 lg:px-8"> -->
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>

export default {
  data: () => ({
    isOpen: false,
    today: '', 
  }),
  created() {
    let date = new Date()
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    this.today = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }, 
  computed: {
    user() {
      return this.$store.state.currUser
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = ! this.isOpen; 
    }, 
    hide() {
      this.isOpen = false
    },
    logout() {
      this.$fireAuth.signOut().then(() => {
        this.$router.push({
            path: '/login'
        })        
      }).catch(err => {
        alert('Oops! Something went wrong!')
      })
    }
  },
}
</script>