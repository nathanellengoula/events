<template>
  <Modal
    Flat
    dense
    noFocus
    seamless
    fullWidth
    focusOutside
    modalH="auto"
    radius="10px 10px 0 0"
    modalW="5rem"
    headerH="2rem"
    btnSize="12px"
    position="bottom"
    background="white"
    :openModal="isOpen"
    transShow="slide-up"
    :title="filteredItems.length ? '' : 'No results...'"
    titleSize="15px"
    titleWeight="200 !important"
    titleColor="grey"
    headerBackground="white"
    btnColor="var(--q-primary)"
    btnIcon="fas fa-chevron-down"
    @closeModal="$store.dispatch('setIsOpen', false)"
  >
    <q-list separator dense>
      <q-item
        v-for="(event, index) in filteredItems"
        :key="index"
        clickable
        v-ripple
        class="event-item q-py-lg"
        @click.stop="handleSearchClick(event._id)"
      >
        <div class="contain-img q-mr-md">
          <q-img
            :src="event.flyer"
            height="3rem"
            width="3rem"
            class="rounded-borders"
          />
        </div>
          <q-item-section>
            <span class="text-primary" style="font-size: 1rem; font-weight: 500;">
                {{ event.name }}
            </span>
          </q-item-section>
      </q-item>
    </q-list>
  </Modal>
</template>

<script>
import { mapGetters } from "vuex"
import { redirect } from "../mixins/index"
import Modal from "../components/utils/ModalComponent.vue"

export default {
  name: 'SearchComponent',
  components: { Modal },
  mixins: [ redirect ],
  data () {
    return {}
  },
  computed: {
    ...mapGetters(["filteredItems", "isOpen"])
  },
  watch: {
    // filteredItems(){
    //   if(this.filteredItems.length) this.$store.dispatch("setIsOpen", true)
    //   else this.$store.dispatch("setIsOpen", false)
    // }
  },
  methods: {
    handleSearchClick(eventId){
      this.redirect('event', { id: eventId })
      if(this.isOpen) this.$store.dispatch("setIsOpen", false)
    },
  }
}
</script>
