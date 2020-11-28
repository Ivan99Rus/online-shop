<template>
  <div 
    class="v-popup__wrapper"
    ref="popupWrapper"
  >
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{ popupTitle }}</span>
        <span>
          <i class="material-icons"
            @click="closePopup"
          >
            close
          </i>
        </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button 
          class="v-popup__close btn"
          @click="closePopup"
        >
          Close
        </button>
        <button 
          class="v-popup__submit btn"
          @click="rightButtonAction"
        >
          {{ rightButtonTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'v-popup',
  components: {},
  props: {
    rightButtonTitle: {
      type: String,
      default() {
        return 'Ok'
      }
    },
    popupTitle: {
      type: String,
      default() {
        return 'Popup name'
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    rightButtonAction() {
      this.$emit('rightButtonAction')
      this.closePopup()
    }
  },
  watch: {},
  mounted() {
    document.addEventListener('click', 
      (item) => item.target === this.$refs['popupWrapper'] ? this.closePopup() : ':)'
    )
  }
}
</script>

<style lang="scss">
  .v-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    &__wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(#e7e7e7, 0.4);
    }
    &__header,
    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__submit {
      padding: 8px;
      color: #ffffff;
      background-color: #26ae68;
    }
    &__close {
      padding: 8px;
      color: #ffffff;
      background-color: red;
    }
  }
  .btn {
    border: none;
    cursor: pointer;
  }
</style>
