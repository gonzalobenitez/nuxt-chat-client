<script>
import uuid from 'uuid'

export default {
  fetch({ params, redirect }) {
    redirect(`/channel/${uuid.v4()}`)
  }
}
</script>
