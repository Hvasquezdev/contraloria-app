<template>
  <default-layout class="home-page">
    <div class="hero-wrap">
      <div class="overlay"></div>
      <div id="particles-js"></div>
      <div class="container">
        <div class="slider-text">
          <div class="hero-content ftco-animate text-center">
            <h1 class="mb-4">
              Contraloria Municipal de Heres <br>
              <strong>Intranet</strong>
            </h1>
            <p>
              <a href="#" class="btn btn-primary btn-outline-white px-5 py-3">Iniciar Sesion</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/Default.vue";

export default {
  name: "home",
  components: {
    DefaultLayout
  },
  mounted() {
    require('particles.js');
    this.$nextTick(() => {
      this.initParticlesJS()
    });
  },
  methods: {
    initParticlesJS () {
      /* eslint-disable */
      particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 700
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  },
};
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
}

.hero-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
