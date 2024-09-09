<template>
  <div class="main">
    <ModalComponent
      :openModal="true"
      modalW="10rem"
      modalH="9rem"
      headerDisplay="none"
      background="white"
      persistent
      btnBackground="white"
      class="modal"
      bodyH="100%"
    >

      <div class="content">
        <q-icon name="ion-refresh-circle" color="primary" size="50px" />
        <span>Please wait...</span>
      </div>

    </ModalComponent>
  </div>
</template>

<script>
import ModalComponent from './ModalComponent.vue'

export default {
  name: 'LoadingComponent',
  components: { ModalComponent },
  props: {
    icon: { type: String, default: "fas fa-loading" }
  },
  data () {
    return {
      show: false,
      style: {
        "display": "flex",
        "justify-content": "center",
        "align-items": "center"
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .modal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @keyframes rotate{
      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }
    }

    .q-icon{
      animation: rotate 1s linear infinite;
    }

    span{
      text-align: center;
      margin-top: 15px;
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>
