<template>
  <div id="contain">
      <q-input
        :input-style="inputStyle"
        :clearable="clearable"
        :style="{ background: background, height: Height, width: Width, borderRadius: radius }"
        v-model="model"
        :color="color"
        :label-color="labelColor"
        :rules="rules"
        lazy-rules
        reactive-rules
        hide-hint
        :counter="counter"
        :maxlength="maxlength"
        :label="label"
        class="input"
        :hint="hint"
        :error="error"
        :bg-color="bgColor"
        :borderless="borderless"
        :loading="loading"
        :standout="standout"
        :outlined="outlined"
        :readonly="readonly"
        :mask="mask"
        :dense="dense"
        autocomplete
        :autofocus="autofocus"
        :input-class="inputClass"
        :rounded="round"
        :type="type"
        @input="update"
        @focus="$emit('focused')"
        @blur="$emit('blured')"
        @click.stop="$emit('clicked')"
        @keyup.enter="$emit('onEnter')"
      >
        <template v-slot:prepend v-if="showIcon">
          <q-icon
            :name="iconName"
            :size="iconSize"
            :style="{color: iconColor}"
            class="icon"
            @click.stop="$emit('iconClicked')"
          />
        </template>
        <div class="wrap" :style="{flexDirection: position, justifyContent: alignment}">
          <span
            v-if="!model"
            class="placeholder"
            :style="{
              margin: placeholderMargin,
              color: inputColor,
              fontSize: fSize,
              fontWeight: fWeight
            }"
          >
            {{ placeholder }}
          </span>
        </div>
        <template v-slot:append v-if="hidePass">
          <q-icon
            :name="hide ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click.stop="togglePass"
          />
        </template>
      </q-input>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props:{
    label: {type: String},
    background: {type: String},
    standout: {type: [Boolean, String]},
    outlined: {type: [Boolean, String]},
    fSize: {type: String},
    fWeight: {type: String},
    bgColor: {type: String},
    inputPad: {type: String},
    maxlength: {type: Number},
    mask: {type: String},
    inputColor: {type: String},
    labelColor: {type: String},
    loading: {type: String},
    placeholderMargin: {type: String},
    iconColor: {type: String},
    iconName: {type: String},
    Height: {type: String},
    Width: {type: String},
    type:{type: String},
    placeholder:{type: String},
    radius:{type: String},
    iconSize:{type: String},
    position:{type: String},
    hidePass:{type: Boolean},
    color:{type: String},
    alignment:{type: String},
    round:{type: Boolean},
    hint:{type: String},
    bar:{type: Boolean},
    error:{type: Boolean},
    isPwd: {type: Boolean},
    clearable:{type: Boolean},
    borderless:{type: Boolean},
    dense:{type: Boolean},
    autofocus:{type: Boolean},
    readonly:{type: Boolean},
    showIcon:{type: Boolean},
    counter:{type: Boolean},
    inputStyle:{type: Object},
    inputClass:{type: Object},
    propModel:{type: String},
    rules:{type: Array},
  },
  data () {
    return {
      text: "",
      clear: false,
      model: this.propModel,
      focusValue: false,
      hide: this.isPwd
    }
  },
  methods:{
    togglePass(){
      this.hide = !this.hide
      if(this.hide) this.$emit("hidePass", true)
      else this.$emit("hidePass", false)
    },
    clearInput(){
      this.model = ""
    },
    update(){
      this.$emit("updated", this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
  #contain{
    width: 100%;

    .q-input{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      min-width: 20vw;
      .wrap{
        height: 100%;
        width: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        gap: 10px;

        .icon{
          font-size: 16px;
          margin: auto 0;
        }

        .bar{
          height: 2vh;
          width: 1.5px;
          background:  var(--q-grey-variant-1);
        }

        .placeholder{
          color: var(--q-placeholder-color);
          left: 27px;
          font-weight: 300;
        }
      }
    }
  }
</style>

