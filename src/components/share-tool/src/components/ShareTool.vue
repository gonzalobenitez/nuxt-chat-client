<template>
  <v-container fluid>
    <v-tooltip right>
      <v-btn
        color="pink"
        dark
        large
        fixed
        bottom
        left
        fab
        slot="activator"
        @click.native.stop="setDialogOpen(true)"
      >
        <v-icon>share</v-icon>
      </v-btn> 
      <span>Copy to Clipboard</span>
    </v-tooltip>
    <v-dialog 
      :value="dialogOpen" 
      @input="setDialogOpen" 
      max-width="500px"
    >
      <v-card>
       <v-card-text>
          <v-text-field 
            ref="copy"
            :label="label"
            :value="value"
            readonly
            @focus="$event.target.select()"
            ></v-text-field>
       </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: [
    'label',
    'value',
    'dialogOpen',
    'setDialogOpen'
  ]
}
</script>
