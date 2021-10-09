<template>
  <div class="icon-wrapper">
    <div class="icon" v-html="svg"></div>
    <slot name="digit"></slot>
    <slot></slot>
  </div>
</template>

<script>
import feather from 'feather-icons'
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: 'meh',
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
  },
  computed: {
    svg() {
      return feather.icons[this.name].toSvg({
        class: 'icon',
        width: this.width,
        height: this.height,
      })
    },
  },
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
  margin-right: 6px;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
