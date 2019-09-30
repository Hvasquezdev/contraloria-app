<template>
  <base-dialog @closeDialog="closeDialog">
    <!--Title-->
    <div class="flex flex-col items-center pb-4">
      <p class="text-2xl font-bold pb-2">Actualiza tus datos</p>
      <small>
        Al actualizar tus datos deberas iniciar sesión de nuevo.
      </small>
    </div>

    <!--Body-->
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Nombre
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-first-name"
          type="text"
          :placeholder="user.name"
          v-model="newUserData.name"
          @keyup.enter="saveChanges"
        >
        <p class="text-red-500 text-xs italic" v-if="false">Please fill out this field.</p>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
          Apellido
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          :placeholder="user.lastName"
          v-model="newUserData.lastName"
          @keyup.enter="saveChanges"
        >
      </div>
    </div>

    <!--Footer-->
    <div class="flex justify-end pt-2">
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2" @click="closeDialog">
        Cancelar
      </button>
      <button
        class="shadow bg-green-500 focus:outline-none text-white font-bold py-2 px-4 rounded"
        :class="{ 'opacity-50 cursor-not-allowed': !hasChanges, 'hover:bg-green-400': hasChanges }"
        @click="saveChanges"
      >
        Guardar
      </button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/base-components/BaseDialog.vue';

export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      user: {},
      newUserData: {}
    }
  },
  mounted() {
    const userData = Object.assign({}, this.$store.state.account.user.data);
    this.user = userData;
  },
  computed: {
    hasChanges() {
      if (this.newUserData.name || this.newUserData.lastName || this.newUserData.userName) {
        return true;
      }

      return false;
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('dialogs/toggleEditUserDialog', false);
    },
    saveChanges() {
      if (!this.hasChanges) return;

      const user = {
        name: this.newUserData.name || '',
        lastName: this.newUserData.lastName || '',
        userName: this.user.userName
      };

      this.$store.dispatch('account/editUser', user)
        .then(() => {
          this.closeDialog();
          this.$store.dispatch('account/logout');
        })
        .catch((error) => console.log(error));
    }
  }
}
</script>