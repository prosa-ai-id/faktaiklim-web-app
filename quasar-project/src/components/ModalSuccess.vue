<template>
  <q-dialog id="modal-success" v-model="confirmSuccess" persistent>
    <q-card class="modal-card">
      <div>
        <img src="/images/success.svg" alt="Success" />
      </div>
      <div class="modal-label">Sukses</div>
      <div class="modal-text">
        {{ text }}
      </div>
      <div class="modal-button-container">
        <q-btn
          v-close-popup
          label="Ok"
          class="modal-button"
          @click="performSuccess()"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data: () => ({
    text: "",
    confirmSuccess: false,
  }),
  methods: {
    performSuccess() {
      this.$emit("click");
    },
  },
};
</script>

<style>
#modal-success {
  .modal-card {
    width: 467px;
    padding: 30px;
    text-align: center;
    border-radius: 15px;
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
