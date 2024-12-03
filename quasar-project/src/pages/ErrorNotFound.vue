<template>
  <div id="error404">
    <div class="row" style="height: 100vh">
      <div class="col-12 col-md-6 content">
        <img
          src="/images/404.png"
          alt="Error 404"
          style="width: 100%; margin: auto"
        />
      </div>
      <div class="col-12 col-md-6 content">
        <div class="text-1">Halaman Tidak Ditemukan</div>
        <div class="text-2">Kami akan mengarahkan Anda ke halaman utama</div>
        <q-btn color="action" class="button" @click="$goTo('/')">
          <div class="button-text">Kembali</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorNotFound",
};
</script>

<style>
@media (max-width: 768px) {
  #error404 {
    .content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .text-1 {
      font-family: "Ubuntu Bold";
      font-size: 37.5px;
      line-height: 43.0875px;
      color: #283892;
    }
    .text-2 {
      margin-top: 18px;
      font-size: 18px;
      line-height: 21.0975px;
    }
    .button {
      margin-top: 30px;
      width: 171px;
      height: 48px;
      padding: 0px;
      font-size: 20px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
      border-radius: 8px;
    }
    .button-text {
      margin-top: -4px;
      height: 48px;
      line-height: 48px;
    }
  }
}

@media (min-width: 769px) {
  #error404 {
    .content {
      padding: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .text-1 {
      font-family: "Ubuntu Bold";
      font-size: 50px;
      line-height: 57.45px;
      color: #283892;
    }
    .text-2 {
      margin-top: 24px;
      font-size: 24px;
      line-height: 28.13px;
    }
    .button {
      margin-top: 42px;
      width: 228px;
      height: 64px;
      padding: 0px;
      font-size: 30px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
      border-radius: 8px;
    }
    .button-text {
      height: 64px;
      line-height: 64px;
    }
  }
}
</style>
