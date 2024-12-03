<template>
  <q-dialog id="modal-failed" v-model="show" persistent>
    <q-card class="modal-card">
      <div>
        <img src="/images/error.svg" alt="Error" class="modal-image" />
      </div>
      <div class="modal-label">Gagal</div>
      <div class="modal-text">
        {{ text }}
      </div>
      <div class="modal-button-container">
        <q-btn v-close-popup label="Ok" class="modal-button" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data: () => ({
    text: "",
    show: false,
  }),
};
</script>

<style>
#modal-failed {
  .modal-card {
    width: 467px;
    padding: 30px;
    text-align: center;
    border-radius: 15px;
  }
  .modal-image {
    margin: 17px;
    width: 64px;
  }
  .modal-label {
    margin-top: 10px;
    font-family: "OpenSans Regular";
    font-size: 20px;
    font-weight: 600;
    line-height: 27.24px;
  }
  .modal-text {
    margin-top: 10px;
    font-size: 16px;
    line-height: 18.75px;
  }
  .modal-button-container {
    margin-top: 30px;
  }
  .modal-button {
    width: 114px;
    height: 46px;
    font-size: 16px;
    border-radius: 8px;
    background-color: #0465e4;
    color: white;
  }
}
</style>
