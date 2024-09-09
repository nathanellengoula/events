import { QSpinnerIos, QSpinnerBall, QSpinnerOval } from "quasar"
import { mapGetters } from "vuex"
import { logout } from "src/models/users"
import axios from "axios"
import { getFromLocal } from "src/models/utils/localStorage"
import { getFromSession } from "src/models/utils/sessionStorage"

export const checkUserLocal = {
  data(){
    return {
      user: {},
      isConnected: false
    }
  },
  computed:{
    ...mapGetters(['currentUser'])
  },
  created(){
    this.user = getFromLocal("currentUser")
    this.isConnected = getFromLocal("connected")
    if(this.user !== null){
      this.$store.dispatch("setCurrentUser", this.user)
      if(this.isConnected){
        this.$store.dispatch("setConnectedUser", this.isConnected)
      }
    }
  }
}

// export const checkUserSession = {
//   data(){
//     return {
//       user: {},
//       isConnected: false
//     }
//   },
//   computed:{
//     ...mapGetters(['currentUser'])
//   },
//   created(){
//     this.user = getFromSession("currentUser")
//     this.isConnected = getFromSession("connected")
//     if(this.user !== null){
//       this.$store.dispatch("setCurrentUser", this.user)
//       if(this.isConnected){
//         this.$store.dispatch("setConnectedUser", this.isConnected)
//       }
//     }
//   }
// }

export const handleLog = {
  methods: {
    handleLog() {
      logout()
      this.$store.dispatch("setCurrentUser", {})
      this.redirect('login')
    }
  }
}

export const getUser = {
  methods: {
    async getUser(){
      this.$store.dispatch("setLoading", true)
      await axios.get("https://positiondb.onrender.com/api/user/" + this.$route.params.id)
        .then(res => {
          this.user = res.data
          this.$store.dispatch("setLoading", false)
        })
    },
  },
  mounted(){
    this.getUser()
  }
}

export const getUserEvents = {
  methods: {
    async getUserEvents(){
      this.$store.dispatch("setLoading", true)
      await axios.get("https://positiondb.onrender.com/api/events/findUserEvents/" + this.$route.params.id)
      .then(res => {
        if(res.status === 200){
          this.$store.dispatch("getUserEvents", res.data)
          this.$store.dispatch("setLoading", false)
        }
      })
    }
  }
}

export const getEvents = {
  mounted(){
    this.getEvents()
  },
  methods: {
    async getEvents(){
      this.$store.dispatch("setLoading", true)
      await axios.get("https://positiondb.onrender.com/api/events")
      .then(res => {
        if(res.status === 200){
          this.$store.dispatch("getEvents", res.data)
          this.$store.dispatch("setLoading", false)
        }
      })
    }
  }
}

export const toLoginIfAuthRequired = {
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    if (this.$route.meta.requireAuth === true) {
      let isConnected = getFromLocal("connected")
      if (!isConnected){
        this.redirect('login')
      }
      else this.redirect("home")
    }
  }
}

export const toLoginIfAuthRequiredAdmin = {
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    if (this.$route.meta.requireAuthAndAdmin) {
      if (this.currentUser._id) {
        if (this.currentUser.role !== "admin") {
          this.redirect('home')
        }
      }
      else {
        this.redirect("login")
      }
    }
  }
}

export const toHomeIfLogged = {
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    let isConnected = getFromLocal("connected")
    if(!isConnected) this.redirect("login")
    else this.redirect("home")
  }
}

export const redirect = {
  methods: {
    redirect(name, params = {}){
      if (this.$router.history.current.name !== name){
        this.$router.push({ name, params});
        return
      }
    },
  }
}

export const closeAlert = {
  data() {
    return {
      openALert: false
    }
  },
  methods: {
    closeAlert(value) {
      if (value === this.openAlert) this.openAlert = false
    },
  }
}
