<template>
  <div class="event-list">
    <h1>Event Listening</h1>
    <h6>totalEvents: {{ totalEvents }} lastPage: {{ lastPage }}</h6>
    <EventCard
      v-for="event in events"
      :key="event.id"
      name="users"
      :event="event"
    />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >PREV</router-link
      >
    </template>
    |
    <template v-if="page != lastPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >NEXT</router-link
      >
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    EventCard,
  },
  created() {
    console.log('RUN!!!')
    this.fetchEvents({ perPage: this.perPage, page: this.page })
  },
  computed: {
    perPage() {
      return 2
    },
    lastPage() {
      return Math.ceil(this.totalEvents / this.perPage)
    },
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['events', 'totalEvents']),
  },
  methods: {
    ...mapActions(['fetchEvents']),
  },
}
</script>
