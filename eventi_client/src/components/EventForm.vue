<template>
  <div class="main">
    <div class="form">
      <div class="inputs">
        <Input
          :inputStyle="inputStyle"
          fSize="18px"
          fWeight="400"
          showIcon
          outlined
          Width="100%"
          placeholder="Event name"
          iconName="fas fa-at"
          iconColor="var(--q-primary)"
          iconSize="22px"
          class="input"
          @updated="name"
          :propModel="toEdit?.name"
        />
        <Input
          :inputStyle="inputStyle"
          fSize="18px"
          fWeight="400"
          showIcon
          outlined
          Width="100%"
          placeholder="Address"
          iconName="fas fa-map-marker-alt"
          iconColor="var(--q-primary)"
          iconSize="22px"
          class="input"
          @updated="address"
          :propModel="toEdit?.address"
        />
        <Input
          :inputStyle="inputStyle"
          fSize="18px"
          fWeight="400"
          showIcon
          outlined
          Width="100%"
          placeholder="Phone"
          iconName="fas fa-phone-alt"
          iconColor="var(--q-primary)"
          iconSize="22px"
          type="text"
          class="input"
          @updated="phone"
          :maxlength="9"
          :propModel="currentUser?.phone || toEdit?.phone || ''"
        />
      </div>
      <div class="contain-desc">
        <EditorComponent :description="event.description || toEdit?.description || ''" class="editor" @editorContent="editorContent" />
      </div>
      <div class="contain-picker">
        <DatePicker
          title="Event date"
          subtitle="Pick a date"
          class="date"
          @getDate="getDate"
          :dateModel="toEdit?.date"
        />
      </div>
      <div class="img-picker">
        <q-uploader
          class="picker"
          label="Pick your flyer"
          @added="takeImage"
          hide-upload-btn
          accept=".jpg, .png"
          v-model="toEdit.flyer"
        >
          <template v-if="toEdit._id && !event.flyer" v-slot:list>
            <div v-if="toEdit._id" style="width: 100%; height: 15rem">
              <img
                :src="toEdit?.flyer"
                style="height: 100%; width: 100%"
              >
            </div>
          </template>
      </q-uploader>
      </div>
      <div class="buttons">
        <Button
          :bname="btnCancel.name"
          fade-transitionlat
          fSize="15px"
          :background="btnCancel.background"
          :border="btnCancel.border"
          :nameColor="btnCancel.textColor"
          @clicked="redirect('home')"
        />
        <Button
          :bname="btnCreate.name"
          Flat
          fSize="15px"
          :background="btnCreate.background"
          border=""
          nameColor="white"
          @clicked="btnEvent(btnCreate.event, toEdit?._id ? toEdit : {})"
        />
      </div>
    </div>
    <NotificationComponent
      v-if="success"
      :message="notifOptions.message"
      type="positive"
      :color="notifOptions.color"
      :position="notifOptions.position"
      progress
      :timeout="delay"
    />
    <AlertComponent
      :expand="openAlert"
      @closeAlert="closeAlert"
      :title="alertOptions.title"
      :message="alertOptions.message"
      :buttons="btns"
    />
  </div>
</template>

<script>
import Input from "../components/utils/InputComponent.vue"
import Button from "../components/utils/ButtonComponent.vue"
import EditorComponent from "./utils/EditorComponent.vue"
import axios from "axios"
import DatePicker from './utils/DatePickerComponent.vue'
import {mapGetters} from "vuex"
import { redirect, closeAlert } from "src/mixins"
import NotificationComponent from "../components/utils/NotificationComponent.vue"
import AlertComponent from '../components/utils/AlertComponent.vue'
import moment from 'moment'

