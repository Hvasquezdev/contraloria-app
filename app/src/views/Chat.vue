<template>
  <div class="font-sans antialiased h-screen flex" v-if="user">
    <!-- Sidebar / channel list -->
    <chat-sidebar :user="user"></chat-sidebar>

    <!-- Chat content -->
    <div class="flex-1 flex flex-col bg-white overflow-hidden">
      <!-- Top bar -->
      <chat-navbar></chat-navbar>
      <!-- Chat messages -->
      <div class="px-6 py-4 flex-1 overflow-y-scroll">
        <!-- A message -->
        <div class="flex items-start mb-4 text-sm">
          <img
            src="https://i.pravatar.cc/400"
            class="w-10 h-10 rounded mr-3"
          />
          <div class="flex-1 overflow-hidden">
            <div>
              <span class="font-bold">Steve Schoger</span>
              <span class="text-grey text-xs">11:46</span>
            </div>
            <p class="text-black leading-normal">The slack from the other side.</p>
          </div>
        </div>
        <!-- A message -->
        <div class="flex items-start mb-4 text-sm">
          <img
            src="https://i.pravatar.cc/400"
            class="w-10 h-10 rounded mr-3"
          />
          <div class="flex-1 overflow-hidden">
            <div>
              <span class="font-bold">Adam Wathan</span>
              <span class="text-grey text-xs">12:45</span>
            </div>
            <p
              class="text-black leading-normal"
            >How are we supposed to control the marquee space without an utility for it? I propose this:</p>
            <div
              class="bg-grey-lighter border border-grey-light text-grey-darkest text-sm font-mono rounded p-3 mt-2 whitespace-pre overflow-scroll"
            >
              .marquee-lightspeed { -webkit-marquee-speed: fast; }
              .marquee-lightspeeder { -webkit-marquee-speed: faster; }
            </div>
          </div>
        </div>
        <!-- A message -->
        <div class="flex items-start mb-4 text-sm">
          <img
            src="https://i.pravatar.cc/400"
            class="w-10 h-10 rounded mr-3"
          />
          <div class="flex-1 overflow-hidden">
            <div>
              <span class="font-bold">David Hemphill</span>
              <span class="text-grey text-xs">12:46</span>
            </div>
            <p class="text-black leading-normal">
              <a href="#" class="inline-block bg-blue-lightest text-blue no-underline">@Adam Wathan</a> the size of the generated CSS is creating a singularity in space/time, we must stop adding more utilities before it's too late!
            </p>
          </div>
        </div>
        <!-- A message -->
        <div class="flex items-start mb-4 text-sm">
          <img
            src="https://i.pravatar.cc/400"
            class="w-10 h-10 rounded mr-3"
          />
          <div class="flex-1 overflow-hidden">
            <div>
              <span class="font-bold">Steve Schoger</span>
              <span class="text-grey text-xs">11:46</span>
            </div>
            <p class="text-black leading-normal">The slack from the other side.</p>
          </div>
        </div>
      </div>
      <div class="pb-6 px-6 flex-none">
        <div class="flex rounded-lg border-2 border-grey overflow-hidden">
          <span class="text-3xl text-grey border-r-2 border-grey p-2">
            <svg
              class="fill-current h-6 w-6 block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
              />
            </svg>
          </span>
          <input type="text" class="w-full px-4" placeholder="Mensaje en #Nombre dep" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ChatNavbar = () => import('@/components/chat/Navbar.vue');
const ChatSidebar = () => import('@/components/chat/Sidebar.vue');

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.user = JSON.parse(localStorage.getItem('user'));
    });
  },
  name: 'chat-page',
  components: {
    ChatNavbar,
    ChatSidebar
  },
  data() {
    return {
      user: null,
    }
  },
};
</script>