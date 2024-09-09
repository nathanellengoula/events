<template>
  <DialogComponent
    :openModal="expand"
    @closeModal="$emit('closeAlert', expand)"
    headerBackground="transparent"
    headerDisplay="none"
    modalW="100%"
    modalH="auto"
    background="white"
    btnColor="red"
    class="modal"
    iconSize="12px"
  >
    <div class="contain">
      <div class="top">
        <span class="title">{{title}}</span>
        <p class="text"> {{message}}</p>
      </div>
      <div class="bottom">
        <ButtonComponent
          v-for="(btn, index) in buttons"
          :key="index"
          :bname="btn.name"
          :background="btn.background"
          dense
          Flat
          v-if="btn.show"
          fSize="12px"
          W="4em"
          H="2.2em"
          radius="0"
          @clicked="handleClick(index)"
        />
      </div>
    </div>
  </DialogComponent>
</template>

<script>
import DialogComponent from 'src/components/utils/DialogComponent.vue'
import ButtonComponent from 'src/components/utils/ButtonComponent.vue'

export default {
  name: 'AlertComponent',
  props: {
    expand: {type: Boolean},
    title: {type: String, default: "Title"},
    message: {default: "This is the text message to display to th user"},
    buttons: { type: Array || Object }
  },
  components: {
    DialogComponent,
    ButtonComponent
  },
  data () {
    return {
    }
  },
  methods: {
    handleClick(index){
      if(index === 0) this.$emit('closeAlert', this.expand)
      else this.$emit("delete")
    }
  }
}
</script>

<style lang="scss" scoped>
  .contain{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 0;

    .top{
      display: flex;
      flex-direction: column;
      gap: 10px;

      .title{
        font-size: 18px;
        font-weight: 600;
      }
      .text{
        font-size: 15px;
        font-weight: 400;
      }
    }
    .bottom{
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }
</style>
