<template>
  <base-dialog @closeDialog="closeDialog">
    <div class="w-full mb-4 mt-4" v-if="channelFound.length <= 0 && !this.errors && !this.userAdded">
      <div class="flex items-center capitalize text-gray-700 found-user__text font-normal">
        No se encontró el canal: <strong class="font-bold mr-2 ml-1 capitalize">{{ searchedChannel }}</strong> 
      </div>
    </div>

    <div class="w-full mb-4 mt-6" v-if="channelFound.length > 0 && this.errors && !this.userAdded">
      <div class="flex items-center text-gray-700 found-user__text font-normal">
        Ya pertenece al canal: <strong class="font-bold mr-2 ml-1 capitalize">{{ searchedChannel }}</strong> 
      </div>
    </div>

    <div class="w-full mb-4 mt-6" v-if="channelFound.length > 0 && !this.errors && !this.userAdded">
      <div class="flex items-center text-gray-700 found-user__text font-normal">
        Se encontró el canal: <strong class="font-bold mr-2 ml-1 capitalize">{{ channelFound[0].name }}</strong> ({{ channelFound[0].type }})
      </div>
      <div class="flex items-center text-gray-700 found-user__text font-normal" v-if="channelFound[0].type === 'privado'">
        Contacte con un administrador para unirse al canal privado
      </div>
    </div>

    <div class="w-full mb-4 mt-6" v-if="channelFound.length > 0 && !this.errors && this.userAdded">
      <div class="flex items-center text-gray-700 found-user__text font-normal">
        Te uniste al canal: <strong class="font-bold mr-2 ml-1 capitalize">{{ searchedChannel }}</strong>
      </div>
    </div>

    <!--Footer-->
    <div class="flex justify-center pt-2">
      <button
        v-if="channelFound.length > 0 && deletingChannel && !confirmDelete"
        class="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 border border-red-500 rounded shadow mr-2 flex-1"
        @click="deleteChannel" 
      >
        Eliminar (Confirmar)
      </button>
      <button
        v-if="channelFound.length > 0 && !deletingChannel && !confirmDelete"
        class="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 border border-red-500 rounded shadow mr-2 flex-1"
        @click="deleteChannelRequest" 
      >
        Eliminar
      </button>
      <button 
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2 flex-1"
        @click="closeDialog" 
      >
        Cerrar
      </button>
      <button
        v-if="channelFound.length > 0 && !userAdded && channelFound[0].type !== 'privado' && !deletingChannel"
        class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded flex-1"
        @click="handleSubmit"
      >
        Unirse
      </button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base-components/BaseDialog.vue';

export default {
  name: 'add-member-modal',
  components: {
    BaseDialog,
  },
  data() {
    return {
      errors: false,
      userAdded: false,
      deletingChannel: false,
      confirmDelete: false,
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('dialogs/toggleSearchChannelDialog', false);
    },
    handleSubmit() {
      if(this.channelFound.length <= 0) return;
      const user = JSON.parse(localStorage.getItem('user'));

      this.$store.dispatch('channel/addMember', { memberId: user.data.id, channelId: this.channelFound[0].id, member_data: user.data })
        .then((response) => {
          console.log(response)
          if(response && response.ok) {
            this.userAdded = true;
            setTimeout(() => {
              this.closeDialog();
            }, 1000);
          }
        })
        .catch((error) => {
          this.errors = true;
          console.log('Error:', error);
        });
    },
    deleteChannelRequest() {
      this.deletingChannel = true;
    },
    deleteChannel() {
      this.$store.dispatch('channel/deleteChannel', this.channelFound)
        .then(() => {
          this.closeDialog();
        });
    }
  },
  computed: {
    searchedChannel() {
      return this.$store.state.channel.searchedChannel;
    },
    channelFound() {
      return this.$store.state.channel.channelFound;
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