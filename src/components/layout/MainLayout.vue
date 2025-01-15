<template>
<div class="main-layout">
  <button class="toggle-button" @click="toggleMenu">
    <div :class="['stripe', { active: !isCollapsed }]"></div>
    <div :class="['stripe', { active: !isCollapsed }]"></div>
    <div :class="['stripe', { active: !isCollapsed }]"></div>
  </button>
  <div class="layout">
    <header :class="{ collapsed: isCollapsed }">
      <div class="menu-bar" v-if="!isCollapsed">
        <img class="menu-bar-image" src="@/assets/my_photo.jpg" alt="Menu Image">
        <nav>
          <ul>
            <li><router-link to="/projects" class="menu-button" >Portfolio</router-link></li>
            <li><router-link to="/code" class="menu-button" >Code</router-link></li>
            <li><router-link to="/teaching" class="menu-button" >Teaching</router-link></li>
            <li><router-link to="/papers" class="menu-button" >Papers</router-link></li>
            <li><router-link to="/about" class="menu-button"  >About</router-link></li>
            
            <!-- <li v-if="isLoggedIn"><router-link to="/requests" class="menu-button">Requests</router-link></li>
            <li v-else>
              <router-link to="/auth" class="menu-button">Login</router-link>
            </li>
            <li v-if="isLoggedIn"><router-link to="/logout" class="menu-button" @click="logout">Logout</router-link></li> -->
          </ul>
        </nav>
      </div>
    </header>

    <main :class="{ collapsed: isCollapsed }">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">

         
          <p><strong>Dr. Petras Vestartas</strong></p>
          <p><br></p>
          <p><i class="fas fa-phone"></i> +41787261487</p>
          <p><i class="fas fa-envelope"></i> <a href="mailto:petrasvestartas@gmail.com">petrasvestartas@gmail.com</a></p>
        
        

      <!-- Programming languages -->
      <p>
        <i class="fab fa-cuttlefish"></i> C++ 
        <i class="fab fa-python"></i> Python 
        <i class="fab fa-microsoft"></i> C# 
        <!-- <i class="fab fa-rust"></i> Rust  -->
        <i class="fab fa-js"></i> JavaScript
      </p>

        </div>
        <div class="footer-left">
          <a href="https://github.com/petrasvestartas" target="_blank"><i class="fab fa-github"></i> GitHub </a>

          <a href="https://lt.linkedin.com/in/petras-vestartas-26450953" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn </a>
          <a href="https://scholar.google.com/citations?user=9Pqw0goAAAAJ&hl=en" target="_blank"><i class="fab fa-google"></i> Google Scholar </a>
          <a href="https://orcid.org/0000-0002-4428-1110" target="_blank"><i class="fab fa-orcid"></i> ORCID </a>
         

          <p class="address">
            <i class="fas fa-map-marker-alt"></i> Winkelriedstrasse 17, 
            St. Gallen, 9000,
            Switzerland.
          </p>
                <!-- Spoken languages -->
      <p>

<i class="fas fa-language"></i> English (Fluent), Lithuanian (Mother Tongue), German (B1)
</p>
        </div>
      </div>
    </footer>
    
  </div>
</div>
</template>


<script>
export default {
  name: 'MainLayout',
  computed: {
  isLoggedIn() {
    // console.log(this.$store.getters.isAuthenticated);
    return this.$store.getters.isAuthenticated;
  }
},
  data() {
    return {
      isCollapsed: true
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/projects');
    },
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
    },


    
  }
};
</script>

<style scoped>
.main-layout {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden; /* Prevent horizontal scroll */
}
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}



.menu-bar {

  margin-top: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.menu-bar-image {
  height: auto;
  width: 100%;
  max-width: 150px; /* Adjust this value to match the largest button width */
  display: block;
  margin-bottom: 1rem; /* Add margin to create offset */
}
.toggle-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.stripe {
  width: 100%;
  height: 0.25rem;
  background-color: #000; /* Default color */
  transition: background-color 0.3s;
}

.stripe.active {
  background-color: #ffffff; /* Lighter grey color when active */
}

header {
  display: inline-block; /* Adjust width based on content */
  height: 100vh;
  background: linear-gradient(to bottom, #000000, #000000); /* Gradient from black to grey */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  /* box-shadow: 1px 0 10px rgba(0, 0, 0, 0.5); */
  transition: transform 0.3s;
}


header.collapsed {
  transform: translateX(-10rem);
}

.toggle-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
}

header.collapsed .toggle-button {
  left: 1rem;
}

header a {
  text-decoration: none;
  color: rgb(255, 255, 255);
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s; /* Add transition for background and color */
}

a:active,
a:focus {
  background-color: #ffffff;
  color: black;
  transition: background-color 0.3s, color 0.3s; /* Ensure transition is applied */
}


@keyframes backgroundColorAnimation {
  0% {
    background-color: #424242; /* Dark color */
  }
  50% {
    background-color: #a3a3a3; /* Light color */
  }
  100% {
    background-color: #424242; /* Dark color */
  }
}

a.router-link-active{
  background-color: #ffffff;
  color: black;
  animation: backgroundColorAnimation 0.3s ease-in-out; /* Apply the animation */
  transition: color 0.3s; /* Ensure transition is applied */
}

a:hover {
  background-color: #424242;
  color: white;
  
}

a.active {
  background-color: #ffffff; /* Lighter color when active */
  color: black;
  transition: background-color 0.3s, color 0.3s; /* Ensure transition is applied */
}



h1 a,
h1 {
  font-weight: normal; /* Change font weight to normal */
  color: white;
  margin: 0;
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem; /* Add space below the h1 element */

}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  background-color: rgb(245, 245, 245);
}

header nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

li {
  width: 100%;
  margin: 0;
  padding: 0;
}

main {
  flex: 1;
  margin-left: 9.36rem;
  
  padding: 0rem;

}

main.collapsed {
  margin-left: 0;
  width: 100%;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to .route-leave-from {
  opacity: 1;
  transform: translateY(0);
}


.footer-top {
  background-color: #ffffff; /* Light grey background */
  color: #151515; /* Black text color */
  padding: 11px 1.5rem; /* Adjusted padding for top/bottom and right/left */
  font-size: 1.33rem; /* Adjusted font size to use rem units */
  font-weight: 600;
  font-style: oblique 5deg;
  margin-top: auto; /* Push footer to the bottom */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif; /* Use a beautiful web font */
  line-height: 1.5; /* Improve readability */
  letter-spacing: 0.80px; /* Add some spacing between letters */
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05); /* Subtle text shadow */
}

.footer {
  background-color: rgb(238, 238, 238);
  color: rgb(0, 0, 0);
  padding: 30px; /* Adjusted padding */
  text-align: right;
  font-size: 16px;
  margin-top: auto; /* Changed margin-top to auto */
}


.footer-content p {
  margin: 5px 0; /* Adjusted margin to make smaller gaps */
}
.footer-left a {
  color: black; /* Make email link black */
  text-decoration: none;
}
.footer-left a:hover {
  color: #ffffff; /* Change color on hover */
}
</style>