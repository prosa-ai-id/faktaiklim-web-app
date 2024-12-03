<template>
  <q-layout id="layout">
    <q-header elevated class="header">
      <div class="container">
        <img
          src="/images/FaktaIklim/FaktaIklim_200px.svg"
          alt="Logo FaktaIklim"
          class="image"
          @click="$router.push('/')"
        />
        <q-btn-dropdown class="guide-button">
          <template #label>
            <q-icon name="description" color="primary" class="guide-icon" />
            <div class="guide-text">Download Panduan Penggunaan</div>
          </template>
          <q-list class="list-text">
            <q-item
              clickable
              v-close-popup
              @click="
                get(
                  '[Indonesia] Panduan Penggunaan Website dan Chatbot Deteksi Misinformasi Iklim.pdf'
                )
              "
            >
              <q-item-section>
                <q-item-label>Bahasa Indonesia</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="
                get(
                  '[Minangkabau] Panduan Penggunaan Website dan Chatbot Deteksi Misinformasi Iklim.pdf'
                )
              "
            >
              <q-item-section>
                <q-item-label>Bahasa Minangkabau</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="
                get(
                  '[Bali] Panduan Penggunaan Website dan Chatbot Deteksi Misinformasi Iklim.pdf'
                )
              "
            >
              <q-item-section>
                <q-item-label>Bahasa Bali</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="
                get(
                  '[Bugis] Panduan Penggunaan Website dan Chatbot Deteksi Misinformasi Iklim.pdf'
                )
              "
            >
              <q-item-section>
                <q-item-label>Bahasa Bugis</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data: () => ({
    componentKey: 0,
  }),
  methods: {
    get(name) {
      this.$download("/documents/" + name, name);
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  #layout {
    .header {
      padding: 0px 5px;
      min-height: 66px;
      line-height: 66px;
      background-color: white;
      color: black;
      box-shadow: 0px 0px 30px rgba(0, 133, 198, 0.3);
      position: fixed;
    }
    .container {
      min-height: 66px;
      margin: auto;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    .image {
      height: 50px;
      cursor: pointer;
    }
    .guide-button {
      height: 30px;
      padding: 0 10px !important;
      border-radius: 8px;
      box-shadow: 2px 9px 10px 0px #00000024;
    }
    .guide-icon {
      font-size: 20px;
      top: -2px;
    }
    .guide-text {
      margin-left: 5px;
      font-weight: 400;
      font-size: 12px;
    }
  }
  .list-text {
    font-size: 10px;
  }
}

@media (min-width: 769px) {
  #layout {
    .header {
      padding: 0px 60px;
      height: 98px;
      line-height: 98px;
      background-color: white;
      color: black;
      box-shadow: 0px 0px 30px rgba(0, 133, 198, 0.3);
      position: fixed;
    }
    .container {
      max-width: 1720px;
      height: 98px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .image {
      height: 100px;
      cursor: pointer;
    }
    .guide-button {
      height: 60px;
      padding: 0 20px !important;
      border-radius: 8px;
      box-shadow: 2px 9px 10px 0px #00000024;
    }
    .guide-icon {
      font-size: 36px;
    }
    .guide-text {
      margin-left: 20px;
      font-weight: 400;
      font-size: 18px;
    }
  }
  .list-text {
    font-size: 14px;
  }
}
</style>
