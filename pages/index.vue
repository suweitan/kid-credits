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

            <div class="flex-1 py-2 flex flex-col items-center justify-center">
              <p @click.prevent="toKidHistory(k.id)" class="text-center leading-tight font-semibold text-lg flex items-center">
                <svg class="mr-2 h-5 w-5 fill-current text-white opacity-50" viewBox="0 0 64 64"><title>clock</title><g><path d="M32,1C14.907,1,1,14.907,1,32s13.907,31,31,31s31-13.907,31-31S49.093,1,32,1z M32,61C16.01,61,3,47.99,3,32 C3,16.01,16.01,3,32,3s29,13.01,29,29C61,47.99,47.99,61,32,61z"></path> <circle cx="32" cy="10" r="2"></circle> <circle cx="54" cy="32" r="2"></circle> <circle cx="32" cy="54" r="2"></circle> <circle cx="10" cy="32" r="2"></circle> <path d="M36.885,35.471c-0.39,0.547-0.867,1.024-1.414,1.414l9.822,9.822l1.414-1.414L36.885,35.471z "></path> <path d="M35.851,30.977l8.563-8.563c0.781-0.781,0.781-2.047,0-2.828 c-0.781-0.781-2.047-0.781-2.828,0l-8.563,8.563c-0.746-0.199-1.299-0.199-2.046,0L20.414,17.586c-0.781-0.781-2.047-0.781-2.828,0 c-0.781,0.781-0.781,2.047,0,2.828l10.563,10.563C28.062,31.306,28,31.644,28,32c0,2.206,1.794,4,4,4s4-1.794,4-4 C36,31.644,35.938,31.306,35.851,30.977z"></path></g></svg>
                {{ k.name }}
              </p>
              <p class="mt-2 leading-none text-5xl sm:text-6xl font-bold text-center">{{ k.currCredit }}</p>
              <p class="text-center font-normal text-base text-white text-opacity-75">pts</p>
            </div>
          </nuxt-link>
          <div class="w-2/6 py-3 flex flex-col items-center justify-center">
            <button @click="showUpdateCredit(k, 'earn')" type="button" class="w-20 sm:w-24 py-2 px-3 sm:px-4 bg-green-500 hover:bg-green-700 focus:outline-none border-2 border-white text-white font-bold rounded-full">
              earn
            </button>
            <button @click="showUpdateCredit(k, 'spend')" type="button" class="my-2 w-20 sm:w-24 py-2 px-3 sm:px-4 bg-orange-500 hover:bg-orange-700 focus:outline-none border-2 border-white text-white font-bold rounded-full">
              spend
            </button>
            <button @click="showUpdateCredit(k, 'deduct')" type="button" class="w-20 sm:w-24 py-2 px-3 sm:px-4 bg-red-500 hover:bg-red-700 focus:outline-none border-2 border-white text-white font-bold rounded-full">
              deduct  
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal
      :showing="showModal"
      @close="updateCreditDone"
      :showClose="true"
      :fullScreen="true"
    >
      <div class="h-full mt-5 pt-5 pb-32 sm:pb-10 px-3 sm:px-5 flex flex-col">
        <div v-if="! loading && selectedKid" class="mb-8 w-100 flex items-center justify-center">
          <div class="w-12 sm:w-16 h-12 sm:h-16 bg-gray-400 text-white rounded-lg flex items-center justify-center">
            <span class="text-3xl sm:text-4xl font-bold">{{ selectedKid.currCredit }}</span>
          </div>
          <svg class="mx-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64"><title>arrow-right-3</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><path fill="none" stroke="currentColor" stroke-miterlimit="10" d="M60,32L32,10v14H12 c-4.4,0-8,3.6-8,8v0c0,4.4,3.6,8,8,8h20v14L60,32z"></path></g></svg>
          <div 
            :class="selectedCreditTypeClass" 
            class="w-16 sm:w-24 h-16 sm:h-24 text-white rounded-lg flex items-center justify-center">
            <span class="text-4xl sm:text-5xl font-bold">{{ newCredit }}</span>
          </div>
        </div>
        <p class="mb-3 text-lg font-bold">Update {{ selectedKidName }}'s Credit</p> 

        <div class="my-2 sm:my-3">
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
        <div v-if="selectedCredit" class="my-5 flex items-center justify-center">
          <!-- <button @click.prevent="updateCredit()" class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 sm:py-3 px-4 rounded-full focus:outline-none focus:shadow-outline text-center inline-flex items-center justify-center" type="button">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 sm:h-5 w-4 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm sm:text-lg">UPDATE</span>
          </button> -->
          <brand-button class="w-full" @click="updateCredit" :loading="loading" label="UPDATE"></brand-button>
        </div>

        <div class="flex-1 overflow-auto">
          <div v-for="(c,index) in credits" :key="index">
            <div 
              v-if="c.type === selectedCreditType"
              :class="selectedCreditTypeClass"
              class="mb-3 px-4 py-1 sm:py-2 cursor-pointer rounded-lg"
              @click="selectedCredit = c">
              <div class="font-medium text-white flex items-center justify-between">
                <span class="text-sm sm:text-lg flex-1 flex items-center leading-tight">
                  <svg v-if="selectedCredit && selectedCredit.id === c.id" class="mr-2 fill-current h-4 sm:h-5 w-4 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>o-check</title><g><path d="M54.6,9.2c-0.4-0.2-0.8-0.2-1.2,0.1L24,32.7l-13.4-9.6c-0.4-0.3-0.9-0.2-1.3,0.1l-6,6c-0.4,0.4-0.4,1,0,1.4 l20,22c0.2,0.2,0.5,0.3,0.7,0.3c0,0,0,0,0,0c0.3,0,0.5-0.1,0.7-0.3l36-38c0.2-0.2,0.3-0.5,0.3-0.8s-0.2-0.6-0.4-0.7L54.6,9.2z"></path></g></svg>
                  {{ c.name }}
                </span>
                <div class="relative w-16 pr-3 text-xl sm:text-2xl font-bold text-right">
                  {{ c.sign * c.credit }}
                  <div v-if="selectedCredit && selectedCredit.id === c.id" class="absolute top-0 right-0 h-4 sm:h-5 w-4 sm:w-5 rounded-full bg-yellow-300 mt-0 -mr-1 sm:-mt-1 sm:-mr-2 flex items-center justify-center">
                    <span style="font-size:10px;" class="text-black">
                      &times;{{ selectedCredit.quantity }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="selectedCredit && selectedCredit.id === c.id" class="mt-3 text-white flex items-center justify-around sm:justify-end">
                <div class="flex items-center">
                  <button @click="subQuantity" class="focus:outline-none" type="button">
                    <svg class="h-t w-6 fill-current mr-8" viewBox="0 0 64 64"><title>c-delete</title><g><path d="M32,2A30,30,0,1,0,62,32,30.026,30.026,0,0,0,32,2ZM46,33H18a1,1,0,0,1,0-2H46a1,1,0,0,1,0,2Z"></path></g></svg>
                  </button>
                  <button @click="addQuantity" class="focus:outline-none" type="button">
                    <svg class="h-6 w-6 fill-current"  viewBox="0 0 64 64"><title>c-add</title><g><path d="M32,2A30,30,0,1,0,62,32,30.026,30.026,0,0,0,32,2ZM46,33H33V46a1,1,0,0,1-2,0V33H18a1,1,0,0,1,0-2H31V18a1,1,0,0,1,2,0V31H46a1,1,0,0,1,0,2Z"></path></g></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { formatDate } from '../utils/date'
import Modal from '../components/Modal'
import BrandButton from '../components/BrandButton'

export default {
  components: {
    Modal, BrandButton
  }, 
  created() {
    this.isDev = process.env.NODE_ENV === 'development'
    
    this.$fireDb.ref(`credits`).orderByKey().on('value', (snapshot) => {
      if (! snapshot.val()) {
        this.credits = []

        return 
      } 
      
      let credits = []
      for (const [slug,credit] of Object.entries(snapshot.val())) {
        credit.quantity = credit.quantity || 1 

        credits.push(credit)
      }     
      
      this.credits = credits
    })

    let kidsRef = this.$fireDb.ref('kids')

    kidsRef.once('value', snapshot => {
      let kids = snapshot.val()
      
      for (let [key, value] of Object.entries(kids)) {
        if (! this.isDev && value.test) {
          continue 
        }

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
    loading: false,
    isDev: false 
  }), 
  computed: {
    newCredit() {
      if (! this.selectedKid || ! this.selectedCredit) return '?'

      return this.selectedKid.currCredit + this.selectedCredit.quantity * (this.selectedCredit.sign * this.selectedCredit.credit)
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

      let amount = this.selectedCredit.quantity * this.selectedCredit.sign * this.selectedCredit.credit

      this.selectedKid.currCredit += amount

      let date = new Date()
      let movement = {
        created_at: date.getTime(), 
        credit: amount, 
        description: this.selectedCredit.name, 
        type: this.selectedCredit.type,
        quantity: this.selectedCredit.quantity
      }

      let updates = {}
      
      updates['kids/'+this.selectedKid.id] = { ...this.selectedKid }
      updates['movements/'+this.selectedKid.id+'/'+formatDate(date)+'/'+date.getTime()] = movement

      this.loading = true
      this.$fireDb.ref().update(
        updates, 
        (error) => {
          if (error) {
            alert(error)
          } 
        }
      )
      .finally(() => {
        this.loading = false 
        this.updateCreditDone()
      })
    },
    addQuantity() {
      if (! this.selectedCredit) return 

      this.selectedCredit.quantity ++ 
    },
    subQuantity() {
      if (! this.selectedCredit) return 

      if (this.selectedCredit.quantity > 1) 
        this.selectedCredit.quantity -- 
    },
    toKidHistory(id) {
      this.$router.push(`/history/${id}`)
    }
  }
}
</script>
