<template>
  <div>
    <q-carousel
      animated
      v-model="slide"
      :navigation="navigation"
      :infinite="infinite"
      :autoplay="autoplay"
      :arrows="arrows"
      :transition-prev="transPrev"
      :transition-next="transNext"
      :swipeable="swipeable"
      :prev-icon="prevIcon"
      :next-icon="nextIcon"
      :navigation-position="navPosition"
      :thumbnails="thumbnails"
      :navigation-active-icon="navActiveIcon"
      :height="height"
      :control-color="controlColor"
      :control-type="controlType"
      class="carousel"
    >
      <q-carousel-slide
        :name="name"
        class="slide"
        :img-src="flyer"
      />
    </q-carousel>
  </div>
</template>

<script>
export default {
  name: 'ImageSlider',
  props: {
    navigation: { type: Boolean },
    autoplay: { type: Boolean },
    arrows: { type: Boolean },
    swipeable: { type: Boolean },
    infinite: { type: Boolean },
    thumbnails: { type: Boolean },
    transPrev: { type: String },
    transNext: { type: String },
    images: { type: Array },
    flyer: { type: String },
    prevIcon: { type: String },
    nextIcon: { type: String },
    height: { type: String },
    prevIcon: { type: String },
    nextIcon: { type: String },
    navPosition: { type: String },
    navActiveIcon: { type: String },
    controlColor: { type: String },
    controlType: { type: String }
  },
  data () {
    return {
      slide: 0,
      name: "flyer"
    }
  }
}
</script>

<style lang="scss" scoped>
  .carousel{
    height: inherit;
    width: 100%;

    .slide{
      height: 100%;
      width: inherit;
    }
  }
</style>
