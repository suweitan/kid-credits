<template>
  <div class="h-full w-full px-4 md:px-6 pt-3 pb-8 text-teal-400">
    <div @click="toggleEdit" class="mb-3 w-full flex justify-end cursor-pointer">
      <svg class="text-yellow-300 opacity-75" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>pen-tool</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><line fill="none" stroke-miterlimit="10" x1="5" y1="59" x2="22.464" y2="41.536"></line> <ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -19.2548 29.5147)" fill="none" stroke-miterlimit="10" cx="26" cy="38" rx="5" ry="5"></ellipse> <polyline fill="none" stroke="currentColor" stroke-miterlimit="10" points="32,14 12,22 5,59 42,52 50,32 "></polyline> <rect x="39.757" y="0.201" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.2548 36.9706)" fill="none" stroke="currentColor" stroke-miterlimit="10" width="8.485" height="39.598"></rect></g></svg>
      <span class="ml-2 text-sm text-yellow-300 font-medium hover:underline">Edit</span>
    </div>

    <div class="h-full overflow-scroll">
      <div>
        <div class="mt-5 flex items-center justify-between text-yellow-300 ">
          <p class="text-center font-bold text-lg capitalize">"Earn" Credits</p>
          <svg @click="promptAdd('earn')" class="h-4 sm:h-5 w-4 sm:w-5 fill-current cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>c-add</title><g><path d="M32,2A30,30,0,1,0,62,32,30.026,30.026,0,0,0,32,2ZM46,33H33V46a1,1,0,0,1-2,0V33H18a1,1,0,0,1,0-2H31V18a1,1,0,0,1,2,0V31H46a1,1,0,0,1,0,2Z"></path></g></svg>
        </div>
        <div v-for="(credit,i) in earns" :key="i" class="mt-2 mb-3 px-5 py-2 border border-gray-100 bg-indigo-600 hover:bg-indigo-800 rounded-lg flex items-center justify-between">
          <div @click="promptUpdate(credit)" :class="canEdit ? 'cursor-pointer' : ''">
            <p class="leading-tight font-bold">{{ credit.name }}</p>
          </div>
          <div class="flex items-center">
            <span class="text-2xl sm:text-3xl font-bold">{{ credit.sign * credit.credit }}</span>
            <svg class="ml-3 h-5 sm:h-6 w-5 sm:w-6 cursor-pointer text-red-700" @click="promptDelete(credit)" v-if="canEdit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>trash</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><polyline points="22 12 22 3 42 3 42 12" fill="none" stroke="currentColor" stroke-miterlimit="10"></polyline><path d="M53,26V56a5,5,0,0,1-5,5H16a5,5,0,0,1-5-5V26" fill="none" stroke="currentColor" stroke-miterlimit="10"></path><line x1="32" y1="31" x2="32" y2="49" fill="none" stroke-miterlimit="10"></line><line x1="22" y1="31" x2="22" y2="49" fill="none" stroke-miterlimit="10"></line><line x1="42" y1="31" x2="42" y2="49" fill="none" stroke-miterlimit="10"></line><rect x="4" y="12" width="56" height="8" fill="none" stroke="currentColor" stroke-miterlimit="10"></rect></g></svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="h-full overflow-scroll">
      <div>
        <div class="mt-5 flex items-center justify-between text-yellow-300 ">
          <p class="text-center font-bold text-lg capitalize">"Spend" Credits</p>
          <svg @click="promptAdd('spend')" class="h-4 sm:h-5 w-4 sm:w-5 fill-current cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>c-add</title><g><path d="M32,2A30,30,0,1,0,62,32,30.026,30.026,0,0,0,32,2ZM46,33H33V46a1,1,0,0,1-2,0V33H18a1,1,0,0,1,0-2H31V18a1,1,0,0,1,2,0V31H46a1,1,0,0,1,0,2Z"></path></g></svg>
        </div>
        <div v-for="(credit,i) in spends" :key="i" class="mt-2 mb-3 px-5 py-2 border border-gray-100 bg-indigo-600 hover:bg-indigo-800 rounded-lg flex items-center justify-between">
          <div @click="promptUpdate(credit)" :class="canEdit ? 'cursor-pointer' : ''">
            <p class="leading-tight font-bold">{{ credit.name }}</p>
          </div>
          <div class="flex items-center">
            <span class="text-2xl sm:text-3xl font-bold">{{ credit.sign * credit.credit }}</span>
            <svg @click="promptDelete(credit)" v-if="canEdit" class="ml-3 h-5 sm:h-6 w-5 sm:w-6 cursor-pointer text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>trash</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><polyline points="22 12 22 3 42 3 42 12" fill="none" stroke="currentColor" stroke-miterlimit="10"></polyline><path d="M53,26V56a5,5,0,0,1-5,5H16a5,5,0,0,1-5-5V26" fill="none" stroke="currentColor" stroke-miterlimit="10"></path><line x1="32" y1="31" x2="32" y2="49" fill="none" stroke-miterlimit="10"></line><line x1="22" y1="31" x2="22" y2="49" fill="none" stroke-miterlimit="10"></line><line x1="42" y1="31" x2="42" y2="49" fill="none" stroke-miterlimit="10"></line><rect x="4" y="12" width="56" height="8" fill="none" stroke="currentColor" stroke-miterlimit="10"></rect></g></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full overflow-scroll">
      <div>
        <div class="mt-5 flex items-center justify-between text-yellow-300 ">
          <p class="text-center font-bold text-lg capitalize">"Deduct" Credits</p>
          <svg @click="promptAdd('deduct')" class="h-4 sm:h-5 w-4 sm:w-5 fill-current cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>c-add</title><g><path d="M32,2A30,30,0,1,0,62,32,30.026,30.026,0,0,0,32,2ZM46,33H33V46a1,1,0,0,1-2,0V33H18a1,1,0,0,1,0-2H31V18a1,1,0,0,1,2,0V31H46a1,1,0,0,1,0,2Z"></path></g></svg>
        </div>

        <div v-for="(credit,i) in deducts" :key="i" class="mt-2 mb-3 px-5 py-2 border border-gray-100 bg-indigo-600 hover:bg-indigo-800 rounded-lg flex items-center justify-between">
          <div @click="promptUpdate(credit)" :class="canEdit ? 'cursor-pointer' : ''">
            <p class="font-bold">{{ credit.name }}</p>
          </div>
          <div class="flex items-center">
            <span class="text-2xl sm:text-3xl font-bold">{{ credit.sign * credit.credit }}</span>
            <svg @click="promptDelete(credit)" v-if="canEdit" class="ml-3 h-5 sm:h-6 w-5 sm:w-6 cursor-pointer text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>trash</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><polyline points="22 12 22 3 42 3 42 12" fill="none" stroke="currentColor" stroke-miterlimit="10"></polyline><path d="M53,26V56a5,5,0,0,1-5,5H16a5,5,0,0,1-5-5V26" fill="none" stroke="currentColor" stroke-miterlimit="10"></path><line x1="32" y1="31" x2="32" y2="49" fill="none" stroke-miterlimit="10"></line><line x1="22" y1="31" x2="22" y2="49" fill="none" stroke-miterlimit="10"></line><line x1="42" y1="31" x2="42" y2="49" fill="none" stroke-miterlimit="10"></line><rect x="4" y="12" width="56" height="8" fill="none" stroke="currentColor" stroke-miterlimit="10"></rect></g></svg>
          </div>
        </div>
      </div>
    </div>

    <modal
      :showing="showUpdateModal"
      :fullScreen="true"
      @close="updateDone"
      :showClose="true"
    >
      <div v-if="selectedCredit" class="p-5">
        <p class="mb-3 text-indigo-700 text-lg font-bold capitalize">Update {{ selectedCredit.type }} Credit</p> 
        <div class="mt-8 mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Credit description
          </label>
          <input v-model.lazy="$v.form.name.$model" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline-green" id="name" type="text" placeholder="Description">
          <p v-if="errors && ! $v.form.name.required" class="text-red-500 text-xs italic">Name is required.</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="credit">
            Credit value
          </label>
          <input v-model.lazy="$v.form.credit.$model" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline-green" id="credit" placeholder="0">
          <p v-if="errors && ! $v.form.credit.required" class="text-red-500 text-xs italic">Credit is required.</p>
        </div>

        <div class="mt-8 flex items-center justify-center">
          <button @click.prevent="updateCredit" :disabled="loading" class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 sm:py-3 px-4 rounded-full focus:outline-none focus:shadow-outline-red text-center items-center justify-center" type="button">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Update
          </button>
        </div>      
      </div>
    </modal>

    <modal
      :showing="showAddModal"
      :fullScreen="true"
      @close="updateDone"
      :showClose="true"
    >
      <div class="p-5">
        <p class="mb-3 text-indigo-700 text-lg font-bold capitalize">Add {{ selectedType }} Credit</p> 
        <div class="mt-8 mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Credit description
          </label>
          <input v-model.lazy="$v.form.name.$model" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline-green" id="name" type="text" placeholder="Description">
          <p v-if="errors && ! $v.form.name.required" class="text-red-500 text-xs italic">Name is required.</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="credit">
            Credit value
          </label>
          <input v-model.lazy="$v.form.credit.$model" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline-green" id="credit" placeholder="0">
          <p v-if="errors && ! $v.form.credit.required" class="text-red-500 text-xs italic">Credit is required.</p>
        </div>

        <div class="mt-8 flex items-center justify-center">
          <button @click.prevent="updateCredit" :disabled="loading" class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 sm:py-3 px-4 rounded-full focus:outline-none focus:shadow-outline-red text-center flex items-center justify-center" type="button">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Add
          </button>
        </div>      
      </div>
    </modal>

    <modal
      :showing="showDeleteModal"
      @close="promptDeleteDone"
      :showClose="true"
    >
      <div class="p-5">
        <p class="mb-3 text-red-700 text-lg font-bold">Delete Credit?</p> 
        <p class="text-red-500">This action cannot be undone!</p>
        <div class="mt-16 flex items-center justify-center">
          <button @click.prevent="deleteCredit" class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline-red text-center" type="button">
            DELETE
          </button>
        </div>
      
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '../../components/Modal'
import { formatDate } from '../../utils/date'
import { required } from 'vuelidate/lib/validators'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: {
    Modal
  }, 
  created() {
    this.creditRef = this.$fireDb.ref(`credits`)

    this.creditRef.orderByKey().on('value', (snapshot) => {
      if (! snapshot.val()) {
        this.credits = []

        this.earns = []
        this.spends = []
        this.deducts = []

        return 
      } 
      
      let earns = []
      let spends = []
      let deducts = []

      for (const [slug,credit] of Object.entries(snapshot.val())) {
        if (credit.type === 'earn') {
          earns.push(credit)
        }
        else if (credit.type === 'spend') {
          spends.push(credit)
        }
        else {
          deducts.push(credit)
        }
      }     
      
      this.earns = earns
      this.spends = spends
      this.deducts = deducts
    })
  },
  destroyed() {
    if (this.creditRef) {
      this.creditRef.off()
    }
  },
  data: () => ({
    earns: [],
    deducts: [],
    spends: [], 
    credits: [],

    showAddModal: false, 
    showUpdateModal: false, 
    showDeleteModal: false, 
    selectedCredit: null, 
    selectedType: null, 
    creditRef: null,
    canEdit: false, 

    errors: false,
    formTouched: false, 
    uiState: 'new', 
    empty: true,
    form: {
      id: '',
      type: '',
      sign: 1,
      name: '', 
      credit: 0, 
    },
    loading: false,
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
    back() {
      this.$router.push('/')
    },

    toggleEdit() {
      this.canEdit = ! this.canEdit
    },

    promptDelete(item) {
      this.showDeleteModal = true 
      this.selectedCredit = item 
    },

    deleteCredit() {
      if (! this.selectedCredit) return 

      let updates = {}
      
      updates[`credits/${this.selectedCredit.id}`] = null

      this.loading = true
      this.$fireDb.ref().update(
        updates, 
        (error) => {
          if (error) {
            alert(error)
          } 
        }
      )
      .catch(error => alert(error))
      .finally(() => {
        this.loading = false 
        this.showDeleteModal = false
      })
    },

    promptDeleteDone() {
      this.selectedCredit = null

      this.showDeleteModal = false
    },

    promptUpdate(item) {
      this.showUpdateModal = true 
      this.selectedCredit = item 

      this.form.id = item.id 
      this.form.name = item.name 
      this.form.credit = item.sign * item.credit 
      this.form.sign = item.sign 
      this.form.type = item.type 
    },

    updateCredit() {
      this.formTouched = ! this.$v.form.$anyDirty;
      this.errors = this.$v.form.$invalid && this.formTouched;
      this.uiState = 'submitClicked';

      if (this.errors === false) {
        this.uiState = 'submitted';

        this.form.credit = Math.abs(this.form.credit)
        let credit = { ...this.form }

        this.loading = true 

        this.$fireDb.ref('credits/' + credit.id).set(credit)
          .catch(err => alert(err))
          .finally(() => {
            this.loading = false
            this.updateDone()
          })
      }
    }, 

    updateDone() {
      this.selectedCredit = null
      this.showUpdateModal = false

      this.selectedType = null
      this.showAddModal = false
    },

    promptAdd(type) {
      this.showAddModal = true 
      this.selectedType = type 

      this.form.id = uuidv4()
      this.form.name = ''
      this.form.credit = 0
      this.form.sign = type === 'earn' ? 1 : -1
      this.form.type = type
    },
  }
}
</script>