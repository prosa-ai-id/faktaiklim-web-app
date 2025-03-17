<template>
  <section class="cta-section">
    <div class="cta-panel">
      <div class="cta-container">
        <div>
          <div class="cta-text">
            Lawan Misinformasi Iklim Bersama! Cek informasi langsung melalui
            chatbot Telegram kami atau laporkan temuan Anda
          </div>
          <div class="cta-button">
            <q-btn flat class="cta-button-analysis" @click="chatbot()">
              CEK CHATBOT
            </q-btn>
            <q-btn flat class="cta-button-report" @click="report()">
              LAPORKAN TEMUAN
            </q-btn>
          </div>
        </div>
        <div class="cta-image-container">
          <img src="/images/cta.svg" alt="CTA Image" class="cta-image" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    chatbot() {
      window.open(process.env.TELEGRAM_CHATBOT_URL);
    },
    report() {
      this.$router.push("/report");
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  .cta-section {
    margin-top: 30px;
    padding: 0 30px;
    background-color: white;
  }
  .cta-panel {
    max-width: 768px;
    margin: auto;
  }
  .cta-container {
    max-width: 768px;
    min-height: 137px;
    background: linear-gradient(180deg, #015198 0%, #000f47 100%);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0 15px;
  }
  .cta-text {
    max-width: 400px;
    margin-top: 15px;
    font-family: "Montserrat Bold";
    font-size: 12px;
    line-height: 18px;
  }
  .cta-button {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    gap: 15px;
  }
  .cta-button-analysis {
    width: 125px;
    background-color: white;
    color: var(--primary-color);
    border-radius: 5px;
    font-family: "Montserrat Bold";
    font-size: 10px;
    line-height: 12px;
    padding: 8px 11px;
  }
  .cta-button-report {
    width: 125px;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    font-family: "Montserrat Bold";
    font-size: 10px;
    line-height: 12px;
    padding: 8px 0;
  }
  .cta-image-container {
    padding-top: 10px;
  }
  .cta-image {
    height: 120px;
  }
}

@media (min-width: 769px) {
  .cta-section {
    margin-top: 60px;
    background-color: white;
    padding: 0 60px;
  }
  .cta-panel {
    max-width: 1227px;
    margin: auto;
  }
  .cta-container {
    max-width: 1227px;
    min-height: 267px;
    background: linear-gradient(180deg, #015198 0%, #000f47 100%);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0 50px;
  }
  .cta-text {
    margin-top: 50px;
    font-family: "Montserrat Bold";
    font-size: 26.28px;
    line-height: 35px;
  }
  .cta-button {
    margin-top: 39px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    gap: 30px;
  }
  .cta-button-analysis {
    width: 165px;
    background-color: white;
    color: var(--primary-color);
    border-radius: 5px;
    font-family: "Montserrat Bold";
    font-size: 16px;
    line-height: 19.5px;
    padding: 16px 0px;
  }
  .cta-button-report {
    width: 209px;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    font-family: "Montserrat Bold";
    font-size: 16px;
    line-height: 19.5px;
    padding: 16px 0px;
  }
  .cta-image-container {
    padding-top: 15px;
  }
}
</style>
