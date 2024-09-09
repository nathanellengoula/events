<template>
  <div class="show-body">
    <div class="carousel">
      <img :src="item.flyer" alt="flyer" style="width: 100%; height: 100%; object-fit: cover">
    </div>
    <div class="infos-actions">
      <div class="infos">
        <div class="name">
          <span>Event name: </span>
          <span class="n">{{ item.name }}</span>
        </div>
        <div class="description">
          <span>Description: </span>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageSlider from "src/components/utils/ImageSlider.vue"
import ButtonComponent from "src/components/utils/ButtonComponent.vue"

export default {
  name: 'ShowProduct',
  components: { ImageSlider, ButtonComponent },
  props: {
    item: { type: Object }
  },
  data () {
    return {
      buttons:[
        {
          label: "Ok",
          background: "#53953F",
          flat: true,
          radius: "0px"
        }
      ],
    }
  },
  methods:{
    btnAction(ind){
      if(ind === 0) {
        this.$emit('commander', this.item)
        this.$emit('closePopup')
      }
      else if(ind === 1) {
        this.$emit('panier', this.item)
        this.$emit('closePopup')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.show-body{
  display: flex;
  width: 100%;
  height: 22.5em;
  justify-content: center;
  align-items: center;
  gap: 30px;

  .carousel{
    // background: red;
    width: inherit;
    height: 100%;
  }

  .infos-actions{
    // border: 1px solid red;
    width: inherit;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .infos{
      display: flex;
      flex-direction: column;

      .name{
        margin-top: 5px;
        display: flex;
        align-items: center;

        span{
          font-size: 16px;
          font-weight: 500;
        }
        .n{
          font-size: 16px;
          font-weight: 500;
          margin-left: 10px;
          text-decoration: underline;
        }
      }

      .description{
        display: flex;
        margin-top: 8px;
        flex-direction: column;

        span{
          font-size: 16px;
          font-weight: 500;
          text-transform: capitalize;
        }

        p{
          font-size: 16px;
          text-align: justify;
        }
      }
    }

    .actions{
      width: inherit;
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 1rem
    }
  }
}

@media (max-width: "600px"){
  .show-body{
    width: 100%;
    flex-direction: column;
    height: auto !important;
    gap: 30px;

    .carousel{
      width: inherit;
      height: 100%;
    }

    .infos-actions{
      // border: 1px solid red;
      width: inherit;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .actions{
        width: inherit;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
    }
  }
}
</style>
