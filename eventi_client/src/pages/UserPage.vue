<template>
  <q-page style="background: var(--q-gray-background)">
    <div class="container">
      <div class="header">
        <div class="user-profile">
          <div class="contain-img shadow-2 cursor-pointer" @click.stop="showImg = true">
            <img :src="user?.pic ? user.pic : 'userProfile.png'" alt="">
          </div>
        </div>
            <ModalComponent
              :fullWidth="$q.screen.lt.sm"
              :openModal="showImg"
              modalH="50rem"
              headerBackground="transparent"
              headerPad="0"
              btnMargin="4px"
              background="white"
              btnRound
              headerH="2rem"
              Flat
              transShow="scale"
              dense
              margin="20px 0 0 0 !important"
              btnBackground="white"
              btnSize="12px"
              btnIcon="fas fa-times-circle"
              btnColor="red"
              persistent
              @closeModal="closeImg(showImg)"
            >
              <div style="width: 100%; height: 40rem;">
                <img :src="user.pic" alt="image" style="width: 100%;height: 100%; object-fit: contain">
              </div>
            </ModalComponent>
        <div class="user-details">
          <span class="username"> {{ user.username }} </span>
          <span class="email"> {{ user.email }} </span>
          <span class="created"> Since: {{ createdMoment }} </span>
        </div>
        <div class="update-btn" style="margin-left: 5px" v-if="$route.params.id === currentUser._id">
          <Button
            isIcon
            iconName="fas fa-user-edit"
            iconSize="20px"
            iconColor="white"
            round
            bname=""
            background="transpaernt"
            @clicked="show = true"
            btnPad="0"
            H="40px"
            W="40px"
          />
        </div>
      </div>
      <div class="body">
        <div class="events">
          <SingleEvent v-for="(event, index) in userEvents" :event="event" :key="index" class="event" />
        </div>
      </div>
    </div>
    <ModalComponent
      :fullWidth="$q.screen.lt.sm"
      :openModal="show"
      modalW="40em"
      modalH="auto"
      headerBackground="transparent"
      headerPad="0"
      btnMargin="4px"
      background="white"
      btnRound
      headerH="2rem"
      Flat
      persistent
      transShow="slide-up"
      dense
      margin="20px 0 0 0 !important"
      btnBackground="white"
      btnSize="12px"
      btnIcon="fas fa-times-circle"
      btnColor="red"
      @closeModal="close(show)"
    >
      <div class="contain-details">
        <div class="top">
          <div class="profile-img shadow-2">
            <img v-if="!file.length" :src="user?.pic ? user.pic : 'userProfile.png'" alt="User profile">
            <img v-else :src="file" alt="Profile preview">
            <div class="wrap-icon shadow-3 bg-white cursor-pointer" @click.stop="$refs.uploader.pickFiles()">
              <q-icon name="fas fa-camera" color="primary" size="20px" />
            </div>
          </div>
          <q-uploader
            style="max-width: 300px"
            hide-upload-btn
            class="q-mt-lg"
            v-show="showFile"
            ref="uploader"
            @added="added"
          />
        </div>
        <div class="inputs">
          <Input
            radius="5px"
            label="Email"
            labelColor=""
            standout="bg-primary text-white"
            bgColor=""
            type="email"
            color=""
            class="input"
            :propModel="user.email"
            alignment="flex-end"
            @updated="email"
          />
          <Input
            radius="5px"
            label="Username"
            labelColor=""
            standout="bg-primary text-white"
            bgColor=""
            type="text"
            color=""
            class="input"
            :propModel="user.username"
            alignment="flex-end"
            @updated="username"
          />
          <Input
            radius="5px"
            label="Phone number"
            labelColor=""
            standout="bg-primary text-white"
            bgColor=""
            type="text"
            color=""
            class="input"
            :propModel="user.phone"
            :maxlength="9"
            alignment="flex-end"
            @updated="phone"
          />
        </div>
        <div class="buttons">
          <Button
            background="var(--q-text-black2)"
            bname="Cancel"
            fSize="15px"
            class="cancel-btn"
            btnPad="3px 10px"
            dense
            @clicked="close(show)"
          />
          <Button
            background="var(--q-link-bg)"
            bname="Save changes"
            fSize="15px"
            class="update-btn"
            style="margin-left: 10px"
            btnPad="3px 10px"
            @clicked="updateProfile"
            dense
            :disable="disable"
          />
        </div>
      </div>
    </ModalComponent>
    <NotificationComponent
      v-if="success"
      :message="notifOptions.message"
      type="positive"
      :color="notifOptions.color"
      :position="notifOptions.position"
      progress
      :timeout="delay"
    />
  </q-page>
</template>

<script>
import { mapGetters } from "vuex"
import Input from "../components/utils/InputComponent.vue"
import Button from "../components/utils/ButtonComponent.vue"
import NotificationComponent from '../components/utils/NotificationComponent.vue'
import axios from "axios"
import moment from "moment"
import { getUserEvents, redirect, getUser } from '../mixins'
import SingleEvent from "../components/SingleEvent.vue"
import ModalComponent from '../components/utils/ModalComponent.vue'
import {clearLocal, setInLocal} from "src/models/utils/localStorage"


