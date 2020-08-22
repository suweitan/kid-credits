<template>
  <div class="pt-6 pb-10 mx-auto max-w-md">
    <div v-if="kids" class="px-3 sm:px-0 overflow-auto">
      <div v-for="(k,index) in kids" :key="index" class="w-full mt-5 border-4 border-green-100 rounded-lg overflow-hidden shadow-2xl">
        <div class="px-2 sm:px-0 w-full flex items-center justify-center" :style="{ backgroundColor: k.color }">
          <nuxt-link 
            class="w-4/6 text-white flex items-center"
            :to="k._path">
            <div class="w-1/3 flex justify-center">
              <img 
                v-if="k.avatar"
                class="p-2 mx-2 sm:mx-3 h-12 w-12 sm:h-16 sm:w-16 bg-gray-100 shadow-lg rounded-full"     
                :src="k.avatar" />
              <div  
                v-else
                class="p-2 mx-2 sm:mx-3 h-12 w-12 sm:h-16 sm:w-16 text-white bg-gray-500 shadow-lg rounded-full flex items-center justify-center">
                ?
              </div>
            </div>

            <div class="flex-1 py-2 flex flex-col justify-center">
              <p class="text-center font-semibold text-lg">{{ k.name }}</p>
              <p class="leading-none text-5xl sm:text-6xl font-bold text-center">{{ k.currCredit }}</p>
              <p class="text-center font-normal text-base text-white text-opacity-75">points</p>
            </div>
          </nuxt-link>
          <div class="w-2/6 py-3 flex flex-col items-center justify-center">
            <button @click="showUpdateCredit(k, 'earn')" type="button" class="w-20 sm:w-24 bg-green-500 hover:bg-green-700 focus:outline-none border-2 border-white text-white font-bold py-2 px-3 sm:px-4 rounded-full">
              earn
            </button>
            <button @click="showUpdateCredit(k, 'spend')" type="button" class="my-2 w-20 sm:w-24 bg-orange-500 hover:bg-orange-700 focus:outline-none border-2 border-white text-white font-bold py-2 px-3 sm:px-4 rounded-full">
              spend
            </button>
            <button @click="showUpdateCredit(k, 'deduct')" type="button" class="w-20 sm:w-24 bg-red-500 hover:bg-red-700 focus:outline-none border-2 border-white text-white font-bold py-2 px-3 sm:px-4 rounded-full">
              deduct  
            </button>
          </div>
          <!-- <div class="w-2/6 border-l border-white">
            <div @click="addPoint(k)" class="text-white border-b border-white flex items-center justify-center font-hairline text-6xl cursor-pointer">
              +
            </div>
            <div @click="minusPoint(k)" class="text-white flex items-center justify-center font-hairline text-6xl cursor-pointer">
              &ndash;
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <modal
      :showing="showModal"
      @close="updateCreditDone"
      :showClose="true"
    >
      <div class="py-5 px-3 sm:px-5 overflow-auto">
        <div v-if="! loading && selectedKid" class="mb-8 w-100 flex items-center justify-center">
          <div class="w-24 h-24 bg-gray-400 text-white rounded-lg flex items-center justify-center">
            <span class="text-4xl font-bold">{{ selectedKid.currCredit }}</span>
          </div>
          <svg class="mx-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64"><title>arrow-right-3</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><path fill="none" stroke="currentColor" stroke-miterlimit="10" d="M60,32L32,10v14H12 c-4.4,0-8,3.6-8,8v0c0,4.4,3.6,8,8,8h20v14L60,32z"></path></g></svg>
          <div :class="selectedCreditTypeClass" class="w-24 h-24 text-white rounded-lg flex items-center justify-center">
            <span class="text-5xl font-bold">{{ newCredit }}</span>
          </div>
        </div>
        <p class="mb-3 text-lg font-bold">Update {{ selectedKidName }}'s Credit</p> 

        <div class="my-3">
          <p v-if="selectedCreditType === 'earn'" class="text-gray-700 text-sm">
            <span class="capitalize">{{ selectedKidName }}</span> has done something right. Give {{ selectedKidName }} some credits. 
          </p>
          <p v-if="selectedCreditType === 'deduct'" class="text-gray-700 text-sm">
            <span class="capitalize">{{ selectedKidName }}</span> has done something wrong. Deduct {{ selectedKidName }} some credits. 
          </p>
          <p v-if="selectedCreditType === 'spend'" class="text-gray-700 text-sm">
            <span class="capitalize">{{ selectedKidName }}</span> wants to use some credits. 
          </p>
        </div>

        <div>
          <div v-for="(c,index) in credits" :key="index">
            <div 
              v-if="c.type === selectedCreditType"
              :class="selectedCreditTypeClass"
              @click="selectedCredit = c"
              class="mb-3 px-4 py-2 cursor-pointer font-medium text-white rounded-lg flex items-center justify-between">
              <span class="flex-1 flex items-center">
                <svg v-if="selectedCredit && selectedCredit.id === c.id" class="mr-2" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>o-check</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><polygon fill="none" stroke="currentColor" stroke-miterlimit="10" points="4,30 10,24 24,34 54,10 60,14 24,52 "></polygon></g></svg>
                {{ c.name }}
              </span>
              <span class="w-1/6 text-2xl font-bold text-right">{{ c.sign * c.credit }}</span>
            </div>
          </div>

          <div v-if="selectedCredit" class="mt-16 flex items-center justify-center">
            <button @click.prevent="updateCredit()" class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline text-center inline-flex items-center justify-center" type="button">
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              UPDATE
            </button>
          </div>
        </div>
      
      </div>
    </modal>
  </div>