export default {
  name: 'EventForm',
  mixins: [redirect, closeAlert],
  components: {
    Input,
    Button,
    EditorComponent,
    DatePicker,
    NotificationComponent,
    AlertComponent
  },
  data () {
    return {
      date: null,
      message: "",
      image: "",
      formData: {},
      openAlert: false,
      success: false,
      delay: 2000,
      notifOptions: {
        message: "",
        color: "",
        position: ""
      },
      btns:[
        {
          name: "Ok",
          background: "var(--q-primary)",
          show: true
        }
      ],
      alertOptions: {
        title: "",
        message: ""
      },
      btnCancel: {
        name: "Cancel",
        border: "2px solid var(--q-text-black)",
        background: "transparent",
        event: "cancel",
        textColor: "var(--q-text-black)",
      },
      btnCreate: {
        name: 'Create',
        background: 'var(--q-primary)',
        event: 'create',
      },
      inputStyle: {
        borderColor: 'var(--q-primary)',
        width: "100%",
        padding: "0 0 0 0px",
        fontSize: "16px"
      },
      event: {
        name: "",
        date: "",
        phone: "",
        address: "",
        flyer: "",
        description: "",
        author: {}
      },
      updates: {
        name: "",
        date: "",
        phone: "",
        address: "",
        flyer: "",
        description: "",
        author: {}
      },
    }
  },
  computed:{
    ...mapGetters(["currentUser", "toEdit"])
  },
  mounted(){
    if(this.toEdit?._id){
      this.btnCreate = {
        name: "update",
        event: "update",
        background: "var(--q-update)"
      }
    }
  },
  methods: {
    name(name){this.event.name = name},
    address(address){this.event.address = address},
    getDate(date){this.event.date = date},
    phone(phone){this.event.phone = phone},
    editorContent(content){ this.event.description = content },
    btnEvent(event, post = null){
      if(event === "create"){
        this.submitForm()
      }
      else if(event === "update"){
        if(post !== null){
          this.updateEvent(post)
        }
      }
    },

    async updateEvent(event){
      const propertiesToCheck = ["name", "date", "flyer", "phone", "address", "description"]

      for(const prop of propertiesToCheck){
        !this.event[prop].length ? this.updates[prop] = this.toEdit[prop] : this.updates[prop] = this.event[prop]
      }

      this.updates.author = {
        id: this.currentUser._id,
        name: this.currentUser.username,
        email: this.currentUser.email,
        pic: this.currentUser.pic
      }

      this.$store.dispatch("setLoading", true)
      await axios.put("https://positiondb.onrender.com/api/events/" + event?._id, this.updates)
      .then(res => {
        if(res.status === 200){
          this.success = true
          this.notifOptions = {
            message: "Event updated successfuly!",
            position: "center",
            color: "warning",
          }
          this.$store.dispatch("setLoading", false)
          this.$store.dispatch("addEvent", res.data)
          this.$store.dispatch("setNotify", true)
          this.redirect("home")
        }
      })
    },
    takeImage(file){
      this.convertFile(file[0])
    },
    convertFile(file){
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.event.flyer = reader.result
      }
    },
    generateBoundary() {
      return "------------------------" + Math.random().toString(16).substring(2);
    },
    async submitForm(){
      try {
        if(this.currentUser?._id !== null || this.currentUser?._id !== ''){
          this.event.author = {
            id: this.currentUser._id,
            name: this.currentUser.username,
            email: this.currentUser.email,
            pic: this.currentUser.pic
          }

          const headers = {'token': `Bearer ${this.currentUser.accessToken}`}

          if(this.event.date === ""){
            this.openAlert = true
            this.alertOptions = {
              title: "Date Error",
              message: "You have to pick a date for the event!"
            }
          }
          else{
            let currentDate = moment().format("DD/MM/YYYY")
            let diff = moment(this.event.date).isBefore(currentDate)

            if(diff){
              this.openAlert = true
              this.alertOptions = {
                title: "Date Error",
                message: "The date can't be inferior to today's date"
              }
            }
            else{
              this.$store.dispatch("setLoading", true)
              await axios.post("https://positiondb.onrender.com/api/events", this.event, {headers})
              .then(res => {
                if(res.status === 201){
                  this.success = true
                  this.notifOptions = {
                    message: "Event created!",
                    position: "bottom",
                    color: "primary",
                  }
                  this.$store.dispatch("setLoading", false)
                  this.$store.dispatch("addEvent", res.data)
                  this.$store.dispatch("setNotify", true)
                  setTimeout(this.redirect("home"), 2000)
                }
              })
            }
          }
        }
      } catch (error) {
        this.openAlert = true
        this.alertOptions = {
          title: "Error",
          message: error
        }
        this.$store.dispatch("setLoading", false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    .form{
      width: 100%;

      .inputs{
        width: 100%;
      }

      .contain-desc{
        width: 100%;
        margin-bottom: 20px;
      }

      .contain-picker{
        width: 100%;
        height: auto;
        position: relative;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        .date{
          position: relative;
        }
      }
      .img-picker{
        height: auto;
        width: 100%;
        margin-bottom: 20px;

        .picker{
          width: 100%;
          height: 100%;
          background: white;
        }
      }

      .buttons{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
        margin-bottom: 1rem;
      }
    }
  }
</style>
