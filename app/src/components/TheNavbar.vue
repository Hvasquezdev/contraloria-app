<template>
  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div class="container">
      <a class="navbar-brand" href="index.html">Contraloria</a>

      <div class="collapse navbar-collapse" id="ftco-nav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active"><router-link to="/" tag="a" class="nav-link">Inicio</router-link></li>
          <!-- <li class="nav-item"><a href="#" class="nav-link">Mision</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Vision</a></li> -->
          <li class="nav-item cta"><router-link to="/register" class="nav-link"><span>Registrarse</span></router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'the-navbar',
}
</script>


<style lang="scss">
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

nav .container {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-between;
}

.nav-link {
  font-size: 16px;
  padding-top: .9rem;
  padding-bottom: .9rem;
  padding-left: 20px;
  padding-right: 20px;
  color: #f0f0f0;
  font-weight: 400;
  opacity: 1 !important;
}

.ftco-navbar-light {
	background: transparent!important;
	position: absolute;
	left: 0;
	right: 0;
	z-index: 15;
	top: 30px;

	.navbar-brand {
		color: #fff;
	}
	
	.navbar-nav {
    display: flex;
    align-items: center;

		> .nav-item {
			> .nav-link {
				font-size: 16px;
				padding-top: .9rem;
				padding-bottom: .9rem;
				padding-left: 20px;
				padding-right: 20px;
				color: darken(#fff, 6%);
				font-weight: 400;
				&:hover {
					color: #fff;
				}
				opacity: 1!important;
			}

			.dropdown-menu{
				border: none;
				background: #fff;
				-webkit-box-shadow: 0px 10px 34px -20px rgba(0,0,0,0.41);
				-moz-box-shadow: 0px 10px 34px -20px rgba(0,0,0,0.41);
				box-shadow: 0px 10px 34px -20px rgba(0,0,0,0.41);
			}

			
			&.ftco-seperator {
				position: relative;
				margin-left: 20px;
				padding-left: 20px;

				&:before {
					position: absolute;
					content: "";
					top: 10px;
					bottom: 10px;
					left: 0;
					width: 2px;
					background: rgba(#fff, .05);
				}
			}
			&.cta {
				> a {
					color: #fff;
					border: 1px solid rgba(255,255,255,.3);
					padding-top: .5rem;
					padding-bottom: .5rem;
					padding-left: 20px;
					padding-right: 20px;
					margin-top: 4px;
          transition-duration: .2s;
					@include border-radius(30px);
					span {
						display: inline-block;
					}
          &:hover {
            background: #fff;
            color: #7474bf;
            border-color: rgba(255,255,255,1);
          }
				}
				&.cta-colored {
					span {
						border-color: #ee76ad;
					}
				}
			}
			&.active {
				> a {
					color: rgba(255,255,255,.5);
				}
			}
		}
	}
	.navbar-toggler {
		border: none;
		color: rgba(255,255,255,.5)!important;
		cursor: pointer;
		padding-right: 0;
		text-transform: uppercase;
		font-size: 16px;
		letter-spacing: .1em;
	}
	
	&.scrolled  {
		position: fixed;
		right: 0;
		left: 0;
		top: 0;
		margin-top: -130px;
		background: #fff!important;
		box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
		.nav-item {
			&.active {
				> a {
					color: #ee76ad!important;
				}
			}
			&.cta {
				> a {
					color: #fff !important;
					background: #ee76ad;
					border: none !important;
					padding-top: .5rem!important;
					padding-bottom: .5rem !important;
					padding-left: 20px;
					padding-right: 20px;
					margin-top: 6px !important;
					@include border-radius(30px);
					span {
						display: inline-block;
					}
				}
				&.cta-colored {
					span {
						border-color: #ee76ad;
					}
				}
			}
		}

		.navbar-toggler {
			border: none;
			color: rgba(0,0,0,.5)!important;
			border-color: rgba(0,0,0,.5)!important;
			cursor: pointer;
			padding-right: 0;
			text-transform: uppercase;
			font-size: 16px;
			letter-spacing: .1em;

		}
		.nav-link {
			padding-top: .9rem!important;
			padding-bottom: .9rem!important;
			color: #363636!important;
			&.active {
				color: #ee76ad!important;
			}
		}
		&.awake {
			margin-top: 0px;
			transition: .3s all ease-out;
		}
		&.sleep {
			transition: .3s all ease-out;	
		}

		.navbar-brand {
			color: #363636;
		}
	}
}

.navbar-brand {
	font-weight: 700;
	line-height: 1;
	font-size: 20px;
	text-transform: uppercase;
}
</style>
