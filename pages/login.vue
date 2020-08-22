<template>
<div class="h-full w-full py-5 mx-auto flex flex-col justify-center items-center">
  <div class="h-16 w-16">
    <img class="h-full w-full" src="~/assets/img/logo.png" />
  </div>
  <p class="text-gray-100 text-opacity-75 text-sm font-light">~~ land of tolos ~~</p>
  <div class="mt-3">
    <form class="bg-white shadow-md rounded-lg px-8 py-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Email
        </label>
        <input v-model.trim="$v.form.email.$model" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email">
        <p v-if="errors && ! $v.form.email.required" class="text-red-500 text-xs italic">Email is required.</p>
        <p v-if="errors && ! $v.form.email.email" class="text-red-500 text-xs italic">Invalid email format.</p>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model.trim="$v.form.password.$model" @keyup.enter="login" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        <p v-if="errors && ! $v.form.password.required" class="text-red-500 text-xs italic">Password is required.</p>
      </div>
      <div class="flex items-center justify-between">
        <button @click="login" :disabled="loading" class="relative w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button">
          <svg v-if="loading" class="absolute left-0 animate-spin ml-3 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> 
          <span>
            Sign In
          </span>
        </button>
        <!-- <a class="ml-8 inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800" href="#">
          Forgot Password?
        </a> -->
      </div>
    </form>
  </div>
  <div class="mt-8 flex flex-wrap items-center justify-center">
    <div v-for="(c,index) in creatures" :key="index" class="p-1">
      <img class="h-12 w-12" :src="c.path" />
    </div>
  </div>
  <p class="mt-2 text-center text-gray-200 text-xs">
    &copy;{{ year }} {{ copyright }}. All rights reserved.
  </p>


</div>
</template>

<script>
import config from '../config'
import { required, email } from 'vuelidate/lib/validators'

export default {
  layout: 'blank',

  data: () => ({
    year: '', 
    copyright: 'Molo Inc',
    email: '',
    password: '',
    loading: false, 
    creatures: config.creatures, 

    errors: false,
    empty: false, 
    uiState: 'new', 
    form: {
      email: '',
      password: ''
    }
  }),

  created() {
    this.year = (new Date()).getFullYear()
  }, 

  validations: {
    form: {
      email: {
        required, email 
      }, 
      password: {
        required
      },
    }
  }, 

  methods: {
    login() {
      this.$v.form.$touch()

      this.empty = ! this.$v.form.$anyDirty
      this.errors = this.$v.form.$anyError 
      this.uiState = 'submitClicked'

      if (this.errors === false && this.empty === false) {
        this.uiState = 'submitted';

        this.loading = true 

        this.$fireAuth.signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(res => {
          this.$router.push({ path: '/' })
        })
        .catch(error => {
          alert(error.message)
        })
        .finally(() => this.loading = false)
      } else {
        this.uiState = 'error';
      }
    }
  }
}
</script>
