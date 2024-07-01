<template>
  <div class="ModalWrapper" @click.self="handleCloseModal()">
    <div class="Modal">
      <slot name="ModalContent"></slot>
    </div>
  </div>
</template>

<style scoped>
.ModalWrapper {
  position: fixed;

  display: flex;

  width: 100%;
  height: 100vh;

  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.7);

  z-index: 1000;
}

.ModalWrapper > .Modal {
  position: relative;

  width: fit-content;
  height: 90%;
  max-width: 90%;

  margin: auto;

  z-index: 1010;

  border-radius: 15px;
}

</style>

<style scoped>
@media (max-width: 480px) {
  .ModalWrapper {
    height: 100svh;
  }

  .ModalWrapper > .Modal {
    width: 100%;
    max-width: 100%;

    margin-top: 50px;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .ModalWrapper {
    height: 100svh;
  }

  .ModalWrapper > .Modal {
    width: 100%;
    max-width: 100%;

    margin-top: 50px;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
}
@media (min-width: 992px) and (max-width: 1400px) {
}
@media (min-width: 1400px) and (max-width: 1600px) {
}
@media (min-width: 1600px) {
}
</style>

<script>
// import { test } from '@/api/test.js'

export default {
  props: {
    handleCloseModal: {
      type: Function,
      default: () => {
        return null
      },
    },
  },
  name: 'ModalWindow',
  data() {
    return {
      show_modal: false,
    }
  },
  methods: {
    showModal() {
      this.show_modal = true
    },
    hideModal() {
      this.show_modal = false
    },
  },
}
</script>
