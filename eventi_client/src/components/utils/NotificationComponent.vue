<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'NotificationComponent',
  props:{
    message:{type: String, default: "Notification message"},
    type: {type: String, default: "positive"},
    color:{type: String, default: "orange"},
    position:{type: String, default: "bottom"},
    progress:{type: Boolean},
    timeout:{type: Number},
  },
  data () {
    return {}
  },
  created(){
    this.$q.notify({
      type: this.type,
      color: this.color,
      message: this.message,
      position: this.position,
      progress: this.progress,
      timeout: this.timeout
    })
  }
}
</script>
