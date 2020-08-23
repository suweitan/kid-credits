<template>
  <div class="h-full w-full px-4 md:px-6 py-8 bg-gray-200 flex flex-col md:flex-row">
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
                  class="p-2 h-24 w-24 cursor-pointer bg-gray-100 shadow-lg rounded-lg object-cover object-center"     
                  :class="[ form.creature === c ? 'border-2 border-green-300' : '' ]"      
                  :src="c.path"
                  @click="setCreature(c)" />
                <span class="mt-2 text-center font-medium text-gray-700 text-xs capitalize">{{ c.name }}</span>
              </div>
            </div>
          </div>
        </div>
       
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Kid's name
          </label>
          <input v-model.lazy="$v.form.name.$model" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Kid's name">
          <p v-if="errors && ! $v.form.name.required" class="text-red-500 text-xs italic">Name is required.</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="credit">
            {{ form.name || 'Kid'}}'s starting credit 
          </label>
          <input v-model.lazy="$v.form.credit.$model" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="credit" placeholder="0">
          <p v-if="errors && ! $v.form.credit.required" class="text-red-500 text-xs italic">Credit is required.</p>
        </div>

        <div clas="mb-4">
          <p class="block text-gray-700 text-sm font-bold mb-2">
            Pick a color for {{ form.name || 'the kid' }} 
          </p>
          <div class="flex flex-wrap">
            <div v-for="(c,index) in colors" :key="index" class="p-1">
              <div 
                class="h-5 w-5 cursor-pointer"     
                :class="[ form.color === c ? 'border border-gray-900' : '' ]"           
                :style="{ backgroundColor: c }"
                @click="setColor(c)">
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-end">
          <div class="flex">
            <button @click="back" class="mr-3 text-red-500 font-bold py-2 px-4 focus:outline-none" type="button">
              Cancel
            </button>
            <button @click.prevent="submitForm" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-flex items-center" type="submit">
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Add Kid 
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
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
    creatures: [
      {
        name: 'Molo',
        path: require('~/assets/img/tolos/molo.png')
      },
      {
        name: 'Bubble',
        path: require('~/assets/img/tolos/bubble.png')
      },
      {
        name: 'Candy Monster',
        path: require('~/assets/img/tolos/candy_monster.png')
      },
      {
        name: 'Catrox',
        path: require('~/assets/img/tolos/catrox.png')
      },
      {
        name: 'Loop',
        path: require('~/assets/img/tolos/loop.png')
      },
      {
        name: 'Lumpy Pudding',
        path: require('~/assets/img/tolos/lumpy_pudding.png')
      },
      {
        name: 'Nono',
        path: require('~/assets/img/tolos/nono.png')
      },
      {
        name: 'Orx',
        path: require('~/assets/img/tolos/orx.png')
      },
      {
        name: 'Panglima',
        path: require('~/assets/img/tolos/panglima.png')
      },
      {
        name: 'Peddy',
        path: require('~/assets/img/tolos/peddy.png')
      },
      {
        name: 'Slom',
        path: require('~/assets/img/tolos/slom.png')
      },
      {
        name: 'Yambil',
        path: require('~/assets/img/tolos/yambil.png')
      },
    ], 
    colors: [
      '#f6e58d',
      '#ffbe76',
      '#ff7979',
      '#badc58',
      '#f9ca24',
      '#f0932b',
      '#eb4d4b',
      '#6ab04c',
      '#e056fd',
      '#686de0',
      '#30336b',
      '#22a6b3',
      '#be2edd',
      '#4834d4',
      '#55efc4',
      '#00cec9',
      '#a29bfe',
      '#fd79a8',
      '#e17055',
      '#fdcb6e',
      '#74b9ff'
    ]
  }), 
  validations: {
    form: {
      name: {
        required
      }, 
      credit: {
        required
      }
    }
  }, 
  methods: {
    setColor(c) {
      this.form.color = c 
    },
    setCreature(c) {
      this.form.creature = c 
    },
    submitForm() {
      this.formTouched = ! this.$v.form.$anyDirty;
      this.errors = this.$v.form.$invalid && this.formTouched;
      this.uiState = 'submitClicked';

      if (this.errors === false && this.formTouched === false) {
        this.uiState = 'submitted';

        let kid = {
          id: uuidv4(),
          color: this.form.color, 
          name: this.form.name, 
          creature: this.form.creature, 
          currCredit: this.form.credit
        }

        this.loading = true 

        this.$fireDb.ref('kids/' + kid.id).set(kid)
          .catch(err => alert(err))

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
