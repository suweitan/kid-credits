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
            <dropdown>
              <template v-slot:trigger>
                <button class="px-2 py-2 rounded focus:outline-none text-white hover:bg-indigo-800">
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 64 64"><title>menu-5</title><g><circle cx="8" cy="32" r="6"></circle> <circle cx="32" cy="32" r="6"></circle> <circle cx="56" cy="32" r="6"></circle></g></svg>
                </button>
              </template>
              <nuxt-link to="/credits" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer flex items-center">
                <svg class="mr-3 h-6 w-6" viewBox="0 0 48 48"><title>gold-coin</title><g><circle cx="24" cy="24" r="23" fill="#f8d34c"></circle><path d="M24,3A21,21,0,1,0,45,24,21,21,0,0,0,24,3Zm0,40A19,19,0,1,1,43,24,19,19,0,0,1,24,43Z" fill="#bb991d"></path><path d="M24,40a1,1,0,0,1-1-1V36a1,1,0,0,1,2,0v3A1,1,0,0,1,24,40Z" fill="#bb991d"></path><path d="M39.217,28.944a1,1,0,0,1-1.26.642L35.1,28.659a1,1,0,1,1,.618-1.9l2.853.927A1,1,0,0,1,39.217,28.944Z" fill="#bb991d"></path><path d="M33.405,11.056a1,1,0,0,1,.221,1.4L31.862,14.88A1,1,0,0,1,30.244,13.7l1.764-2.427A1,1,0,0,1,33.405,11.056Z" fill="#bb991d"></path><path d="M14.6,11.056a1,1,0,0,1,1.4.221L17.756,13.7a1,1,0,0,1-1.618,1.176l-1.764-2.427A1,1,0,0,1,14.6,11.056Z" fill="#bb991d"></path><path d="M8.783,28.944a1,1,0,0,1,.642-1.26l2.853-.927a1,1,0,1,1,.618,1.9l-2.853.927A1,1,0,0,1,8.783,28.944Z" fill="#bb991d"></path><path d="M30.181,33.478a.992.992,0,0,1-.465-.116l-5.716-3-5.716,3a1,1,0,0,1-1.45-1.053l1.092-6.365L13.3,21.438a1,1,0,0,1,.554-1.706l6.39-.928,2.858-5.79a1.039,1.039,0,0,1,1.792,0l2.858,5.79,6.39.928a1,1,0,0,1,.554,1.706l-4.624,4.506,1.092,6.365a1,1,0,0,1-.985,1.169Z" fill="#bb991d"></path></g></svg>
                Credit Setting 
              </nuxt-link>
              <span @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer flex items-center">
                <svg class="mr-3 h-6 w-6 fill-current" viewBox="0 0 48 48"><title>athletics</title><g stroke-linecap="square" stroke-linejoin="miter" stroke="currentColor"><circle cx="35.5" cy="7.5" r="4.5" fill="none" stroke="currentColor" stroke-miterlimit="10"></circle> <path d="M25,12l-7.922,9.362A4,4,0,0,0,18.116,27.4l6.929,4.042a1,1,0,0,1,.3,1.452L18,43" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="butt"></path> <path d="M10,15l3.6-5.4a1,1,0,0,1,1.1-.41L25,12l8,6,4.6,8.275a1,1,0,0,0,1.19.463L44,25" fill="none" stroke="currentColor" stroke-miterlimit="10"></path> <line x1="33" y1="18" x2="26" y2="26.281" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="butt"></line> <line x1="14" y1="31" x2="4" y2="43" fill="none" stroke="currentColor" stroke-miterlimit="10"></line></g></svg>
                Sign Out
              </span>
            </dropdown>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button type="button" @click="toggleMenu" class="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 focus:outline-none focus:bg-gray-700 focus:text-white">
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
          <nuxt-link to="/credits" class="block mx-2 cursor-pointer px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-indigo-800 focus:outline-none focus:text-white focus:bg-indigo-700 flex items-center">
            <svg class="mr-3 h-6 w-6" viewBox="0 0 48 48"><title>gold-coin</title><g><circle cx="24" cy="24" r="23" fill="#f8d34c"></circle><path d="M24,3A21,21,0,1,0,45,24,21,21,0,0,0,24,3Zm0,40A19,19,0,1,1,43,24,19,19,0,0,1,24,43Z" fill="#bb991d"></path><path d="M24,40a1,1,0,0,1-1-1V36a1,1,0,0,1,2,0v3A1,1,0,0,1,24,40Z" fill="#bb991d"></path><path d="M39.217,28.944a1,1,0,0,1-1.26.642L35.1,28.659a1,1,0,1,1,.618-1.9l2.853.927A1,1,0,0,1,39.217,28.944Z" fill="#bb991d"></path><path d="M33.405,11.056a1,1,0,0,1,.221,1.4L31.862,14.88A1,1,0,0,1,30.244,13.7l1.764-2.427A1,1,0,0,1,33.405,11.056Z" fill="#bb991d"></path><path d="M14.6,11.056a1,1,0,0,1,1.4.221L17.756,13.7a1,1,0,0,1-1.618,1.176l-1.764-2.427A1,1,0,0,1,14.6,11.056Z" fill="#bb991d"></path><path d="M8.783,28.944a1,1,0,0,1,.642-1.26l2.853-.927a1,1,0,1,1,.618,1.9l-2.853.927A1,1,0,0,1,8.783,28.944Z" fill="#bb991d"></path><path d="M30.181,33.478a.992.992,0,0,1-.465-.116l-5.716-3-5.716,3a1,1,0,0,1-1.45-1.053l1.092-6.365L13.3,21.438a1,1,0,0,1,.554-1.706l6.39-.928,2.858-5.79a1.039,1.039,0,0,1,1.792,0l2.858,5.79,6.39.928a1,1,0,0,1,.554,1.706l-4.624,4.506,1.092,6.365a1,1,0,0,1-.985,1.169Z" fill="#bb991d"></path></g></svg>
            Credit Setting 
          </nuxt-link>
          <div @click="logout" class="mx-2 text-white cursor-pointer mt-3 px-3 py-2 rounded-md hover:bg-indigo-800 flex items-center">
            <svg class="mr-3 h-6 w-6 fill-current" viewBox="0 0 48 48"><title>athletics</title><g stroke-linecap="square" stroke-linejoin="miter" stroke="currentColor"><circle cx="35.5" cy="7.5" r="4.5" fill="none" stroke="currentColor" stroke-miterlimit="10"></circle> <path d="M25,12l-7.922,9.362A4,4,0,0,0,18.116,27.4l6.929,4.042a1,1,0,0,1,.3,1.452L18,43" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="butt"></path> <path d="M10,15l3.6-5.4a1,1,0,0,1,1.1-.41L25,12l8,6,4.6,8.275a1,1,0,0,0,1.19.463L44,25" fill="none" stroke="currentColor" stroke-miterlimit="10"></path> <line x1="33" y1="18" x2="26" y2="26.281" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="butt"></line> <line x1="14" y1="31" x2="4" y2="43" fill="none" stroke="currentColor" stroke-miterlimit="10"></line></g></svg>
            <span class="block text-base font-medium hover:text-white focus:outline-none focus:text-white focus:bg-indigo-700">Sign out</span>
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
import DropDown from '../components/DropDown'

export default {
  components: {
    DropDown
  },
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