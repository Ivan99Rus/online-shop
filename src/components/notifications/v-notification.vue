<template>
  <div class="v-notification">
    <transition-group
      name="v-notification__animate"
      class="v-notification__messages-list"
    >
      <div 
        class="v-notification__content"
        v-for="message in messages"
        :key="message.id"
        :class="'v-notification__' + message.icon"
      >
        <div class="v-notification__content-info">
          <div class="v-notification__content-info-text">
            <div class="v-notification__name">{{ message.name }}</div>
            <div class="v-notification__icon">
              <i class="material-icons">{{ message.icon !== 'error' ? 'check_circle' : message.icon }}</i>
            </div>
          </div>
        </div>
        <div 
          class="v-notification__content-buttons"
          v-if="rightButton.length || leftButton.length"
        >
          <button 
            v-if="rightButton.length"
          >
            {{ rightButton }}
          </button>
          <button 
            v-if="leftButton.length"
          >
            {{ leftButton }}
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>

export default {
  name: 'v-notification',
  components: {},
  props: {
    messages: {
      type: Array,
      default() {
        return []
      }
    },
    rightButton: {
      type: String,
      default() {
        return ''
      }
    },
    leftButton: {
      type: String,
      default() {
        return ''
      }
    },
    timeout: {
      type: Number,
      default() {
        return 3000
      }
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    hideNotification() {
      if (this.messages.length) {
        setTimeout(() => {
          this.messages.pop()
        }, this.timeout)
      }
    }
  },
  watch: {
    messages() {
      this.hideNotification()
    }
  },
  mounted() {
    this.hideNotification()
  }
}
</script>

<style lang="scss">
  .v-notification {
    display: flex;
    flex-direction: column-reverse;
    position: fixed;
    top: 80px;
    right: 16px;
    z-index: 10;

    &__error {
      background: red;
    }
    &__warning {
      background: orange;
    }
    &__success {
      background: green;
    }

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 4px;
      color: #ffffff;
      &-info {
        &-text {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
    }

    &__animate {
      &-enter {
        transform: translateX(120px);
        opacity: 0;

        &-active {
          transition: all 0.6s ease;
        }
        &-to {
          opacity: 1;
        }
      }
      &-leave {
        height: 50px;
        opacity: 1;
        &-active {
          transition: transform 0.6s ease, opacity 0.6s, height 0.6s 0.2s;
        }
        &-to {
          height: 0;
          transform: translateX(120px);
          opacity: 0;
        }
      }
      &-move {
        transition: transform 0.6s;
      }
    }

  }
</style>
