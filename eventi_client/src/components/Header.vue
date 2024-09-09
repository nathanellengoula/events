<template>
  <div class="container">
    <q-header>
      <div class="main">
        <div class="img-contianer">
          <img src="assets/logo.svg" style="cursor: pointer" alt="Logo" @click.stop="redirect('home')">
        </div>
        <div class="icons">
          <Button
            Flat
            isIcon
            v-for="(btn, index) in buttons"
            :key="index"
            @clicked="hadleClick(btn.event)"
            :iconName="btn.icon"
            class="icon"
            round
            iconSize="18px"
            H="2.2rem"
            W="2.2rem"
            background="#1F1F1F20"
          />
          <img
            src="assets/menu.svg"
            alt="menu"
            class="icon"
            @click.stop="openMenu = true"
          />
        </div>
      </div>
      <q-slide-transition :duration="400">
        <div class="contain-search" v-show="toggleSearch">
          <Input
            autofocus
            label=""
            showIcon
            iconName="fas fa-search"
            iconSize="18px"
            iconColor="var(--q-primary)"
            standout="text-primary bg-white"
            :inputStyle="{color: 'black', marginTop: '-.7rem'}"
            labelColor="primary"
            bgColor="white"
            dense
            @updated="searchInput"
          />
        </div>
      </q-slide-transition>
    </q-header>
    <q-drawer
      v-model="openMenu"
      class="drawer"
      mobile
      :width="270"
      content-class="bg-white q-pa-sm"
      show-if-above
      side="right"
      elevated
      v-if="$q.screen.xs"
    >
      <MenuComponent />
    </q-drawer>
  </div>
</template>

<script>
import Button from 'src/components/utils/ButtonComponent.vue'
import { mapGetters } from "vuex"
import { redirect } from "../mixins/index.js"
import MenuComponent from "./MenuComponent.vue"
import Input from "../components/utils/InputComponent.vue"

export default {
  name: 'Header',
  components: {
    Button,
    MenuComponent,
    Input
  },
  mixins: [ redirect ],
  data () {
    return {
      buttons: [
        {
          icon: 'fas fa-plus',
          event: "add"
        },
        {
          icon: 'fas fa-search',
          event: "search"
        }
      ],
      openMenu: false,
      component: null,
      showLinks: true,
      clicked: false,
      toggleSearch: false,
      update: null,
      search: ''
    }
  },
  created(){
    this.openMenu = false
    this.showLinks = true
  },
  watch: {
    isOpen(val){
      if(val){
        const bottomSpace = document.querySelector('.contain-search .items-start')
        bottomSpace.style.padding = '0'
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser", "events", "isOpen"])
  },
  methods: {
    searchInput(input){
      this.$store.dispatch("performSearch", input)
    },
    back(){
      this.showLinks = true
      this.component = null
      this.clicked = false
    },
    closeMenu(){
      this.openMenu = false
      this.showLinks = true
      this.component = null
    },
    hadleClick(event){
      if(event === "add"){
        this.redirect('add-event')
      }
      else if(event === "search"){
        this.toggleSearch = !this.toggleSearch
        this.$store.dispatch("setIsOpen", this.toggleSearch)

        this.toggleSearch ? this.buttons[1].icon = "fas fa-chevron-up" : this.buttons[1].icon = "fas fa-search"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container{
    height: auto !important;
    color: white;
    padding: 1rem 0 0 0 !important;
    margin-top: .5rem;
  }
</style>
<style lang="scss" scoped>
.q-header{
    height: auto;
    width: 100%;
    background: var(--q-primary);
    display: flex;
    align-items: center;
    padding: .7rem 20px .9rem 20px;
    justify-content: space-between;
    z-index: 10;
    position: fixed !important;
    flex-direction: column;
    transition: 1s linear;

    .main{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;

      .img-container{
        display: flex;
        justify-content: center;
        align-items: center;

        img{
          cursor: pointer;
          width: 10rem;
          z-index: 100;
        }
      }

      .icons{
        display: flex;
        align-items: center;

        .icon{
          margin-left: 1rem;
          cursor: pointer;
        }
      }
    }

    .contain-search{
      // background: orange;
      width: 100%;
      margin-top: 1.5rem;
      padding: 0 !important;
      display: flex;
      justify-content: center;
    }
  }
</style>