export default {
  name: 'UserPage',
  components: {Input, Button, NotificationComponent, SingleEvent, ModalComponent},
  mixins: [ redirect, getUserEvents, getUser],
  data(){
    return {
      notifOptions: {
        message: "",
        color: "",
        position: ""
      },
      toolbarTabs: "my-events",
      disable: true,
      success: false,
      notifMessage : "",
      isEmpty: false,
      delay: 3000,
      createdMoment: "",
      user: {},
      eventsToShow: [],
      show: false,
      showImg: false,
      showFile: false,
      file: "",
      newUser: {
        email: "",
        username: "",
        phone: "",
        password: "",
        pic: ""
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser", "userEvents", "events", "userUpdated"])
  },
  async created(){
    this.getUserEvents()
  },
  mounted(){
    const date = moment(this.user.createdAt)
    this.createdMoment = date.format("DD/MM/YYYY")
  },
  watch: {
    async userUpdated(val){
      let updatedEvent = {}

      if(val){
        for(const event of this.events){
          if(this.currentUser?._id === event.author.id){
            updatedEvent = {
              ...event,
              author: {
              id: this.currentUser._id,
              name: this.currentUser.username,
              email: this.currentUser.email,
              pic: this.currentUser.pic
            }}
          }

          this.$store.dispatch("setLoading", true)
          await axios.put("https://positiondb.onrender.com/api/events/" + updatedEvent?._id, updatedEvent)
          .then(res => {
            if(res.status === 200){
              this.$store.dispatch("setLoading", false)
              this.$store.dispatch("updateEvent", res.data)
            }
          })

          await axios.get("https://positiondb.onrender.com/api/events")
          .then(res => {
            if(res.status === 200){
              this.$store.dispatch("getEvents", res.data)
            }
          })
        }

        this.$store.dispatch("setUserUpdated", false)
        this.getUserEvents()
      }
    }
  },
  methods: {
    added(file){
      if(file) this.disable = false
      else this.disable = true
      this.convertFile(file[0])
    },
    email(email){
      email.length ? this.disable = false : true
      this.newUser.email = email
    },
    username(username){
      username.length ? this.disable = false : true
      this.newUser.username = username
    },
    phone(phone){
      phone.length ? this.disable = false : true
      this.newUser.phone = phone
    },

    async updateProfile(){
      const headers = {'token': `Bearer ${this.currentUser.accessToken}`}
      const propsToCheck = ["username", "email", "phone", "pic"]

      for(const prop of propsToCheck){
        if(!this.newUser[prop]?.length){
          this.newUser[prop] = this.user[prop]
        }
        else{
          if(this.newUser[prop] !== this.user[prop]){
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let checkEmail = emailRegex.test(this.newUser.email)

            if(!checkEmail){
              console.log("Invalid email !")
            }
            else{
              if(this.file !== "") this.newUser = {...this.newUser, pic: this.file}
              else this.newUser = {...this.newUser, pic: this.user.pic}

              this.$store.dispatch("setLoading", true)
              await axios.put("https://positiondb.onrender.com/api/user/" + this.currentUser._id, this.newUser)
              .then(res => {
                if(res.status === 200){
                  this.success = true
                  this.notifOptions = {
                    message: "Profil updated successfuly!",
                    position: "center",
                    color: "positive",
                  },

                  this.$store.dispatch("setCurrentUser", res.data),
                  this.$store.dispatch("setUserUpdated", true)
                  this.getUser()

                  this.$store.dispatch("setLoading", false)
                  this.$store.dispatch("setNotify", true)
                  setInLocal("currentUser", res.data)
                  this.close(this.show)
                }
              })
            }
          }
        }
      }
    },
    convertFile(file){
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.file = reader.result
      }
    },
    close(value){
      if(value === this.show) this.show = false
      this.file = ""
    },
    closeImg(value){
      if(value === this.showImg) this.showImg = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
     .header{
        width: 100%;
        height: 11rem;
        background: #07A57E;
        display: flex;
        align-items: center;
        padding: 0 20px;
        .user-profile{
          width: 100%;
          height: 9rem;
          display: flex;
          align-items: center;
          flex: 1;
          .contain-img{
            width: 7rem;
            height: 7rem;
            border-radius: 50%;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            }
          }
        }
        .user-details{
          width: 100%;
          height: inherit;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 2;
          .username{
            text-transform: capitalize;
            font-size: 25px;
            font-weight: 500;
            margin-top: -5px;
            color: white;
          }
          .email{
            font-size: 15px;
            font-weight: 300;
            color: white;
          }
          .created{
            margin-top: 20px;
            font-size: 12px;
            font-weight: 500;
            text-transform: italic;
            display: flex;
            justify-self: end;
            color: white;
          }
        }
     }
    .body{
      height: auto;
      width: 100%;
      margin-top: 0;
      .events{
        height: auto !important;
        width: 100%;
        display: flex;
        flex-direction: column;
        .event{
          margin-bottom: 1rem;
        }
      }
    }
  }
  .contain-details{
    width:100%;
    height: auto;
    .top{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
      flex-direction: column;
      .profile-img{
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .wrap-icon{
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 8px;
        border-radius: 50%;
      }
    }
    .inputs{
      .pass-area{
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;

        .span-icon{
          width: 100%;
          height: auto;
          background: var(--q-share-link);
          cursor: pointer;
          padding: 6px;
          border-radius: 5px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;


          span{
            color: white;
            font-weight: 500;
            font-size: 15px;
            margin-right: 10px;
          }
        }
      }
    }
    .buttons{
      margin-top: 1rem;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
