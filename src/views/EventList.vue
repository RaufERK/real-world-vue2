<template>
  <div class="event-list">
    <h2>Event for {{ user.user.name }}</h2>
    <h6>totalEvents: {{ event.totalEvents }} lastPage: {{ lastPage }}</h6>
    <EventCard
      v-for="event in event.events"
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
    this.fetchEvents({ perPage: this.perPage, page: this.page })
  },
  computed: {
    perPage() {
      return 2
    },
    lastPage() {
      return Math.ceil(this.event.totalEvents / this.perPage)
    },
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user']),
    ...mapState('notification', ['notifications']),
  },
  methods: {
    ...mapActions('event', ['fetchEvents']),
  },
}
</script>
