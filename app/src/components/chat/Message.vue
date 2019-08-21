<template>
  <div class="flex items-start mb-2 text-sm pb-2 message-container">
    <img
      :src="imgUrl"
      class="w-10 h-10 rounded mr-3"
    />
    <div class="flex-1 overflow-hidden">
      <div class="flex justify-between">
        <span class="font-bold">
          {{ fullName }}
          <span class="font-normal">
            ({{ userName }})
          </span>  
        </span>
        <span class="text-grey text-xs">{{ messageDate }}</span>
      </div>
      <p
        class="text-black leading-normal"
      >{{ messageText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message-component',
  props: {
    imgUrl: {
      type: String,
      default: 'https://colewest.com/wp-content/uploads/2016/12/user-placeholder.jpg'
    },
    userName: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    messageText: {
      type: String,
      default: ''
    },
    messageMedia: {
      default: null
    },
    messageDate: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  
</style>