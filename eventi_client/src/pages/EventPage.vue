<template>
  <q-page>
    <SingleEvent :event="searchedEvent" class="event" />
  </q-page>
</template>

<script>
import SingleEvent from "../components/SingleEvent.vue"
import axios from "axios"
import { mapGetters } from "vuex"

export default {
  name: 'EventPage',
  components: { SingleEvent },
  beforeMount(){
    this.$store.dispatch("setSearchedEvent", this.$route.params.id)
  },
  computed: {
    ...mapGetters(["searchedEvent"])
  },
}
</script>

<style lang="scss" scoped>
.event{

}
</style>
