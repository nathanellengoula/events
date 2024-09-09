<template>
  <div class="posts">
    <SingleEvent v-for="(event, index) in events" :event="event" :key="index" class="post" />
  </div>
</template>

<script>
import SingleEvent from "./SingleEvent.vue"
import { mapGetters } from "vuex"
import { redirect, getEvents} from "../mixins/index.js"
import axios from 'axios'

export default {
  name: 'AllPosts',
  props: {
  },
  mixins: [ redirect, getEvents ],
  components: { SingleEvent },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(["events", "notify"])
  },
  mounted(){
    if(this.notify){
      this.getEvents()
      this.$store.dispatch("setNotify", false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .posts{
    height: auto !important;
    width: 100%;
    display: flex;
    flex-direction: column;

    .post{
      margin-bottom: 15px;
    }
  }
</style>
