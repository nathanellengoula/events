<template>
  <div class="contain">
    <q-dialog v-model="openModal" persistent>
      <q-card class="modal-card" :style="{width: modalW, height: modalH, background: background}">
        <q-card-section
          class="card-header"
          :style="{height: headerH, width: headerW, background: headerBackground, display: headerDisplay}"
        >
          <span class="heading">{{ title }}</span>
          <q-btn
            class="close-btn"
            @click.stop="$emit('closeModal', close)"
            unelevated
            bg-transparent
            :color="btnColor"
            icon="fas fa-times"
            flat
            outlined="false"
            dense
            :size="iconSize"
          />
        </q-card-section>
        <q-card-section class="body">
          <slot></slot>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalComponent',
  props:{
    openModal: {type: Boolean},
    modalW: {type: String, default: "100%"},
    modalH: {type: String, default: "auto"},
    iconSize: {type: String},
    btnColor: { type: String, default: "black" },
    title: {type: String},
    background: {type: String, default: "#4AACBF"},
    headerH: {type: String, default: "0vh"},
    headerW: {type: String, default: "100%"},
    headerDisplay: {type: String, default: "block"},
    headerBackground: {type: String, default: "#0074b786"},
  },
  data () {
    return {
      close: true,
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .modal-card{
    .card-header{
      border-radius: 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 15px 1px;

      .heading{
        font-size: 18px;
        font-weight: 500;
        color: white;
      }

      .close-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        color: white;
        z-index: 99999;
      }
    }
  }
</style>
