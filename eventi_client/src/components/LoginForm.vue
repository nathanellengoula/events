<template>
  <div>
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
        label="Password"
        labelColor="#818181"
        standout="bg-white text-primary"
        bgColor="white"
        type="password"
        color="primary"
        @updated="password"
        @onEnter="$emit('onEnter')"
      />
      <div class="forgot-reset">
        <span :class="{'active-choice': showForgot}" @click.stop="handleShowForgot" >Forgot password ?</span>
        <span>/</span>
        <span :class="{'active-choice': showReset}" @click.stop="handleShowReset">Reset</span>
      </div>
    </div>

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
import InputComponent from './utils/InputComponent.vue'
import { redirect, closeAlert } from "src/mixins"
import {mapGetters} from "vuex"
import NotificationComponent from "../components/utils/NotificationComponent.vue"
import AlertComponent from '../components/utils/AlertComponent.vue'
import { login } from 'src/models/users'

export default {
  name: 'LoginForm',
  components: {
    InputComponent,
    NotificationComponent,
    AlertComponent
  },
   props: {
    process: {type: Boolean}
  },
  mixins: [redirect, closeAlert],
  data () {
    return {
      proc: this.process,
      openAlert: false,
      alertOptions: {
        title: "",
        message: ""
      },
      success: false,
      btns:[
        {
          name: "Ok",
          background: "var(--q-primary)",
          show: true
        }
      ],
      data:{
        email: "",
        password: ""
      },
      inputStyle: {
        color: "black",
        fontSize:"16px"
      },
      showForgot: false,
      showReset: false,
      delay: 2000
    }
  },
  computed: {
    ...mapGetters([""])
  },
  watch:{
    process(val){
      if(val){
        this.login()
        this.proc = false
      }
    }
  },
  mounted(){
    this.showForgot = true
    this.showReset = false
  },
  methods: {
    handleShowForgot(){
      this.showForgot = true
      this.showReset = false
      this.showForm = true
    },
    handleShowReset(){
      this.showForgot = false
      this.showReset = true
    },
    email(email){this.data.email = email},
    password(password){this.data.password = password},
    async login(){
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let checkEmail = emailRegex.test(this.data.email);

      if(!this.data.email || !this.data.password){
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
          this.$store.dispatch("setLoading", true)
          const result = await login(this.data)
          if(result){
            this.$store.dispatch("setLoading", false)
            setTimeout(() => {this.redirect('home')}, this.delay)
            this.success = true
          }
          else{
            this.openAlert = true
            this.alertOptions = {
              title: "Wrong credentials",
              message: "User not found !"
            }
            this.$store.dispatch("setLoading", false)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .active-choice{
    font-size: 16px !important;
    font-weight: 400 !important;
  }

  .form{
    // background: red;

    .input{
      &:nth-child(1){
        margin-bottom: 10px;
      }
    }

    .forgot-reset{
      display: flex;
      align-items: center;
      margin-top: 40px;

      span{
        text-transform: capitalize;
        margin-right: 1rem;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;

        &:nth-child(2){
          cursor: default;
        }
      }
    }
  }

</style>
