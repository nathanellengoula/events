<template>
  <div class="main">
    <div class="header q-mb-lg">
      <span>Favourites</span>
    </div>
    <div class="body">
      <SingleEvent v-for="(event, index) in favourites" :event="event" :key="index" class="event q-mb-md" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import SingleEvent from "../components/SingleEvent.vue"

export default {
  name: 'Favourites',
  components: { SingleEvent },
  data(){
    return {
      favourites: []
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  created(){
    this.favourites = this.currentUser?.favourites
    console.log(this.favourites)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;

    .header{
      background: white !important;
      padding: 20px;

      span{
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 4px;
      }
    }
  }
</style>
