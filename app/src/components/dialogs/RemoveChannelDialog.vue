<template>
  <base-dialog @closeDialog="closeDialog">
    <!--Title-->
    <div class="flex justify-center items-center pb-4">
      <p class="text-2xl font-bold text-center">Eliminando canal</p>
    </div>

    <!--Footer-->
    <div class="flex justify-end pt-2">
      <button 
        class="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow mr-2 flex-1"
        @click="closeDialog" 
      >
        Cancelar
      </button>
      <button 
        class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        Confirmar
      </button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base-components/BaseDialog.vue';

export default {
  props: {
    channelData: {
      type: Object,
      default: () => {}
    }
  },
  name: 'remove-channel-modal',
  components: {
    BaseDialog
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('dialogs/toggleRemoveUserDialog', false);
    }
  },
  computed: {
    inChannel() {
      return this.$store.state.channel.inChannel;
    },
  },
}
</script>

<style lang="scss">
.found-user__text,
.searching-user__text {
  font-size: 16px;
}
.disabled-button {
  opacity: 0.65; 
  cursor: not-allowed;
}
</style>