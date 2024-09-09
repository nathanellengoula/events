<template>
  <q-page>
    <Events />
  </q-page>
</template>

<script>
import Events from "../components/Events.vue"

export default {
  name: 'PageIndex',
  components: { Events },
  mounted(){
    this.$store.dispatch("setToEdit", {})
  }
}
</script>

<style lang="scss" scoped>
  .q-page{
    height: auto;
    width: 100%;
    min-height: 0 !important;
  }
</style>
