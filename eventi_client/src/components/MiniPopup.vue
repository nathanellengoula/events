<template>
  <CardComponent
    bg="white"
    H="auto"
    W="6rem"
    shadow="0px 0px 20px solid #1F1F1F20"
    pad="0"
    radius=""
  >
    <div class="header">
      <q-icon name="fas fa-times" color="red" size="15px" class="cursor-pointer" @click.stop="$emit('closePopup')" />
    </div>
    <div class="body">
      <q-list separator>
          <q-item
            v-for="(option, index) in options"
            :key="index"
            dense
            clickable
            v-ripple
            style="width: 100%"
            v-if="option.isUser"
            @click.stop="$emit('optionEvent', option.event)"
          >
            <span class="option-name">{{ option.name }}</span>
            <q-icon :name="option.icon" :color="option.color" size="16px" class="cursor-pointer" />
          </q-item>
      </q-list>
    </div>
  </CardComponent>
</template>

<script>
import CardComponent from './utils/CardComponent.vue'

export default {
  name: 'MiniPopup',
  components: { CardComponent },
  props: {
    options: { type: Array },
    open: { type: Boolean }
  },
  data () {
    return {

    }
  },
  watch: {
    open(newVal, oldVal){
      if(newVal){
        let elements = document.querySelectorAll(".body .q-list .q-item")
        let toRemove = document.querySelectorAll(".body .q-list .q-item .q-focus-helper")

        if(elements){
          elements.forEach(element => {
            toRemove.forEach(rem => {
              if(element.contains(rem)) element.removeChild(rem)
            })
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 5px;
    height: 1.5rem;

    .q-icon{
      margin-right: 4px;
      margin-top: 4px;
    }
  }

  .body{
    z-index: 1 !important;
    .q-list{
      z-index: 1 !important;
      .q-item{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
        line-height: 0;
      }
    }
  }
</style>
