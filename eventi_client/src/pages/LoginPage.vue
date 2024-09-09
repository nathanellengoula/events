<template>
  <q-page class="page">
    <div class="contain-logo">
      <img src="assets/logo.svg" alt="" />
    </div>
    <div class="context">
      <div class="login-text">
        <span class="first">Hey,</span>
        <span class="second">Login Now !</span>
      </div>
      <div class="form-choice">
        <span :class="{'active-choice': showLogin}" @click.stop="handleShowLogin" >i have an account</span>
        <span>/</span>
        <span :class="{'active-choice': showRegister}" @click.stop="handleShowRegister">create new</span>
      </div>
      <div class="contain-form">
        <transition name="fade" :delay="1000">
            <LoginForm :process="process" v-if="showLogin" v-show="showLogin" @onEnter="login" />
            <RegistrationForm :process="process" v-if="showRegister" v-show="showRegister" @onEnter="register" />
        </transition>
      </div>
    </div>
    <div class="btn-skip">
      <ButtonComponent
        w="100%"
        H="3rem"
        class="btn"
        background="white"
        nameColor="var(--q-primary)"
        :bname="btnName"
        fSize="16px"
        @clicked="handleClick(btnName)"
      />
      <span class="skip" @click="skip">Skip Now</span>
    </div>
  </q-page>
</template>

<script>
import LoginForm from "../components/LoginForm.vue"
import RegistrationForm from "../components/RegistrationForm.vue"
import ButtonComponent from "../components/utils/ButtonComponent.vue"
import { checkUserLocal, redirect } from "../mixins/index.js"

export default {
  name: 'LoginPage',
  mixins: [ redirect, checkUserLocal ],
  components: {
    LoginForm,
    RegistrationForm,
    ButtonComponent
  },
  data(){
    return {
      show: false,
      swap: false,
      showLogin: false,
      showRegister: false,
      btnName: "",
      process:false
    }
  },
  mounted() {
    this.handleShowLogin()
  },
  methods: {
    skip(){
      console.log("Skip !")
    },
    handleShowLogin(){
      this.showLogin = true
      this.showRegister = false
      this.btnName = "Login"
    },
    handleShowRegister(){
      this.showLogin = false
      this.showRegister = true
      this.btnName = "Register"
    },
    handleClick(name){
      if(name === "Login"){
        this.login()
      }
      else{
        this.register()
      }
    },
    login(){
      this.process = true
      setTimeout(() => {this.process = false}, 500)
      this.$store.dispatch("submitted", true)
    },
    register(){
      this.process = true
      setTimeout(() => {this.process = false}, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease-in-out;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
<style lang="scss" scoped>
  .active-choice{
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .page{
    width: 100%;
    height: auto;
    position: relative;
    padding-top: 3rem;
    display: flex;
    flex-direction: column;

    .contain-logo{
      display: flex;
      justify-content: center;

      img{
        width: 1.5rem;
      }
    }

    .context{
      height: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 3rem;

      .login-text{
        display: flex;
        flex-direction: column;
        .first, .second{
          font-size: 40px;
          font-weight: bold;
        }
        .second{
          margin-top: -10px;
        }
      }

      .form-choice{
        display: flex;
        align-items: center;
        margin-top: 2.5rem;

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

      .contain-form{
        height: inherit;
        margin-top: 3rem;
      }

    }

    .btn-skip{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 7rem;
      position: relative;

      bottom: 1rem;

      .btn{
        margin-bottom: .6rem;
      }

      .skip{
        display: flex;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
</style>
