<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="grey"
    >
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon @click="showSideBar = !showSideBar"></v-app-bar-nav-icon>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-toolbar-title>BookStore App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-for="link in links"
          :key="link.label"
          text
          :to="link.link"
        >
        {{link.label}}
        </v-btn>
        
      </v-container>
    </v-app-bar>
    <SideBar :sideLinks="sideLinks" :show="showSideBar"/>
    <v-main class="grey lighten-2">
      <v-container>
        <!-- -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import SideBar from './components/SideBar.vue'

  export default {
    data: () => ({
      links: [],
      sideLinks: [ 
          {
            label: 'Home',
            link: '/'
          },
          {
            label: 'Browse',
            link: '/browse-bookstore'
          },          
          {
            label: 'About',
            link: '/about'
          }
      ],
      showSideBar: true
    }),
    components: {SideBar}
  }
</script>

<style>
.browselink a {
  text-decoration: none;
}
</style>