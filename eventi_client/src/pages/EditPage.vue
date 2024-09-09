<template>
  <q-page>
    <div class="contain-title">
      <span>Edit Event.</span>
    </div>
    <div class="contain-form">
      <EventForm :toEdit="eventToEdit" />
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import EventForm from "../components/EventForm.vue"

export default {
  name: 'EditPage',
  components: { EventForm },
  data(){
    return {
      
    }
  },

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

