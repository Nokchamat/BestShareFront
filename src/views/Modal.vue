<template>
  <div class="container modal">

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">알림</h5>
            <button @click="closePop" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p> {{ modalData }}</p>
          </div>
          <div class="modal-footer">
            <button @click="closePop" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>

  </div>



</template>

<style>
div .modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
}
</style>

<script>

export default {
  props : {
    modalData: String
  },
  data() {
    return {
    }
  },
  methods: {
    closePop() {
      this.$emit('update:modalState', false);
    }
  }
}

</script>