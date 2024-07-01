<template>
  <div
    :class="{
      FlatButton: true,
      noselect: true,
      NotActive: !isActive,
      AnimationIfNotActive: !isActive && UseAnimationIfNotActive,
    }"
    @click="clickEvent"
  >
    {{ ButtonText }}
  </div>
</template>

<script>
export default {
  props: {
    ButtonText: {
      type: String,
      default: () => {
        return ''
      },
    },
    isActive: {
      type: Boolean,
      default: () => {
        return true
      },
    },
    SendCallback: {
      type: Function,
      default: () => {
        return () => {}
      },
    },
    UseAnimationIfNotActive: {
      type: Boolean,
      default: () => {
        return true
      },
    },
  },
  components: {},
  name: 'DefaultButton',
  // initialize components based on data attribute selectors
  mounted() {},
  methods: {
    clickEvent() {
      if (this.isActive) {
        this.SendCallback()
      }
    },
  },
}
</script>

<style scoped>
.FlatButton {
  position: relative;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;

  padding: 20px 32px;

  width: fit-content;
  min-width: 320px;

  border-radius: 10px;

  color: rgb(255, 255, 255);
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;

  background: rgb(0, 189, 197);

  transition-timing-function: ease-in;
  transition: 0.2s;
}
.FlatButton:hover {
  background: rgb(0, 209, 216);
}

.FlatButton.NotActive {
  cursor: default;
  background: rgb(0, 0, 0);
  opacity: 0.4;
}

.FlatButton.AnimationIfNotActive {
  background: linear-gradient(130deg, #000, rgb(13, 121, 126), #000);
  background-size: auto;
  background-size: auto;
  background-size: 200% 200%;

  animation: notActiveAnim 3s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
}

@keyframes notActiveAnim {
  0% {
    background-position: 10% 0%;
  }
  50% {
    background-position: 91% 100%;
  }
  100% {
    background-position: 10% 0%;
  }
}

@media (max-width: 480px) {
  .FlatButton {
    min-width: 0;
    width: 100% !important;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .FlatButton {
    min-width: 0;
    width: 100% !important;
  }
}
</style>
