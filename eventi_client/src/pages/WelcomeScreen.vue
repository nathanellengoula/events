<template>
  <q-page>
    <div class="head">
      <span>Position.</span>
    </div>
    <div class="img-section">
      <img src="assets/welcomeImg.svg" alt="" />
    </div>
    <span>Get started</span>
    <div class="contain-text">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </span>
    </div>
    <div class="buttons">
      <ButtonComponent
        v-for="(btn, index) in buttons"
        :key="index"
        :bname="btn.name"
        :border="btn.border"
        :background="btn.background"
        :nameColor="btn.textColor"
        W="7rem"
        fSize="15px"
        @clicked="handleButtonClick(btn.event)"
      />
    </div>
  </q-page>
</template>

<script>
import ButtonComponent from "../components/utils/ButtonComponent.vue"
import { redirect, toHomeIfLogged } from '../mixins'

export default {
  name: 'WelcomeScreen',
  components: { ButtonComponent },
  mixins: [ redirect, toHomeIfLogged ],
  data(){
    return {
      buttons: [
        {
          name: "Skip",
          border: "2px solid white",
          background: "transparent",
          textColor: "white",
          event: "skip"
        },
        {
          name: "Login",
          border: "",
          background: "white",
          textColor: "var(--q-primary)",
          event: "login"
        }
      ]
    }
  },
  mounted(){
    if(this.$q.platform !== "android" || this.$q.platform !== "ios") this.redirect("login")
  },
  methods: {
    handleButtonClick(event){
      switch(event){
        case "skip":
          break;
        case "login":
          this.redirect("login")
          break;
        default: return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-page{
    display: flex;
    flex-direction: column;
    gap: 0px;
    justify-content: space-between;
    height: auto !important;

    .head{
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 18px;
      color: white;
      font-weight: bold;
      margin-top: 3rem;
      span{
        margin: 0;
      }
    }

    .img-section{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0rem;

      img{
        width: 10rem;
      }
    }

    span{
      color: white;
      font-size: 18px;
      font-weight: 500;
      margin-top: -3rem;
    }

    .contain-text{
      margin-top: -2rem;

      span{
        font-size: 35px;
        text-align: justify;
        font-weight: 600;
      }
    }

    .buttons{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
</style>
