<template>
  <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-40">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 z-40" @click="closeDialog"></div>
    
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      
      <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 w-6 h-6 text-white text-md z-50" @click="closeDialog">
        <svg class="fill-current text-white w-full h-full" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6 relative z-50">
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
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">
            Cancelar
          </button>
          <button class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" @click="handleSubmit">
            Guardar
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'base-modal',
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
    ...mapActions('channel', ['register']),
    closeDialog() {
      this.$store.dispatch('dialogs/toggleNewChannelDialog', false)
    },
    handleSubmit() {
      const channelData = {
        name: this.channel.name.toLowerCase(),
        type: this.channel.type.toLowerCase()
      };


      if(this.channel.name && this.channel.type) {
      console.log('hola')
        this.errors = null;
        this.register(channelData)
          .then(() => {
            this.closeDialog();
          })
          .catch(error => console.log(error));
      } else {
        this.errors = 'Por favor rellene todos los campos'
      }
    }
  },
}
</script>
