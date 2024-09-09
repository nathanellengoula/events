<template>
  <div class="links">
    <div class="link" v-for="(link, index) in links" :key="index" @click.stop="$emit('link', link.link)">
      <div class="icon-name">
        <q-icon :name="link.icon" color="white" size="28px" />
        <span>{{ link.name }}</span>
      </div>
      <q-icon name="fas fa-chevron-right" color="white" size="25px" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuLinks',
  data () {
    return {
      links:[
        {
          id: 1,
          icon: "fas fa-user",
          name: "Profile",
          link: "profile"
        },
        {
          id: 2,
          icon: "fas fa-calendar-check",
          name: "My Events",
          link: "events"
        },
        {
          id: 3,
          icon: "fas fa-heart",
          name: "Favourites",
          link: "favourites"
        },
        {
          id: 4,
          icon: "fas fa-cog",
          name: "Settings",
          link: "settings"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .links{
    display: flex;
    flex-direction: column;
    height: 20rem;

    .link{
      width: 100%;
      background: var(--q-link-bg);
      height: 4rem;
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      justify-content: space-between;
      margin-bottom: 1rem;
      cursor: pointer;

      .icon-name{
        display: flex;
        align-items: center;
        span{
          margin-left: 20px;
          color: white;
          font-weight: 500;
          font-size: 1.1rem;
        }
      }
    }
  }
</style>
