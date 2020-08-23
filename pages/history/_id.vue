<template>
  <div class="h-full w-full px-4 md:px-6 pt-3 pb-8 text-teal-400">
    <div @click="toggleEdit" class="mb-3 w-full flex justify-end cursor-pointer">
      <svg class="text-yellow-300 opacity-75" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>pen-tool</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><line fill="none" stroke-miterlimit="10" x1="5" y1="59" x2="22.464" y2="41.536"></line> <ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -19.2548 29.5147)" fill="none" stroke-miterlimit="10" cx="26" cy="38" rx="5" ry="5"></ellipse> <polyline fill="none" stroke="currentColor" stroke-miterlimit="10" points="32,14 12,22 5,59 42,52 50,32 "></polyline> <rect x="39.757" y="0.201" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.2548 36.9706)" fill="none" stroke="currentColor" stroke-miterlimit="10" width="8.485" height="39.598"></rect></g></svg>
      <span class="ml-2 text-sm text-yellow-300 font-medium hover:underline">Edit</span>
    </div>
    <div v-if="kid" class="mt-3 flex flex-col items-center justify-center">
      <nuxt-link :to="kidPage">
        <img 
          v-if="kid.avatar"
          :style="{ backgroundColor: kid.color }"
          class="p-2 mx-3 h-16 w-16 shadow-lg rounded-full border-2 border-gray-200"     
          :src="kid.avatar" />
      </nuxt-link>
      <p class="mt-2 text-center text-white font-medium text-lg">{{ kid.name }}'s Credit History</p>
    </div>

    <div class="h-full overflow-scroll">
      <div v-for="(m,i) in movements" :key="i">
        <p class="mt-5 text-center text-yellow-300 font-bold text-lg">{{ m.day }}</p>
        <div v-for="(item,j) in m.items" :key="j" class="mt-2 mb-3 px-5 py-2 border border-gray-100 bg-indigo-600 hover:bg-indigo-800 rounded-lg flex items-center justify-between">
          <div>
            <p class="text-xs text-teal-200 italic">{{ item.createdAt }}</p>
            <p class="font-bold">{{ item.description }}</p>
          </div>
          <div class="flex items-center">
            <span class="text-3xl font-bold">{{ item.credit }}</span>
            <svg @click="promptDelete(item)" v-if="canEdit" height="24" width="24" class="ml-3 cursor-pointer text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>trash</title><g stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><polyline points="22 12 22 3 42 3 42 12" fill="none" stroke="currentColor" stroke-miterlimit="10"></polyline><path d="M53,26V56a5,5,0,0,1-5,5H16a5,5,0,0,1-5-5V26" fill="none" stroke="currentColor" stroke-miterlimit="10"></path><line x1="32" y1="31" x2="32" y2="49" fill="none" stroke-miterlimit="10"></line><line x1="22" y1="31" x2="22" y2="49" fill="none" stroke-miterlimit="10"></line><line x1="42" y1="31" x2="42" y2="49" fill="none" stroke-miterlimit="10"></line><rect x="4" y="12" width="56" height="8" fill="none" stroke="currentColor" stroke-miterlimit="10"></rect></g></svg>
          </div>
        </div>
      </div>
    </div>

    <modal
      :showing="showDeleteModal"
      @close="promptDeleteDone"
      :showClose="true"
    >
      <div class="p-5">
        <p class="mb-3 text-red-700 text-lg font-bold">Delete Credit?</p> 
        <p class="text-red-500">This action cannot be undone!</p>
        <div class="mt-16 flex items-center justify-center">
          <button @click.prevent="updateCredit" class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline-red text-center" type="button">
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

export default {
  components: {
    Modal
  }, 
  created() {
    this.kidId = this.$route.params.id

    this.movementRef = this.$fireDb.ref(`movements/${this.kidId}`)

    this.movementRef.orderByKey().on('value', (snapshot) => {
      if (! snapshot.val()) {
        this.movements = []

        return 
      } 
      
      let movements = []

      for (const [day,records] of Object.entries(snapshot.val())) {
        let values = []
        movements.unshift({
          day: this.formatDay(day), 
          items: Object.values(records).map(value => {
            value.createdAt = (new Date(value.created_at)).toLocaleTimeString()
            return value
          }).reverse()
        })
      }          

      this.movements = [... movements]
    })

    this.$fireDb
        .ref(`kids/${this.kidId}`)
        .once('value', (snapshot) => {
          this.kid = snapshot.val()

          this.kid.avatar = require(`~/assets/img/tolos/${this.kid.creature.filename}`) 
        })

  },
  destroyed() {
    if (this.movementRef) {
      this.movementRef.off()
    }
  },
  data: () => ({
    movements: [],
    kid: null,
    canEdit: false, 
    showDeleteModal: false, 
    selectedCredit: null, 
    movementRef: null
  }),
  computed: {
    kidPage() {
      return `/kids/${this.kidId}`
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },

    formatDay(dateString) {
      let year = dateString.substring(0,4)
      let month = dateString.substring(4,6)
      let day = dateString.substring(6,8)

      return (new Date(year, month-1, day)).toLocaleDateString()
    },

    toggleEdit() {
      this.canEdit = ! this.canEdit
    },

    promptDelete(item) {
      this.showDeleteModal = true 
      this.selectedCredit = item 
    },

    updateCredit() {
      if (! this.selectedCredit) return 

      this.kid.currCredit -= this.selectedCredit.credit

      let day = formatDate(new Date(this.selectedCredit.created_at))

      let updates = {}
      
      updates['kids/'+this.kid.id] = { ...this.kid }
      updates[`movements/${this.kidId}/${day}/${this.selectedCredit.created_at}`] = null

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

    deleteCredit() {
      if (! this.selectedCredit) return 

      let day = formatDate(new Date(this.selectedCredit.created_at))

      let path = `movements/${this.kidId}/${day}/${this.selectedCredit.created_at}`

      this.$fireDb
        .ref(path)
        .remove()

      this.showDeleteModal = false
    },

    promptDeleteDone() {
      this.selectedCredit = null

      this.showDeleteModal = false
    }
  }
}
</script>