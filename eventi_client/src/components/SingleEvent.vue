<template>
<div class="main">
  <div class="post">
    <CardComponent
      Flat
      radius="0"
      W="100%"
      H="auto"
      pad="0"
      v-if="event._id"
    >
      <div class="top">
        <div class="userInfos" @click.stop="redirect('user', { id:event.author.id })">
          <img :src="!event?.author?.pic.length ? 'userProfile.png' : event?.author?.pic " alt="User profile" class="shadow-2">
          <div class="author-date">
            <span class="author">{{ event.author.name }}</span>
            <span class="create-date">{{ createDate }}</span>
          </div>
        </div>
        <div class="actions">
          <Button
            v-if="event.author.id === currentUser._id"
            class="action"
            v-for="(action, index) in options"
            :key="index"
            @clicked="handleButtonActionClick(action.event)"
            round
            Flat
            isIcon
            :iconName="action.icon"
            :iconColor="action.color"
            background="#1F1F1F10"
            iconSize="15px"
            H="2rem"
            W="2rem"
          />
        </div>
      </div>
      <div class="name-container">
        <span>{{ event.name }}</span>
      </div>
      <div class="when-desc">
        <div class="contain-when">
          <div class="when-dot">
            <div class="when">
              <q-icon name="fas fa-calendar-day" size="18px" color="primary" />
              <span>{{ event.date }}</span>
            </div>
            <div class="dot"></div>
          </div>
          <div class="location">
            <q-icon name="fas fa-map-marked-alt" size="16px" color="primary" />
            <span> {{ event.address }} </span>
          </div>
        </div>
        <div class="description">
          <div class="desc" v-if="newDesc.length >= 100" @click.stop="openDesc = !openDesc">
            <span v-if="!openDesc" v-html="newDesc"></span>
            <span v-else v-html="event.description"></span>
          </div>
          <div v-else class="desc">
            <span v-html="event.description"></span>
          </div>
        </div>
      </div>

      <div class="body">
        <div class="contain-img" style="cursor: pointer" @click.stop="showImage(event._id)">
          <img :src="event.flyer" alt="Flyer">
        </div>
        <div class="bottom">
          <div class="like">
            <Button
              Flat
              dense
              isIcon
              fSize="14px"
              :bname="event.likes.length.toString()"
              fWeight="400"
              btnPad="0 5px"
              iconSize="18px"
              :iconColor="likedColor"
              nameColor="black"
              iconMargin="0 5px 0 0"
              @clicked="likeEvent(event._id)"
              background="rgba(0, 0, 0, 0.05)"
              :iconName="likeIcon"
            />
          </div>
          <div class="share">
            <Button
              Flat
              dense
              isIcon
              fSize="14px"
              bname="Share"
              fWeight="400"
              btnPad="0 5px"
              iconSize="18px"
              iconColor="var(--q-primary)"
              nameColor="black"
              iconMargin="0 5px 0 0"
              iconName="fas fa-share"
              background="rgba(0, 0, 0, 0.05)"
              @clicked="handleShare(event._id)"
            />
          </div>
        </div>
      </div>
    </CardComponent>
    <ModalComponent
      :fullWidth="$q.screen.lt.sm"
      :openModal="show"
      modalH="auto"
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
      @closeModal="close(show)"
    >
      <div style="width: 100%;height: 100%;">
        <img :src="imageToShow" alt="image" style="width: 100%;height: 100%;object-fit:cover">
      </div>
    </ModalComponent>
  </div>

  <NotificationComponent
    v-if="success"
    :message="notifMessage"
    type="positive"
    color="primary"
    position="center"
    progress
    :timeout="delay"
  />

  <AlertComponent
    :expand="expand"
    title="Delete"
    message="Do you really want to delete this event?"
    :buttons="btns"
    @closeAlert="closeAlert"
    @delete="deleteEvent(event._id)"
  />

  <ModalComponent
    Flat
    dense
    noFocus
    fullWidth
    persistent
    radius="5px"
    modalH="auto"
    modalW="5rem"
    headerPad="0"
    headerH="2rem"
    btnSize="12px"
    transShow="scale"
    background="white"
    btnIcon="fas fa-times"
    :openModal="openShare"
    headerBackground="white"
    btnColor="var(--q-negative)"
    @closeModal="openShare = !openShare"
  >
    <div
      class="
        contain-link
        flex
        justify-between
        bg-grey-3
        q-pa-sm
        rounded-borders
        items-center
      ">
      <span>{{ shareLink }}</span>
      <Button
        bname=""
        Flat
        dense
        isIcon
        iconName="far fa-copy"
        iconSize="20px"
        iconColor="var(--q-primary)"
        background="transparent"
        rounded
        @clicked="copyLink()"
      />
    </div>
  </ModalComponent>
