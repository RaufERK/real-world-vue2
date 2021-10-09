<template>
  <div class="event-list">
    <h1>EVENT LIST</h1>
    <template v-if="events.length">
      <EventCard
        v-for="event in events"
        :key="event.id"
        name="users"
        :event="event"
      />
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import EventServises from '@/services/EventServises.js'

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    }
  },
  created() {
    EventServises.getEvents()
      .then(({ data }) => {
        this.events = data
      })
      .catch((error) => console.log(error))
  },
}
</script>

<style></style>
