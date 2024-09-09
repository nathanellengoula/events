<template>
  <q-layout view="lHh Lpr lFf" class="bg-primary">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {checkUserLocal, redirect, toHomeIfLogged } from "../mixins/index.js"

export default {
  name: 'WelcomeLayout',
  mixins: [ redirect, toHomeIfLogged, checkUserLocal ],
}
</script>

<style lang="scss" scoped>
  .q-layout{
    padding: 0 20px !important;
    box-sizing: border-box !important;
    color: white !important;
    height: auto !important;

    .q-page-container{
      padding: 0 !important;
      margin: 0 !important;
      height: auto !important;
    }
  }
</style>


