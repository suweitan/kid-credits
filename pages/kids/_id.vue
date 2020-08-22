<template>
  <div class="h-full w-full px-4 md:px-6 pt-3 pb-8 bg-indigo-300">
    <div v-if="mode !== 'create'" class="mb-3 w-full">
      <nuxt-link :to="historyPath" class="cursor-pointer flex items-center justify-end">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64"><title>clock</title><g><path d="M32,1C14.907,1,1,14.907,1,32s13.907,31,31,31s31-13.907,31-31S49.093,1,32,1z M32,61C16.01,61,3,47.99,3,32 C3,16.01,16.01,3,32,3s29,13.01,29,29C61,47.99,47.99,61,32,61z"></path> <circle cx="32" cy="10" r="2"></circle> <circle cx="54" cy="32" r="2"></circle> <circle cx="32" cy="54" r="2"></circle> <circle cx="10" cy="32" r="2"></circle> <path d="M36.885,35.471c-0.39,0.547-0.867,1.024-1.414,1.414l9.822,9.822l1.414-1.414L36.885,35.471z "></path> <path d="M35.851,30.977l8.563-8.563c0.781-0.781,0.781-2.047,0-2.828 c-0.781-0.781-2.047-0.781-2.828,0l-8.563,8.563c-0.746-0.199-1.299-0.199-2.046,0L20.414,17.586c-0.781-0.781-2.047-0.781-2.828,0 c-0.781,0.781-0.781,2.047,0,2.828l10.563,10.563C28.062,31.306,28,31.644,28,32c0,2.206,1.794,4,4,4s4-1.794,4-4 C36,31.644,35.938,31.306,35.851,30.977z"></path></g></svg>
        <span class="ml-2 text-sm text-blue-500 font-medium hover:underline">Kid's Credit History</span>
      </nuxt-link>
    </div>
    <div class="flex flex-col md:flex-row">

      <div class="mb-3 w-full md:w-1/4 pr-3">
        <p class="mb-1 text-gray-800 font-bold">Kid's Information</p>
        <p class="text-gray-600 leading-snug text-sm">Kid's name and give the kid a nice color and a starting credit.</p>
      </div>
      <div class="w-full md:w-3/4">
        <div v-if="errors" class="mb-3">
          <div class="bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg" role="alert">
            <p class="font-bold">Form Incomplete</p>
            <p>Please complete the form and resubmit</p>
          </div>
        </div>

        <form class="bg-white shadow-md rounded-lg px-8 py-8 mb-4">
          <div class="mb-4">
            <p class="block text-gray-700 text-sm font-bold mb-2">
              Pick a creature for your kid 
            </p>
            <div class="flex flex-wrap">
              <div v-for="(c,index) in creatures" :key="index" class="p-2">
                <div class="flex flex-col">                
                  <img 
                    class="p-2 h-24 w-24 cursor-pointer bg-gray-100 hover:bg-gray-200 shadow-lg rounded-lg object-cover object-center"     
                    :class="[ form.creature && form.creature.id === c.id ? 'shadow-outline-green bg-gray-200' : '' ]"      
                    :src="c.path"
                    @click="setCreature(c)" />
                  <span class="mt-2 text-center font-medium text-gray-700 text-xs capitalize">{{ c.name }}</span>
                </div>
              </div>
            </div>
            <p v-if="errors && ! $v.form.creature.required" class="text-red-500 text-xs italic">Select a creature.</p>
          </div>
        
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Kid's name
            </label>
            <input v-model.lazy="$v.form.name.$model" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline-green" id="name" type="text" placeholder="Kid's name">
            <p v-if="errors && ! $v.form.name.required" class="text-red-500 text-xs italic">Name is required.</p>
          </div>

          <div v-if="mode === 'create'" class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="credit">
              {{ form.name || 'Kid'}}'s starting credit 
            </label>
            <input v-model.lazy="$v.form.credit.$model" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline-green" id="credit" placeholder="0">
            <p v-if="errors && ! $v.form.credit.required" class="text-red-500 text-xs italic">Credit is required.</p>
          </div>

          <div clas="mb-4">
            <p class="block text-gray-700 text-sm font-bold mb-2">
              Pick a color for {{ form.name || 'the kid' }} 
            </p>
            <div class="flex flex-wrap">
              <div v-for="(c,index) in colors" :key="index" class="p-2">
                <div 
                  class="h-8 w-8 cursor-pointer rounded-lg"     
                  :class="[ form.color === c ? 'shadow-outline-green' : '' ]"           
                  :style="{ backgroundColor: c }"
                  @click="setColor(c)">
                </div>
              </div>
            </div>
          </div>

          <div class="mt-16 flex items-center justify-end">
            <div class="flex">
              <button @click="back" class="mr-3 text-red-500 font-bold py-2 px-4 rounded-full hover:bg-red-100 focus:outline-none" type="button">
                Cancel
              </button>
              <button @click.prevent="submitForm" :disabled="loading" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline inline-flex items-center" type="submit">
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ submitBtn }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { required } from 'vuelidate/lib/validators'
import config from '../../config'

export default {
  created() {
    this.kidId = this.$route.params.id

    this.mode = this.kidId ? 'update' : 'create'

    if (this.mode === 'create') {
      this.submitBtn = 'Add Kid'
    } else {
      this.submitBtn = 'Update Kid Information'

      this.$fireDb.ref(`kids/${this.kidId}`).once('value', snapshot => {
        let kid = snapshot.val()
      
        this.form.name = kid.name
        this.form.credit = kid.currCredit
        this.form.color = kid.color
        this.form.creature = kid.creature
      })
    }
  },
  data: () => ({
    kidId: null,
    mode: null,  
    submitBtn: null, 

    errors: false,
    formTouched: false, 
    uiState: 'new', 
    empty: true,
    form: {
      name: '', 
      credit: 0, 
      color: '#55efc4',
      creature: null 
    },
    loading: false,
    creatures: config.creatures, 
    colors: config.colors
  }), 
  validations: {
    form: {
      name: {
        required
      }, 
      credit: {
        required
      },
      creature: {
        required 
      }
    }
  }, 
  computed: {
    historyPath() {
      return `/history/${this.kidId}`
    }
  },
  methods: {
    setColor(c) {
      this.form.color = c 
    },
    setCreature(c) {
      // this.$v.form.creature.$model = c 
      this.form.creature = c 
    },
    submitForm() {
      this.formTouched = ! this.$v.form.$anyDirty;
      this.errors = this.$v.form.$invalid && this.formTouched;
      this.uiState = 'submitClicked';

      //  && this.formTouched === false
      if (this.errors === false) {
        this.uiState = 'submitted';

        let kid = {
          id: this.kidId ? this.kidId : uuidv4(),
          color: this.form.color, 
          name: this.form.name, 
          creature: this.form.creature, 
          currCredit: this.form.credit
        }

        this.loading = true 

        this.$fireDb.ref('kids/' + kid.id).set(kid)
          .catch(err => console.error(err))

        this.$fireDb.ref('kids/' + kid.id).once('value', snapshot => {
          this.$router.push({ path: '/' })
        })
        .finally(() => this.loading = false)
      }
    }, 

    back() {
      this.$router.push('/')
    }
  }
}
</script>