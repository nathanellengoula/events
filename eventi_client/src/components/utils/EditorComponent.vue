<template>
  <div class="editor">
    <q-editor
      v-model="editor"
      toolbar-bg="primary"
      toolbar-text-color="white"
      toolbar-toggle-color="yellow-8"
      toolbar-rounded
      placeholder="Description"
      :content-style="{ backgroundColor: 'white' }"
      clearable
      @input="editorContent"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline'],
        ['hr'],

        ['undo', 'redo'],
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
        poppins: 'Poppins',
        robotto: 'Robotto'
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'EditorComponent',
  props: {
    description: { type: String, default: "" }
  },
  data () {
    return {
      editor: this.description
    }
  },
  methods: {
    editorContent(value){
      this.$emit("editorContent", value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor{
    .q-editor[placeholder]{
        font-size: 20px !important;
      }
  }
</style>
