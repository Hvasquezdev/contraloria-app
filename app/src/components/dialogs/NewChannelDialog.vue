<template>
  <base-dialog @closeDialog="closeDialog">
    <!--Title-->
    <div class="flex justify-between items-center pb-4">
      <p class="text-2xl font-bold">Creando nuevo canal</p>
    </div>

    <!--Body-->
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="channelName">
          Nombre del canal
        </label>
        <input 
          class="shadow appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="channelName" 
          type="text" 
          placeholder="Nombre del canal"
          v-model.trim="channel.name"
        >
      </div>
    </div>

    <div class="w-full mb-4">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Privacidad
      </label>
      <div class="relative">
        <select 
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="grid-state"
          v-model.trim="channel.type"
        >
          <option value="publico">Publico</option>
          <option value="privado">Privado</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

    <!--Footer-->
    <div class="flex justify-end pt-2">
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2" @click="closeDialog">
        Cancelar
      </button>
      <button class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" @click="handleSubmit">
        Guardar
      </button>
    </div>
  </base-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import BaseDialog from '@/components/base-components/BaseDialog.vue';

export default {
  name: 'new-channel-modal',
  components: {
    BaseDialog
  },
  data() {
    return {
      channel: {
        name: null,
        type: 'publico'
      },
      errors: null
    }
  },
  methods: {
    ...mapActions('channel', ['register', 'addMember', 'setChannelFound']),
    closeDialog() {
      this.$store.dispatch('dialogs/toggleNewChannelDialog', false)
    },
    handleSubmit() {
      const channelData = {
        name: this.channel.name.toLowerCase(),
        type: this.channel.type.toLowerCase()
      };

      if(this.channel.name && this.channel.type) {
        this.errors = null;
        this.register(channelData)
          .then((data) => {
            console.log('hola', data)
            const user = JSON.parse(localStorage.getItem('user'));
            const memberData = {
              memberId: user.data.id,
              channelId: data.response.channel,
              member_data: user.data
            };
            this.setChannelFound([data.channel]);
            this.addUserToChannel(memberData);
          })
          .catch(error => console.log(error));
      } else {
        this.errors = 'Por favor rellene todos los campos'
      }
    },
    addUserToChannel(data) {
      this.addMember(data)
        .then((response) => {
          if(response && response.ok) {
            setTimeout(() => {
              this.closeDialog();
            }, 1000);
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  },
}
</script>