</div>
</template>

<script>
import CardComponent from './utils/CardComponent.vue'
import ModalComponent from "./utils/ModalComponent.vue"
import ShowEvent from "./ShowEvent.vue"
import moment from "moment"
import { mapGetters } from "vuex"
import { getEvents, redirect } from '../mixins'
import axios from 'axios'
import NotificationComponent from "../components/utils/NotificationComponent.vue"
import Button from "./utils/ButtonComponent.vue"
import MiniPopup from "./MiniPopup.vue"
import AlertComponent from "./utils/AlertComponent.vue"
import { truncateText } from "../functions/functions.js"
import { copyToClipboard } from 'quasar'

export default {
  name: 'SingleEvent',
  mixins: [ redirect, getEvents ],
  components: {
    CardComponent,
    ShowEvent,
    ModalComponent,
    NotificationComponent,
    Button,
    MiniPopup,
    AlertComponent
    },
  props: {
    event: { type: Object }
  },
  data () {
    return {
      isUser: false,
      likeIcon: "far fa-heart",
      likedColor: "black",
      likedBtnName: "Like",
      showButton: false,
      openShare: false,
      link: "",
      shareLink: "",
      btns:[
        {
          name: "No",
          background: "var(--q-text-black2)",
          show: true
        },
        {
          name: "Yes",
          background: "var(--q-primary)",
          show: true
        }
      ],
      options: [
        {
          icon: "fas fa-edit",
          event: "edit",
          color: "orange",
        },
        {
          icon: "fas fa-trash",
          event: "delete",
          color: "red",
        }
      ],
      openPopup: false,
      createDate: "",
      eventDate: "",
      show: false,
      imageToShow: "",
      liked: false,
      success: false,
      delay: 300,
      notifMessage: "",
      expand: false,
      alertOptions: {
        title: "",
        message: ""
      },
      openAlert: false,
      alertOptions: {
        title: "",
        message: ""
      },
      newDesc: truncateText(this.event.description, 100),
      openDesc: false,
      show: false
    }
  },
  mounted(){
    this.dateFormatting()
    this.checkCurrentUserLike()
  },
  computed:{
    ...mapGetters(["currentUser", "events"]),
  },
  watch: {
    liked(val){
      if(val){
        this.likeIcon = "fas fa-heart"
        this.likedColor = "var(--q-negative)"
      }else{
        this.likeIcon = "far fa-heart"
        this.likedColor = "black"
      }
    },
  },
  methods: {
    checkCurrentUserLike(){
    //  for(let i = 0; i < this.events.length; i++){
    //     console.log(i)
    //  }
    },
    dateFormatting(){
      let createDate = moment(this.event.createdAt)
      let eventDate = moment(this.event.date)

      this.createDate = createDate.format("DD/MM/YYYY")
      this.eventDate = eventDate.format("DD/MM/YYYY")
    },
    copyLink(){
      copyToClipboard(this.link)
        .then(() => {
          this.openShare = !this.openShare
          this.success = true
          this.notifMessage = "Event link copied"
        })
        .catch(() => { console.log("An error occured") })
    },
    handleShare(eventId){
      this.success = false
      this.openShare = true
      this.link = `http://localhost:8080/event/${eventId}`
      this.shareLink = truncateText(this.link, 32)
    },
    close(value){
      if(value === this.show) this.show = false
    },
    closeA(val){
      if(val) this.openAlert = false
    },
    deleteEvent(id) {
      const headers = {
        'token': `Bearer ${this.currentUser.accessToken}`
      };

      try {
        this.$store.dispatch("setLoading", true)
        axios.delete("https://positiondb.onrender.com/api/events/delete/" + id, { headers })
          .then(res => {
            if (res.status === 200) {
              this.$emit("deleted");
              this.$store.dispatch("setNotify", true);
              this.expand = false
              this.$store.dispatch("setLoading", false)
              this.getEvents()
              this.redirect("home");
            } else {
              // Handle other response statuses here
            }
          })
          .catch(error => {
            console.error(error);
            this.openAlert = true;
            this.alertOptions = {
              title: "Error",
              message: error.message
            };
            this.$store.dispatch("setLoading", false)
          });
      } catch (error) {
        console.error(error);
        this.openAlert = true;
        this.alertOptions = {
          title: "Error",
          message: error.message // Access the error message from the caught error object
        };
        this.$store.dispatch("setLoading", false)
      }
    },
    handleButtonActionClick(event){
      if(event === "edit") {
        let item = this.events.find(item => item._id === this.event._id)
        if(item){
          this.$store.dispatch("setToEdit", item)
          this.redirect('add-event', {id: item._id})
        }
      }
      else if(event === "delete") this.expand = true
    },
    async likeEvent(id){
      try {
        const headers = {'token': `Bearer ${this.currentUser?.accessToken}`}

        const event = this.events.find(event => event._id === id)
        const found = event?.likes.includes(this.currentUser?._id)

        if(!found){
          const data = { userId: this.currentUser?._id, isLiked: false }
          await axios.post("https://positiondb.onrender.com/api/events/like/" + id, data, {headers})
          .then((res) => {
            this.liked = res.data
          })
          await axios.get("https://positiondb.onrender.com/api/events")
          .then(res => {
            if(res.status === 200){
              this.$store.dispatch("getEvents", res.data)
            }
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    closeAlert(val){
      if(val) this.expand = false
    },
    closePopup(){
      this.show = false
    },
    showImage(id){
      const event = this.events.find(e => e._id === id)
      if(event){
        this.imageToShow = event.flyer
        this.show = true
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .open-popup{
    display: block;
  }
  .close-popup{
    display: none;
  }
  .popup{
    position: absolute;
    top: 1.5rem;
    right: 3.7rem;
  }
</style>

<style lang="scss" scoped>
  .post{
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;

    .top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      height: 4rem;

      .userInfos{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        width: auto !important;
        flex: 1;

        img{
          width: 2.5rem;
          height: 2.5rem;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 8px;
        }

        .author-date{
          display: flex;
          flex-direction: column;

          .author{
            font-size: .8rem;
            font-weight: bold;
            color: var(--q-text-black);
          }

          .create-date{
            font-size: .6rem;
            font-weight: 400;
            font-style: italic;
            color: var(--q-text-black);
          }
        }
      }

      .actions{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        width: 100%;
        height: inherit;
        flex: 1;

        .action{
          margin-left: .6rem;
          cursor: pointer;
        }

        .contain-mini{
          z-index: 1;
        }
      }
    }

    .name-container{
      width: 100%;
      height: auto;
      margin: 10px 0;
      padding: 0 20px;

      span{
        font-size: 1rem;
        font-weight: 600;
        text-transform: capitalize;
      }
    }

    .when-desc{
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 10px 0;
      padding: 0 20px;

      .contain-when{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .when-dot{
          display: flex;
          align-items: center;

          .when{
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            background: #d5d5d535;
            border-radius: 5px;
            margin-right: 7px;

            span{
              font-size: .6rem;
              margin-left: 8px;
              font-weight: bold;
            }
          }

          .dot{
            background: red;
            width: 4px;
            height: 4px;
            border-radius: 50%;
          }
        }

        .location{
          display: flex;
          align-items: center;

          span{
            font-size: .8rem;
            font-weight: 500;
            margin-left: .7rem;
          }
        }
      }
      .description{
        cursor: pointer;
        margin-top: 15px;
        display: flex;
        align-items: center;

        span{
          font-size: .9rem;
          font-weight: 400;
        }
      }
    }


    .body{
      width: 100%;
      margin-top: 20px;

      .contain-img{
        width: inherit;
        height: 500px;
        padding: 0 !important;

        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .bottom{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        margin-top: 2px;

        .like, .share{
          cursor: pointer;
          span{
            margin-left: .5rem;
          }
        }

        .like{
          display: flex;
          align-items: center;

          .number{
            font-size: 16px;
            margin-right: 5px;
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
