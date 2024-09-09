<template>
  <q-card-section>
    <div class="q-pa-md date">
      <div class="q-pb-sm">
        <q-date
          :title="title"
          :subtitle="subtitle"
          v-model="date"
          @input="dateValue"
          flat
          bordered
          style="width: 100%;"
        />
         <ButtonComponent
          v-if="withBtn"
          bname="Ok"
          background="var(--q-primary)"
          textColor="white"
          W="100%"
          H="3rem"
          fSize="16px"
          fontWeight="600"
          style="margin-top: .3rem"
          @clicked="$emit('getDate', date)"
        />
      </div>

      <AlertComponent
        :expand="openAlert"
        @closeAlert="closeAlert"
        :title="alertOptions.title"
        :message="alertOptions.message"
        :buttons="btns"
      />
    </div>
  </q-card-section>
</template>

<script>
import moment from 'moment'
import ButtonComponent from './ButtonComponent.vue'
import AlertComponent from './AlertComponent.vue'
import { closeAlert } from '../../mixins'

export default {
    name: "DatePickerComponent",
    components: {ButtonComponent, AlertComponent},
    mixins: [closeAlert],
    props: {
      title: { String },
      subtitle: { String },
      margin: { type: String, default: "5px" },
      withBtn: {type: Boolean, default: false},
      dateModel: { type: String || Object }
    },
    data() {
      return {
        date: this.dateModel,
        openAlert: false,
        alertOptions: {
          title: "",
          message: ""
        },
        btns: [
          {
            name: "Ok",
            background: "var(--q-primary)",
            show: true
          }
        ]
      }
    },
    methods: {
      dateValue(val) {
        var tempDate = moment(val)
        var formattedDate = tempDate.format("DD/MM/YYYY")
        this.$emit('getDate', formattedDate)
      },
    }
}
</script>

<style lang="scss" scoped>
  .date{
    width: auto;
    padding: 0;
  }
</style>
