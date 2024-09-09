<template>
  <div class="form-review flex q-pa-xl q-mt-lg justify-between">
    <div class="form flex column flex-1 q-pa-md bg-grey-2 rounded-borders q-gutter-y-md">
      <span>Fill the form</span>
      <q-input
        type="text"
        v-model="message"
        standout="bg-teal-5 text-white"
        dense
        label="Description"
      />
      <q-uploader
        style="max-width: 300px"
        @added="takeImage"
        hide-upload-btn
        multiple
      />
      <q-btn
        label="Send"
        class="bg-primary text-white q-mb-md"
        @click.stop="submitForm"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostForm',
  data(){
    return{
      message: "",
      image: "",
      formData: {}
    }
  },
  methods: {
    takeImage(file){
      this.convertFile(file[0])
    },
    convertFile(file){
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.image = reader.result
      }
    },
    submitForm(){
      this.formData = {message: this.message, image: this.image}
      axios.post("http://localhost:3000/post", this.formData, {'Content-Type': 'multipart/form-data'})
        .then(res => {
          console.log(res.data)
        })
    }
  }
}
</script>