</template>

<script>
import config from '../config'
import { formatDate } from '../utils/date'
import Modal from '../components/Modal'
// import { DoubleBounce } from 'vue-loading-spinner'

export default {
  components: {
    Modal, 
    // DoubleBounce
  }, 
  created() {
    this.credits = config.credits

    let kidsRef = this.$fireDb.ref('kids')

    kidsRef.once('value', snapshot => {
      let kids = snapshot.val()
      
      for (let [key, value] of Object.entries(kids)) {
        value._path = `/kids/${value.id}`

        let filename = value.creature.filename || `${value.creature.name}.png`

        value.avatar = require(`~/assets/img/tolos/${filename}`)

        this.kids.push(value)
      }
    })
  },
  data: () => ({
    showModal: false, 
    kids: [],
    credits: [], 
    selectedKid: null, 
    selectedCreditType: null, 
    selectedCredit: null, 
    loading: false
  }), 
  computed: {
    newCredit() {
      if (! this.selectedKid || ! this.selectedCredit) return '?'

      return this.selectedKid.currCredit + (this.selectedCredit.sign * this.selectedCredit.credit)
    },
    selectedKidName() {
      if (this.selectedKid) return this.selectedKid.name 

      return 'kid' 
    },
    selectedCreditTypeClass() {
      if (this.selectedCreditType === 'earn') {
        return ['bg-green-500', 'border-green-300']
      }
      else if (this.selectedCreditType === 'spend') {
        return ['bg-orange-500', 'border-orange-300']
      }
      else if (this.selectedCreditType === 'deduct') {
        return ['bg-red-500', 'border-red-300']
      } else {
        return ['bg-gray-500', 'border-gray-300']
      }
    }
  },
  methods: {
    showUpdateCredit(kid, type) {
      this.selectedKid = kid
      this.selectedCreditType = type 

      this.showModal = true 
    },
    updateCreditDone() {
      this.selectedCredit = null 
      this.selectedKid = null
      this.selectedCreditType = null 

      this.showModal = false
    },
    updateCredit() {
      if (! this.selectedKid || ! this.selectedCredit) return 

      let amount = this.selectedCredit.sign * this.selectedCredit.credit

      this.selectedKid.currCredit += amount

      let date = new Date()
      let movement = {
        created_at: date.getTime(), 
        credit: amount, 
        description: this.selectedCredit.name, 
        type: this.selectedCredit.type
      }

      let updates = {}
      
      updates['kids/'+this.selectedKid.id] = { ...this.selectedKid }
      updates['movements/'+this.selectedKid.id+'/'+formatDate(date)+'/'+date.getTime()] = movement

      this.loading = true
      this.$fireDb.ref().update(
        updates, 
        (error) => {
          if (error) {
            console.error(error)
          } 
        }
      )
      .finally(() => {
        this.loading = false 
        this.updateCreditDone()
      })
    },
    addPoint(kid) {
      kid.currCredit ++

      this.$fireDb.ref('kids/' + kid.id).set({
        ...kid 
      })
      .catch(err => console.error(err))

    },
    minusPoint(kid) {
      kid.currCredit --

      this.$fireDb.ref('kids/' + kid.id).set({
        ...kid 
      })
      .catch(err => console.error(err))
    }
  }
}
</script>
