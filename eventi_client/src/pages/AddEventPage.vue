<template>
  <q-page>
    <div class="contain-title">
      <span v-if="!eventToEdit._id">New Event.</span>
      <span v-else>Edit.</span>
    </div>
    <div class="contain-form">
      <EventForm :toEdit="eventToEdit" />
    </div>
  </q-page>
</template>

<script>
import axios from "axios"
import EventForm from "../components/EventForm.vue"
import { redirect } from '../mixins'

export default {
  name: 'AddEventPage',
  components: { EventForm },
  mixins: [redirect],
  data(){
    return {
      eventToEdit: {},
      loaded: false
    }
  },
  created () {
    const eventId = this.$route.params.id
    if(eventId){
      this.getEvent(eventId)
    }
  },
  methods: {
    async getEvent(eventId){
      this.$store.dispatch("setLoading", true)
      await axios.get("https://positiondb.onrender.com/api/events/" + eventId)
        .then(res => {
          if(res.status === 200){
            if(res.data._id) {
              this.eventToEdit = res.data
              this.$store.dispatch("setLoading", false)
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-page{
    width: 100%;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    background: white;

    .contain-title{
      width: 100%;
      margin-top: .3rem;
      margin-bottom: 1.5rem;

      span{
        font-size: 1.2rem;
        font-weight: 500;
      }
    }

  }
</style>
