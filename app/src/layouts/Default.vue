<template>
  <div class="default-layout">
    <the-navbar />
    <div class="hero-wrap">
      <div class="overlay"></div>
      <div class="container">
        <div class="slider-text">
          <div class="hero-content ftco-animate text-center">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';

export default {
  name: 'default-layout',
  components: {
    TheNavbar
  },
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,700,800);

@mixin gradient-background() {
  background: #7474bf;
  background: -moz-linear-gradient(
    45deg,
    #7474bf 0%,
    #348ac7 100%
  );
  background: -webkit-gradient(
    left bottom,
    right top,
    color-stop(0%, #7474bf),
    color-stop(100%, #348ac7)
  );
  background: -webkit-linear-gradient(
    45deg,
    #7474bf 0%,
    #348ac7 100%
  );
  background: -o-linear-gradient(
    45deg,
    #7474bf 0%,
    #348ac7 100%
  );
  background: -ms-linear-gradient(
    45deg,
    #7474bf 0%,
    #348ac7 100%
  );
  background: linear-gradient(
    45deg,
    #7474bf 0%,
    #348ac7 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#448ef6', endColorstr='#af05a9', GradientType=1 );
}

.hero-wrap {
  width: 100%;
  height: 100%;
  position: inherit;
  z-index: 0;
  font-family: "Work Sans", Arial, sans-serif;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    opacity: 0.97;
    @include gradient-background();
  }
  .container {
    height: 100vh;
    margin: auto;
  }
}

.hero-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  -o-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;

  &.btn-outline-white {
    border-color: rgba(255, 255, 255, 0.8);
    background: none;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    -ms-border-radius: 30px;
    border-radius: 30px;
    border-width: 2px;
    color: #fff;
  }

  &.px-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }

  &.py-3 {
    padding-bottom: 1rem !important;
    padding-top: 1rem !important;
  }

  &:hover {
    background: #fff;
    color: #7474bf;
  }
}

#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.slider-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  h1 {
    font-size: 55px;
    color: #fff;
    line-height: 1.2;
    font-weight: 200;
    strong {
      font-weight: 800;
    }
  }
  p {
    font-size: 20px;
    line-height: 1.5;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.8);
    strong {
      font-weight: 700;
      a {
        color: #000;
      }
    }
  }
}
</style>
