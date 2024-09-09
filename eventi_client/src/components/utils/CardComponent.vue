<template>
  <div>
    <q-card
      :flat="Flat"
      dense
      class=""
      :style="{
        background: bg,
        width: W,
        height: H,
        minWidth: minW,
        boxShadow: shadow,
        borderRadius: radius
      }"
      @click.stop="$emit('click')"
    >
      <q-card-section :style="{ padding: pad }">
        <slot></slot>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  components: {  },
  props: {
    bg:{type: String, default: "white"},
    H:{type: String, default: "20vh"},
    minW:{type: String, default: "9em"},
    W:{type: String, default: "20em"},
    Flat:{type: Boolean},
    shadow:{type: String},
    radius:{type: String},
    pad:{type: String}
  },
  data () {
    return {
      msg: "Chris is the best !"
    }
  }
}
</script>
