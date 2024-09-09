<template>
  <q-btn
    v-if="show"
    class="main-btn"
    :elevated="elevated"
    :type="type"
    @click.stop.prevent="$emit('clicked')"
    :rounded="rounded"
    :round="round"
    :unelevated="unelevated"
    :dense="dense"
    :disable="disable"
    :flat="Flat"
    :style="[
      styleBtn,
      {
        borderRadius: radius,
        background: background,
        color: iconColor,
        height: H,
        width: W,
        padding: btnPad,
        flexDirection: iconPosition,
        boxShadow: shadow,
        borderColor: borderColor,
        border: border,
      },
    ]"
  >
    <q-icon
      v-if="isIcon"
      round
      class="icon"
      :style="{fontSize: iconSize, margin: iconMargin}"
      :name="iconName"
    />
    <span class="name" :style="{color: nameColor, fontSize: fSize, fontWeight: fWeight}" >{{ bname }}</span>
  </q-btn>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props:{
    background: {type: String, default: "black"},
    iconColor: {type: String, default:"white"},
    bname: {type: String},
    shadow: {type: String},
    nameColor: { type: String },
    H: {type: String, default: "auto"},
    W: {type: String, deafult: "auto"},
    type:{type:String},
    iconPosition:{type:String},
    styleBtn: {type: Object},
    borderColor: {type: String},
    border: {type: String},
    iconName: {type: String},
    iconSize: {type: String},
    radius: {type: String},
    noBtnName: {type: String, default: ""},
    rounded: {type: Boolean},
    disable: {type: Boolean},
    dense: {type: Boolean},
    round: {type: Boolean},
    unelevated: {type: Boolean},
    elevated: {type: Boolean},
    dense: {type: Boolean},
    btnPad: {type: String, default: "0"},
    fSize: {type: String},
    fWeight: {type: String},
    Flat: {type: Boolean},
    isIcon: {type: Boolean},
    iconMargin: {type: String},
    show: {type: Boolean, default: true},
  },
  data () {
    return {
      expand: false
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .main-btn{
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: auto !important;

    .name{
      text-transform: capitalize;
    }
  }

    @media (max-width: "820px"){

  }
</style>
