<template>
  <base-dialog class="upload-file-dialog" @closeDialog="closeDialog">
    <!--Title-->
    <div class="flex justify-center items-center pb-4">
      <p class="text-2xl font-bold text-center">Mensaje multimedia</p>
    </div>

    <FilePond ref="pond" v-model="files" />

    <input
      type="text"
      class="w-full px-4 font-dark-blue rounded-lg border-1 border-dark-blue message-input"
      placeholder="Escribe tu mensaje"
      :value="value"
      @input="handleInput"
    />

    <!--Footer-->
    <div class="flex justify-end pt-2">
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2" @click="closeDialog">
        Cancelar
      </button>
      <button
        class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        :class="{ 'opacity-50 pointer-events-none': !isValid }"
        @click="handleSubmit"
      >
        Enviar Mensaje
      </button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base-components/BaseDialog.vue';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

export default {
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  components: {
    FilePond: vueFilePond(FilePondPluginImagePreview),
    BaseDialog
  },
  data() {
    return {
      files: []
    }
  },
  watch: {
    files() {
      const file = this.$refs.pond.getFiles().length > 0 ? this.$refs.pond.getFiles()[0].file : null;
      this.$emit('setMediaFile', file);
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('dialogs/toggleUploadFileDialog', false);
    },
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    handleSubmit() {
      if(!this.isValid) return;
      this.$emit('sendMessage');
    }
  },
  computed: {
    isValid() {
      return this.files.length > 0 || this.value;
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-file-dialog .message-input {
  // border: 1px solid;
  // border-radius: 10px;
  padding: 10px 20px 12px 20px;
}
</style>