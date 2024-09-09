<template>
  <div class="main">
    <MenuHeaderComponent />
    <div class="content">
      <q-list class="list" separated>
        <q-item class="item shadow-2" clickable v-ripple v-for="(link, index) in links" :key="index" @click.stop="redirect(link.route)">
          <span class="name"> {{ link.name }} </span>
          <q-icon :name="link.icon" size="20px"/>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { redirect } from '../mixins'
import MenuHeaderComponent from "./MenuHeaderComponent.vue"

export default {
  name: 'MenuComponent',
  mixins: [ redirect ],
  components: {
    MenuHeaderComponent
  },
  data () {
    return {
      links: [
        {
          name: "favourites",
          route: "favourites",
          icon: "fas fa-heart"
        },
        {
          name: "settings",
          route: "settings",
          icon: "fas fa-cogs"
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    margin-top: 3rem;

    .list{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;

      .item{
        border-radius: 8px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--q-primary);

        .name{
          text-transform: capitalize;
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
  }
</style>
