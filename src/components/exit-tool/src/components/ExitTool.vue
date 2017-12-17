<template>
  <v-container fluid>
    <v-fab-transition>
      <v-btn
        icon
        medium
        fixed
        top
        left
        fab
        slot="activator"
        @click.native.stop="setDialogOpen(true)"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog
      :value="dialogOpen"
      @input="setDialogOpen"
      max-width="500px"
    >
      <v-card class="pa-3">
        <v-card-title class="headline">{{ label }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink darken-1" flat="flat" @click.native="setDialogOpen(false)">Cancel</v-btn>
          <v-btn color="pink darken-1" flat="flat" @click.native="onConfirm">Leave</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: [
    'label',
    'dialogOpen',
    'setDialogOpen',
    'onConfirm'
  ]
}
</script>
