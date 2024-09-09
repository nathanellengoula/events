<template>
  <div>
    <slot>
      {{ component }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Wrap',
  props: {
    component: {}
  },
  data () {
    return {}
  }
}
</script>
