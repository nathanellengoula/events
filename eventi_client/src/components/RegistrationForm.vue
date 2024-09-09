<template>
  <div class="form">
    <InputComponent
      :inputStyle="inputStyle"
      radius="5px"
      label="Email"
      labelColor="#818181"
      standout="bg-white text-primary"
      bgColor="white"
      type="email"
      color="primary"
      class="input"
      @updated="email"
    />
    <InputComponent
      :inputStyle="inputStyle"
      radius="5px"
      label="Username"
      labelColor="#818181"
      standout="bg-white text-primary"
      bgColor="white"
      type="text"
      color="primary"
      class="input"
      @updated="username"
    />
    <InputComponent
      :inputStyle="inputStyle"
      radius="5px"
      label="Password"
      labelColor="#818181"
      standout="bg-white text-primary"
      bgColor="white"
      type="password"
      color="primary"
      class="input"
      @updated="password"
    />
    <InputComponent
      :inputStyle="inputStyle"
      radius="5px"
      label="Confirm Password"
      labelColor="#818181"
      standout="bg-white text-primary"
      bgColor="white"
      type="password"
      color="primary"
      @updated="repeatPass"
      @onEnter="$emit('onEnter')"
    />

    <AlertComponent
      :expand="openAlert"
      @closeAlert="closeAlert"
      :title="alertOptions.title"
      :message="alertOptions.message"
      :buttons="btns"
    />

    <NotificationComponent
      v-if="success"
      message="You are logged in!"
      type="positive"
      color="primary"
      position="bottom"
      progress
      :timeout="delay"
    />
  </div>
</template>

<script>
import InputComponent from "../components/utils/InputComponent.vue"
import axios from "axios"
import { redirect, closeAlert } from "src/mixins"
import {mapGetters} from "vuex"
import NotificationComponent from "../components/utils/NotificationComponent.vue"
import AlertComponent from '../components/utils/AlertComponent.vue'

export default {
  name: 'RegistrationForm',
  mixins: [redirect, closeAlert],
  props: {
    process: {type: Boolean}
  },
  components: {
    InputComponent,
    NotificationComponent,
    AlertComponent
  },
  data () {
    return {
      btns:[
        {
          name: "Ok",
          background: "var(--q-primary)",
          show: true
        }
      ],
      openAlert: false,
      success: false,
      delay: 2000,
      alertOptions: {
        title: "",
        message: ""
      },
      inputStyle: {
        color: "black",
        fontSize:"16px",
      },
      data: {
        email: "",
        username: "",
        password: "",
        pic: ""
      },
      repeat:"",
      errors: [],
      proc: this.process
    }
  },
  computed:{
    ...mapGetters(['submitted'])
  },
  watch:{
    process(val){
      if(val){
        this.register()
        this.proc = false
      }
    }
  },
  methods: {
    email(email){this.data.email = email},
    username(username){this.data.username = username},
    password(password){this.data.password = password},
    repeatPass(repeatPass){this.repeat = repeatPass},

    async register(){
      this.errors = []

      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let checkEmail = emailRegex.test(this.data.email);

      if(!this.data.email || !this.data.username || !this.data.password || !this.repeat){
        this.openAlert = true
        this.alertOptions = {
          title: "Complete all inputs",
          message: "You must complete all the input fields !"
        }
      }
      else{
        if(!checkEmail){
          this.openAlert = true
          this.alertOptions = {
            title: "Invalid Email",
            message: "Invalid email address !"
          }
        }
        else{
          if(this.data.password !== this.repeat){
            this.openAlert = true
            this.alertOptions = {
              title: "Matching error",
              message: "The passwords do not match !"
            }
          }
          else{
            try {
              this.$store.dispatch("setLoading", true)
              await axios.post("https://positiondb.onrender.com/api/auth/register", this.data)
              .then(res => {
                if(res.status === 201){
                  this.$store.dispatch("setNotify", true)
                  this.success = true
                  setTimeout(() => {this.redirect('welcome')}, this.delay)
                  this.$store.dispatch("setLoading", false)
                }
              })
            } catch (error) {
              this.openAlert = true
              this.alertOptions = {
                title: "Existing user",
                message: "A user already exists with this email address"
              }
              this.$store.dispatch("setLoading", false)
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .input{
    margin-bottom: 13px !important;

    &:last-child{
      margin-bottom: 0px;
    }
  }
</style>
