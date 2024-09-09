<template>
  <div class="top bg-secondary">
    <div class="user" @click.stop="redirect('user', {id: currentUser?._id})">
      <div class="contain-img">
        <img :src="!currentUser?.pic.length ? 'userProfile.png' : currentUser?.pic" alt="User profile">
      </div>
      <span class="username">{{ currentUser?.username }}</span>
    </div>
    <div class="logout">
      <Button
        Flat
        round
        isIcon
        @clicked="logout"
        bname=""
        H="2rem"
        W="2rem"
        iconSize="18px"
        background="white"
        iconColor="var(--q-negative)"
        iconName="fas fa-sign-out-alt"
        />
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import { redirect, handleLog } from "../mixins/index.js"
import Button from "./utils/ButtonComponent.vue"

export default {
  name: 'MenuHeaderComponent',
  components: {
    Button
  },
  mixins: [redirect, handleLog],
  data () {
    return {}
  },
  computed:{
    ...mapGetters(["currentUser"])
  },
  methods: {
    logout(){this.handleLog()},
  }
}
</script>

<style lang="scss" scoped>
  .top{
    width: 100%;
    display: flex;
    align-items: center;
    height: 3.5rem;
    border-radius: 8px;
    padding: 0 5px;
    justify-content: space-between;

    .user{
      width: auto;
      height: inherit;
      display: flex;
      align-items: center;
      cursor: pointer;

      .contain-img{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 5px;

        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .username{
        font-size: 15px;
        color: white;
        font-weight: 600;
        text-transform: capitalize;
      }
    }
    .logout{

    }
  }
</style>
