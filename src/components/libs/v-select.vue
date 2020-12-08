<template>
  <div class="v-select">
    <p 
      class="v-select__title"
      @click="isVisible = !isVisible"
    >
      {{ selected }}
    </p>
    <div 
      class="v-select__options"
      v-if="isVisible"
    >
      <p class="v-select__options-item"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'v-select',
  components: {},
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    selected: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  computed: {},
  methods: {
    selectOption(option) {
      this.$emit('select', option);
      this.hideSelectOptions();
    },
    hideSelectOptions() {
      this.isVisible = false;
    }
  },
  watch: {},
  mounted() {
    document.addEventListener('click', this.hideSelectOptions.bind(this), true)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSelectOptions)
  }
}
</script>

<style lang="scss">
  .v-select {
    position: relative;
    width: 200px;
    &__title {
      border: 1px solid #aeaeae;
      cursor: pointer;
    }
    &__options {
      position: absolute;
      top: 25px;
      right: 0;
      width: 100%;
      border: 1px solid #aeaeae;
      background-color: #fff;
      &-item {
        margin: 0;
        cursor: pointer;
        &:hover {
          background: #E7E7E7;
        }
      }
    }
  }
</style>
