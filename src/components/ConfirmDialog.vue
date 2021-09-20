<!--
Source: https://techformist.com/reusable-confirmation-dialog-vuetify/
 -->
<template>
    <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <template v-slot:activator="{ on, attrs }">
            <v-btn
            class="ma-2"
            color="indigo"
            dark
            v-bind="attrs"
            v-on="on"
            >
            <v-icon v-if="!!btnIcon && btnIcon.length > 0">{{btnIcon}}</v-icon>
            <span v-if="!!btnText && btnText.length > 0">{{btnText}}</span>
            </v-btn>
    </template>
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold --text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="pa-4 black--text"
        v-html="message"
      ></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!options.noconfirm"
          color="grey"
          outlined
          class="body-2 font-weight-bold"
          @click.native="cancel"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          class="body-2 font-weight-bold"
          outlined
          @click.native="agree"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: 'ConfirmDialog',
    props:{
        title: String,
        message: String,
        btnText: String,
        btnIcon: String
    },
    data: function () {
        return {
            dialog: false,                       
            options: {
                color: "red lighten-1",
                width: 400,
                zIndex: 200,
                noconfirm: false
            }
        };
    },
    methods: {
        agree() {
            //this.resolve(true);
            this.$emit('dialog-close', true);
            this.dialog = false;
        },
        cancel() {
            //this.resolve(false);
            this.$emit('dialog-close', false);
            this.dialog = false;
        }
    }
}
</script>