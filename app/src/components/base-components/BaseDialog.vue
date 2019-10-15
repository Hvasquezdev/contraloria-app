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
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-modal',
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
  },
}
</script>

<style lang="scss">
.modal-container {
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,.16);
}
</style>
