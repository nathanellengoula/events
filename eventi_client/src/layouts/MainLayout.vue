<template>
    <q-layout view="lHh Lpr lFf">
        <q-pull-to-refresh @refresh="callRefresh" color="primary" icon="fas fa-circle-notch">
            <Header />
            <SearchComponent />

            <q-page-container>
                <router-view />
                <LoadingComponent v-if="load" />
            </q-page-container>
        </q-pull-to-refresh>
    </q-layout>
</template>

<script>
import { mapGetters } from "vuex"
import Header from "src/components/Header.vue"
import LoadingComponent from "../components/utils/LoadingComponent.vue"
import SearchComponent from "../components/SearchComponent.vue"

import {
    redirect,
    toLoginIfAuthRequired,
    checkUserLocal,
    getEvents,
    getUserEvents,
} from "../mixins/index"

export default {
  name: 'MainLayout',
  components: { Header, LoadingComponent, SearchComponent },
  mixins: [
    redirect,
    toLoginIfAuthRequired,
    checkUserLocal,
    getUserEvents,
    getEvents,
  ],
  computed: {
    ...mapGetters(["load"])
  },
  watch: {
    notify(newVal, oldVal) {
      if (newVal) {
        this.getEvents()
      }
    }
  },
  methods: {
    refresh(methodsArray) {
      setTimeout(() => {
          methodsArray.forEach(method => method.call(this))
      }, 500)
    },
    callRefresh(done) {
      this.refresh([this.getEvents, this.getUserEvents])
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.q-layout {
    height: auto !important;
    .q-page-container {
        height: auto !important;
        background: var(--q-gray-background);
    }
}
</style>


