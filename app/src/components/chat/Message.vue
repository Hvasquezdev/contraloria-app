<template>
  <div class="flex items-start mb-2 text-sm pb-2 message-container">
    <img
      :src="imgUrl"
      class="w-10 h-10 rounded mr-3"
    />
    <div class="flex-1 overflow-hidden">
      <div class="flex justify-between">
        <span class="font-bold capitalize font-dark-blue">
          {{ fullName }}
          <span class="font-normal">
            ({{ userName }})
          </span>  
        </span>
        <span class="text-grey text-xs">{{ messageDate | messageDate }}</span>
      </div>
      <p
        class="text-black leading-normal"
      >{{ messageText }}</p>
      <div class="media-content" v-if="hasMedia && messageMedia.size">
        <span class="media-content-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z"/></svg>
        </span>
        <div class="media-content-info">
          <span class="name">{{ messageMedia.originalname }}</span>
          <span class="size">{{ messageMedia.size | bytesToSize }}</span>
        </div>

        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center media-content-download ml-auto">
          <svg class="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        </button>
      </div>
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
    messageDate: {
      type: String,
      required: true
    },
    hasMedia: {
      type: Number,
      default: 0
    },
    hasText: {
      type: Number,
      default: 0
    },
    channelMessageId: {
      type: Number,
      required: true,
    }
  },
  filters: {
    messageDate: function (value) {
      if (!value) return '';
      value = Date.parse(value);
      return new Date(value).toLocaleDateString();
    },
    bytesToSize: function (bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
  },
  data() {
    return {
      messageMedia: {},
    }
  },
  mounted() {
    if(this.hasMedia) {
      fetch(`http://localhost:3001/message/media/${this.channelMessageId}`)
        .then(response => response.json())
        .then(data => this.messageMedia = data[0]);
    }
  },
}
</script>

<style lang="scss" scoped>
.media-content {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #3636362b;
  border-radius: 4px;
  margin-top: 5px;
}
.media-content-icon {
  width: 40px;
}
.media-content-icon svg {
  fill: #073042;
}
.media-content-info {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  justify-content: space-between;
}
.media-content-info .name {
  font-size: 15px;
  font-weight: bold;
}
.media-content-info .size {
  color: #3636369a;
}
</style>