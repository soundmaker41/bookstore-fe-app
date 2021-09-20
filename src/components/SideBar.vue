<template>
    <v-navigation-drawer
      v-model="show"
      app      
    >
      <v-list>
        <v-list-item v-for="slink in sideLinks"
                  :key="slink.label"
                  link>
            <v-list-item-content>
                <v-list-item-title>
                    <router-link  :to="slink.link"
                    tag="button"
                    >
                    {{slink.label}}
                    </router-link>                    
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "SideBar",
    props: {
        sideLinks: Array,
        show: Boolean
    }
}
</script>