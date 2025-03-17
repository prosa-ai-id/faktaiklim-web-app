<template>
  <div id="search">
    <section class="search-section">
      <div class="search-panel">
        <BreadcrumbsComponent
          first="Home Page"
          first-link="/"
          second="Hasil Pencarian"
        />
        <div class="search-container">
          <div class="search-bar">
            <div class="search-input-container">
              <div
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
              >
                <q-input
                  ref="keywords"
                  v-model="keywords"
                  borderless
                  placeholder="Cari"
                  input-class="search-input"
                  @keyup.enter="search"
                  @update:model-value="warning = false"
                />
              </div>
            </div>
            <div class="search-button-container">
              <q-btn
                flat
                icon="search"
                :disable="!keywords.trim()"
                class="search-button"
                @click="search"
              />
            </div>
            <div v-if="warning" class="search-warning">
              Mohon masukkan minimal 3 kata untuk melanjutkan
            </div>
          </div>
          <section v-if="show && ready" class="result-section">
            <div class="result-panel">
              <div class="result-text">
                <span v-if="totalData && statusHoax"> Menampilkan </span>
                <span v-else> Tidak ada </span>
                hasil pencarian
                <b
                  >"<span class="highlight">{{ text }}</span
                  >"</b
                >
              </div>
              <div v-if="totalData && statusHoax">
                <div v-if="statusHoax === 'not-valid'">
                  <div class="not-valid-container">
                    <div class="not-valid-header">
                      <img src="images/search.svg" class="not-valid-image" />
                      <div class="not-valid-title">
                        Hasil Analisis Tidak Ditemukan
                      </div>
                    </div>
                    <div class="not-valid-content">
                      <div class="not-valid-content-title">
                        "{{ notValid.title }}"
                      </div>
                      <div class="not-valid-content-subtitle">
                        Mohon maaf, kueri yang Anda masukkan tampaknya tidak
                        valid. Silakan masukkan kueri kembali.
                      </div>
                    </div>
                  </div>
                  <div class="not-valid-content-info">
                    <div class="not-valid-content-group">
                      <div class="not-valid-content-header">
                        Tentang FaktaIklim:
                      </div>
                      <div class="not-valid-content-description">
                        FaktaIklim adalah platform yang dirancang untuk
                        memeriksa informasi terkait iklim, apakah informasi
                        tersebut merupakan hoaks atau bukan.
                      </div>
                    </div>
                    <div class="not-valid-content-group">
                      <div class="not-valid-content-header">
                        Contoh Kueri yang Valid:
                      </div>
                      <div class="not-valid-content-description">
                        <ul class="not-valid-content-list">
                          <li>
                            "Pemanasan global menyebabkan peningkatan suhu
                            bumi."
                          </li>
                          <li>
                            "Dampak perubahan iklim terhadap pertanian sangat
                            signifikan."
                          </li>
                          <li>
                            "Es di Antartika mencair akibat pemanasan global."
                          </li>
                          <li>
                            "Mengurangi jejak karbon dapat membantu mengatasi
                            perubahan iklim."
                          </li>
                        </ul>
                      </div>
                      <div class="not-valid-content-description">
                        Jika kueri Anda sudah berkaitan dengan iklim namun masih
                        terdeteksi sebagai tidak valid, silakan laporkan kendala
                        Anda kepada kami.
                      </div>
                    </div>
                    <div class="not-valid-info">
                      <div class="not-valid-info-cta">
                        Silakan laporkan kendala Anda
                        <q-btn
                          flat
                          class="not-valid-info-cta-button"
                          @click="report()"
                        >
                          LAPORKAN
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="statusHoax === 'not-hoax'"
                  class="not-hoax-container"
                >
                  <div class="not-hoax-header">
                    <q-icon name="check_circle" class="not-hoax-icon" />
                    <div class="not-hoax-title">Hasil Analisis Informasi</div>
                  </div>
                  <div class="not-hoax-content">
                    <div class="not-hoax-content-title">
                      "{{ notHoax.title }}"
                    </div>
                    <div class="not-hoax-content-article">
                      [{{ notHoax.timestamp }}] Berdasarkan referensi pada
                      database kami saat ini, informasi yang Anda masukkan
                      <b>tidak terdeteksi sebagai hoaks</b>. Namun tetap
                      disarankan untuk memeriksa sumber-sumber terpercaya. Di
                      bawah ini merupakan artikel yang berkaitan dengan
                      informasi yang Anda masukkan.
                    </div>
                    <div class="not-hoax-content-topic">
                      Topik:
                      <div class="not-hoax-content-list-topic">
                        <div
                          v-for="(item2, index) in notHoax.topic"
                          :key="index"
                          class="not-hoax-content-box-topic"
                        >
                          {{ item2 }}
                        </div>
                      </div>
                    </div>
                    <div class="not-hoax-info">
                      <div class="not-hoax-info-cta">
                        Hasil analisis ini tidak sesuai?
                        <q-btn
                          flat
                          class="not-hoax-info-cta-button"
                          @click="reportNotHoax()"
                        >
                          LAPORKAN
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="statusHoax == 'hoax'" class="yes-hoax-container">
                  <div class="yes-hoax-header">
                    <q-icon name="cancel" class="yes-hoax-icon" />
                    <div class="yes-hoax-title">Hasil Analisis Informasi</div>
                  </div>
                  <div class="yes-hoax-content">
                    <div class="yes-hoax-content-title">
                      "{{ yesHoax.title }}"
                    </div>
                    <div class="yes-hoax-content-article">
                      [{{ yesHoax.timestamp }}] Berdasarkan referensi pada
                      database kami saat ini, informasi yang Anda masukkan
                      tampaknya
                      <b
                        >kurang sesuai dengan data fakta yang ada dan
                        {{ yesHoax.text }}</b
                      >. Harap berhati-hati dan cek kembali sumber sumber
                      terpercaya untuk memastikan. Di bawah ini merupakan
                      artikel yang berkaitan dengan informasi yang Anda
                      masukkan.
                    </div>
                    <div class="yes-hoax-content-topic">
                      Topik:
                      <div class="yes-hoax-content-list-topic">
                        <div
                          v-for="(item2, index) in yesHoax.topic"
                          :key="index"
                          class="yes-hoax-content-box-topic"
                        >
                          {{ item2 }}
                        </div>
                      </div>
                    </div>
                    <div class="not-hoax-info">
                      <div class="yes-hoax-info-cta">
                        Hasil analisis ini tidak sesuai?
                        <q-btn
                          flat
                          class="yes-hoax-info-cta-button"
                          @click="reportYesHoax()"
                        >
                          LAPORKAN
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="totalData && statusHoax && statusHoax !== 'not-valid'"
                class="result-caption"
              >
                Hasil di atas merujuk pada artikel berikut
              </div>
              <div
                v-if="totalData && statusHoax && statusHoax !== 'not-valid'"
                class="result-container"
              >
                <q-card
                  v-for="item in tableData"
                  :key="item.id"
                  class="result-card"
                  @click="goTo(item.source)"
                >
                  <div class="result-title">
                    {{ item.title }}
                  </div>
                  <div class="result-article">
                    {{ item.article }}
                  </div>
                  <div class="result-topic">
                    Topik:
                    <div class="result-list-topic">
                      <div
                        v-for="(item2, index) in item.topic"
                        :key="index"
                        class="result-box-topic"
                      >
                        {{ item2 }}
                      </div>
                    </div>
                  </div>
                  <div class="result-info">
                    <div class="result-info-cta">
                      Artikel ini tidak sesuai?
                      <q-btn
                        flat
                        class="result-info-cta-button"
                        @click="
                          (e) => {
                            e.stopPropagation();
                            reportArticle(item.title, item.topic);
                          }
                        "
                      >
                        LAPORKAN
                      </q-btn>
                    </div>
                    <div class="result-info-date"></div>
                  </div>
                </q-card>
              </div>
            </div>
            <div
              v-if="totalData && statusHoax && statusHoax !== 'not-valid'"
              v-show="maxPages"
              class="pagination-container"
            >
              <div class="pagination-wrapper">
                <div class="pagination-info">
                  {{ recordStart }} - {{ recordEnd }} dari {{ recordTotal }}
                </div>
                <div>
                  <q-pagination
                    ref="pagination"
                    v-model="currentPage"
                    :max="maxPages"
                    :max-pages="5"
                    boundary-numbers
                    direction-links
                    ellipses
                    rounded
                    @click="goToPage()"
                  />
                </div>
              </div>
            </div>
          </section>
          <section v-else-if="show && !ready" class="result-section">
            <div class="result-panel">
              <div class="result-text">Sedang memuat...</div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <SectionCTA />
    <SectionCollaboration />
    <SectionFooter />
  </div>
</template>

<script>
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import SectionCTA from "components/SectionCTA.vue";
import SectionCollaboration from "components/SectionCollaboration.vue";
import SectionFooter from "components/SectionFooter.vue";
export default {
  components: {
    BreadcrumbsComponent,
    SectionCTA,
    SectionCollaboration,
    SectionFooter,
  },
  data: () => ({
    keywords: "",
    text: "",
    warning: false,
    totalData: 0,
    tableData: [],
    show: false,
    ready: false,
    currentPage: 1,
    maxPages: 1,
    recordStart: 0,
    recordEnd: 0,
    recordTotal: 0,
    statusHoax: "",
    notHoax: {},
    notValid: {},
    yesHoax: {},
    articleHoax: [],
  }),
  async mounted() {
    if (this.$search.keywords) {
      this.show = true;
      this.keywords = this.$search.keywords;
      this.text = this.$search.keywords;
      this.$search.keywords = "";
      await this.check();
    }
    setTimeout(() => {
      this.$refs.keywords.focus();
    }, 0);
  },
  methods: {
    async search() {
      const words = this.keywords
        .split(" ")
        .filter((item) => item.trim() !== "").length;
      if (words >= 3) {
        this.show = true;
        this.text = this.keywords;
        await this.check();
      } else {
        this.show = false;
        this.warning = true;
      }
    },
    async check() {
      this.ready = false;
      const response = await this.$api({
        method: "post",
        url: "/api/article/check/",
        params: {
          text: this.text,
        },
      });
      const data = response.data.data;
      const topic = [];
      for (const [key, value] of Object.entries(data.topic.result.topic)) {
        topic.push(key);
      }
      if (data.hoax_probability < 0) {
        this.statusHoax = "";
      } else if (!topic.length) {
        this.statusHoax = "not-valid";
        this.notValid = {
          title: this.text,
        };
      } else if (data.hoax_probability == 0) {
        this.statusHoax = "not-hoax";
        this.notHoax = {
          title: this.text,
          topic: topic,
          timestamp: this.$moment().format("DD-MM-YYYY"),
        };
      } else {
        this.statusHoax = "hoax";
        this.yesHoax = {
          title: this.text,
          topic: topic,
          score: Math.round(data.hoax_probability * 100),
          text:
            data.hoax_probability < 0.5
              ? "kemungkinan kecil berpotensi sebagai hoaks"
              : data.hoax_probability < 0.8
              ? "cenderung berpotensi sebagai hoaks"
              : "kemungkinan besar berpotensi sebagai hoaks",
          timestamp: this.$moment().format("DD-MM-YYYY"),
        };
      }
      this.articleHoax = data.relevant_item;
      this.resultIssue(1);
      this.keywords = "";
      this.ready = true;
    },
    async resultIssue(page) {
      this.totalData = this.articleHoax.length;
      this.maxPages = Math.ceil(this.totalData / 5);
      this.currentPage = page;
      this.recordStart =
        this.totalData > 0 ? 5 * (this.currentPage - 1) + 1 : 0;
      this.recordEnd =
        this.totalData > 5 * this.currentPage
          ? 5 * this.currentPage
          : this.totalData;
      this.recordTotal = this.totalData;
      this.tableData = [];
      this.articleHoax.forEach((item, index) => {
        if (index + 1 >= this.recordStart && index + 1 <= this.recordEnd) {
          item.content = item.content.replace(/(<([^>]+)>)/gi, "");
          this.tableData.push({
            title: item.title,
            source: item.url,
            article:
              item.content.length > 300
                ? item.content.substr(0, 300) + "..."
                : item.content,
            topic: item.category ? item.category.split("\n") : "",
            date: this.$moment(item.created_at).format("DD-MM-YYYY"),
          });
        }
      });
    },
    goTo(url) {
      window.open(url);
    },
    goToPage() {
      this.resultIssue(this.currentPage);
    },
    report() {
      this.$router.push("/report");
    },
    reportNotHoax() {
      this.$report.active = true;
      this.$report.title = "Kesalahan hasil prediksi sistem";
      this.$report.source = "Website FaktaIklim";
      this.$report.narration =
        'Hasil prediksi sistem untuk kueri "<b>' +
        this.text +
        '</b>" tidak terdeteksi sebagai hoaks menurut saya kurang tepat karena ...';
      this.$report.topicList = [...this.notHoax.topic];
      this.$router.push("/report");
    },
    reportYesHoax() {
      this.$report.active = true;
      this.$report.title = "Kesalahan hasil prediksi sistem";
      this.$report.source = "Website FaktaIklim";
      this.$report.narration =
        'Hasil prediksi sistem untuk kueri "<b>' +
        this.text +
        '</b>" kemungkinan ' +
        this.yesHoax.score +
        "% hoaks menurut saya kurang tepat karena ...";
      this.$report.topicList = [...this.yesHoax.topic];
      this.$router.push("/report");
    },
    reportArticle(title, topicList) {
      this.$report.active = true;
      this.$report.title = "Artikel kurang tepat";
      this.$report.source = "Website FaktaIklim";
      this.$report.narration =
        'Artikel dengan judul "' +
        title +
        '" menurut saya kurang tepat karena ...';
      this.$report.topicList = [...topicList];
      this.$router.push("/report");
    },
    chatbot() {
      window.open(process.env.TELEGRAM_CHATBOT_URL);
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  #search {
    .search-section {
      background-color: white;
      padding: 20px;
      text-align: center;
    }
    .search-panel {
      max-width: 768px;
      margin: auto;
    }
    .search-container {
      margin-top: 10px;
      box-shadow: 2px 9px 10px 0px #0000001f;
    }
    .search-bar {
      width: 100%;
      padding: 30px;
      display: grid;
      grid-template-columns: auto 75px;
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__control {
        min-height: 46px !important;
        height: 46px !important;
      }
    }
    .search-input-container {
      border-radius: 100px;
      box-shadow: 2px 9px 10px 0px #0000001f;
    }
    .search-input {
      background-color: white;
      border-radius: 100px 0px 0px 100px;
      padding: 22px;
      font-size: 12px;
    }
    .search-button {
      width: 100%;
      height: 100%;
      background-color: #002b52;
      border-radius: 0px 100px 100px 0px;
      color: white;
      font-size: 14px;
    }
    .search-warning {
      margin-top: 8px;
      margin-left: 22px;
      text-align: left;
      font-size: 11px;
      color: red;
    }
    .result-section {
      padding: 20px;
      background-color: white;
      text-align: left;
    }
    .result-panel {
      max-width: 768px;
      margin: auto;
    }
    .result-text {
      font-size: 12px;
      line-height: 18px;
      .highlight {
        color: #2e68fd;
      }
    }
    .not-valid-container {
      margin-top: 15px;
      border-radius: 10px;
      overflow: hidden;
    }
    .not-valid-header {
      padding: 0 20px;
      background: linear-gradient(180deg, #969696 0%, #535353 100%);
      height: 38px;
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .not-valid-image {
      width: 18px;
    }
    .not-valid-title {
      font-weight: 700;
      font-size: 15px;
      color: #f2f2f2;
    }
    .not-valid-content {
      padding: 15px 20px;
      background-color: #f9f9f9;
    }
    .not-valid-content-title {
      font-weight: 700;
      font-size: 15px;
      line-height: 20px;
      color: #1f1f1f;
    }
    .not-valid-content-subtitle {
      margin-top: 10px;
      font-size: 12px;
      color: black;
    }
    .not-valid-content-info {
      padding: 0 20px;
    }
    .not-valid-content-group {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .not-valid-content-header {
      font-weight: 700;
      font-size: 10px;
      line-height: 15px;
      color: black;
    }
    .not-valid-content-description {
      margin-top: 3px;
      font-size: 10px;
      line-height: 15px;
      color: black;
    }
    .not-valid-content-list {
      margin-top: -2px;
      margin-bottom: 10px;
      padding-left: 20px;
    }
    .not-valid-info {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #1a59ad;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .not-valid-info-cta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 10px;
      row-gap: 5px;
      color: #484848;
      font-size: 10px;
    }
    .not-valid-info-cta-button {
      color: #0465e4;
      border: 1px solid #0465e4;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 10px;
    }
    .not-hoax-container {
      margin-top: 15px;
      border-radius: 10px;
      overflow: hidden;
    }
    .not-hoax-header {
      padding: 0 20px;
      background: linear-gradient(180deg, #015198 0%, #000f47 100%);
      height: 38px;
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .not-hoax-icon {
      font-size: 16px;
      color: #27cd58;
      top: -1px;
    }
    .not-hoax-title {
      font-weight: 700;
      font-size: 15px;
      color: #f2f2f2;
    }
    .not-hoax-content {
      padding: 15px 20px;
      background-color: #d9eeff;
    }
    .not-hoax-content-title {
      font-weight: 700;
      font-size: 15px;
      line-height: 20px;
      color: #1f1f1f;
    }
    .not-hoax-content-article {
      margin-top: 10px;
      font-size: 10px;
      line-height: 15px;
    }
    .not-hoax-content-topic {
      margin-top: 15px;
      font-size: 10px;
      line-height: 15px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: black;
    }
    .not-hoax-content-list-topic {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .not-hoax-content-box-topic {
      height: 15px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 10px;
      background-color: white;
    }
    .not-hoax-info {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #1a59ad;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .not-hoax-info-cta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 10px;
      row-gap: 5px;
      color: #484848;
      font-size: 10px;
    }
    .not-hoax-info-cta-button {
      color: #0465e4;
      border: 1px solid #0465e4;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 10px;
    }
    .yes-hoax-container {
      margin-top: 15px;
      border-radius: 10px;
      overflow: hidden;
    }
    .yes-hoax-header {
      padding: 0 20px;
      background: linear-gradient(180deg, #ea0616 0%, #720305 100%);
      height: 38px;
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .yes-hoax-icon {
      font-size: 16px;
      color: #e7e7e7;
      top: -1px;
    }
    .yes-hoax-title {
      font-weight: 700;
      font-size: 15px;
      color: #f2f2f2;
    }
    .yes-hoax-content {
      padding: 15px 20px;
      background-color: #ffefef;
    }
    .yes-hoax-content-title {
      font-weight: 700;
      font-size: 15px;
      line-height: 20px;
      color: #1f1f1f;
    }
    .yes-hoax-content-article {
      margin-top: 10px;
      font-size: 10px;
      line-height: 15px;
    }
    .yes-hoax-content-topic {
      margin-top: 15px;
      font-size: 10px;
      line-height: 15px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: black;
    }
    .yes-hoax-content-list-topic {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .yes-hoax-content-box-topic {
      height: 15px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 10px;
      background-color: white;
    }
    .yes-hoax-info {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #1a59ad;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .yes-hoax-info-cta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      color: #484848;
      font-size: 10px;
    }
    .yes-hoax-info-cta-button {
      color: #0465e4;
      border: 1px solid #0465e4;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 10px;
    }
    .result-caption {
      margin-top: 30px;
      font-weight: 700;
      font-size: 13px;
      text-align: center;
    }
    .result-container {
      margin-top: 15px;
      cursor: pointer;
    }
    .result-card {
      margin-top: 10px;
      padding: 20px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      cursor: pointer;
    }
    .result-title {
      font-family: "OpenSans Semi Bold";
      font-size: 12px;
      line-height: 16px;
      color: #000000;
    }
    .result-article {
      margin-top: 4px;
      font-family: "Roboto";
      font-weight: 400;
      font-size: 10px;
      line-height: 15px;
      color: #484848;
    }
    .result-topic {
      margin-top: 10px;
      font-size: 10px;
      line-height: 15px;
      display: flex;
      align-items: baseline;
      gap: 6px;
      color: black;
    }
    .result-list-topic {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 5px;
    }
    .result-box-topic {
      min-height: 15px;
      padding-left: 6px;
      padding-right: 6px;
      border: 1px solid #a49999;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 10px;
    }
    .result-info {
      margin-top: 10px;
      padding-top: 5px;
      border-top: 1px solid #dce3eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .result-info-cta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 10px;
      row-gap: 5px;
      color: #484848;
      font-size: 10px;
    }
    .result-info-cta-button {
      color: #0465e4;
      border: 1px solid #0465e4;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 10px;
    }
    .result-info-date {
      text-wrap: nowrap;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
    }
    .result-info-icon {
      color: #a8a8a8;
      font-size: 12px;
      top: -1px;
    }
    .result-info-text {
      color: #5b5b5b;
      font-size: 10px;
      line-height: 12px;
    }
    .pagination-container {
      margin-top: 15px;
      display: flex;
      justify-content: right;
      align-items: center;
    }
    .pagination-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .pagination-info {
      font-size: 9px;
      color: #4e4e4e;
      margin-right: 5px;
    }
    .q-pagination button {
      font-size: 9px;
      margin: 1px;
      width: 20px;
      height: 20px;
    }
  }
}

@media (min-width: 769px) {
  #search {
    .search-section {
      background-color: white;
      padding: 30px;
      text-align: center;
    }
    .search-panel {
      max-width: 1227px;
      margin: auto;
    }
    .search-container {
      margin-top: 30px;
      box-shadow: 2px 9px 10px 0px #0000001f;
    }
    .search-bar {
      width: 100%;
      padding: 60px;
      display: grid;
      grid-template-columns: auto 130px;
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__control {
        min-height: 73px !important;
        height: 73px !important;
      }
    }
    .search-input-container {
      border-radius: 100px;
      box-shadow: 2px 9px 10px 0px #0000001f;
    }
    .search-input {
      background-color: white;
      border-radius: 100px 0px 0px 100px;
      padding: 35px;
      font-size: 18px;
    }
    .search-button {
      width: 100%;
      height: 100%;
      background-color: #002b52;
      border-radius: 0px 100px 100px 0px;
      color: white;
      font-size: 24px;
    }
    .search-warning {
      margin-top: 16px;
      margin-left: 35px;
      text-align: left;
      font-size: 15px;
      color: red;
    }
    .result-section {
      padding: 30px;
      background-color: white;
      text-align: left;
    }
    .result-panel {
      max-width: 1227px;
      margin: auto;
    }
    .result-text {
      font-size: 16px;
      line-height: 24px;
      .highlight {
        color: #2e68fd;
      }
    }
    .not-valid-container {
      margin-top: 30px;
      border-radius: 10px;
      overflow: hidden;
    }
    .not-valid-header {
      padding: 0 40px;
      background: linear-gradient(180deg, #969696 0%, #535353 100%);
      height: 76px;
      color: white;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .not-valid-image {
      width: auto;
    }
    .not-valid-title {
      font-weight: 700;
      font-size: 30px;
      color: #f2f2f2;
    }
    .not-valid-content {
      padding: 30px 40px;
      background-color: #f9f9f9;
    }
    .not-valid-content-title {
      font-weight: 700;
      font-size: 30px;
      line-height: 35.16px;
      color: #1f1f1f;
    }
    .not-valid-content-subtitle {
      margin-top: 20px;
      font-size: 24px;
      line-height: 30px;
      color: black;
    }
    .not-valid-content-info {
      padding: 0 40px;
    }
    .not-valid-content-group {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .not-valid-content-header {
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;
      color: black;
    }
    .not-valid-content-description {
      margin-top: 6px;
      font-size: 20px;
      line-height: 30px;
      color: black;
    }
    .not-valid-content-list {
      margin-top: -2px;
      margin-bottom: 10px;
      padding-left: 30px;
    }
    .not-valid-info {
      margin-top: 23px;
      padding-top: 15px;
      border-top: 1px solid #1a59ad;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .not-valid-info-cta {
      color: #484848;
      font-size: 18px;
    }
    .not-valid-info-cta-button {
      width: 115px;
      height: 35px;
      margin-left: 20px;
      color: #0465e4;
      border: 1px solid #0465e4;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 16px;
    }
    .not-hoax-container {
      margin-top: 30px;
      border-radius: 10px;
      overflow: hidden;
    }
    .not-hoax-header {
      padding: 0 40px;
      background: linear-gradient(180deg, #015198 0%, #000f47 100%);
      height: 76px;
      color: white;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .not-hoax-icon {
      font-size: 32px;
      color: #27cd58;
      top: -1px;
    }
    .not-hoax-title {
      font-weight: 700;
      font-size: 30px;
      color: #f2f2f2;
    }
    .not-hoax-content {
      padding: 30px 40px;
      background-color: #d9eeff;
    }
    .not-hoax-content-title {
      font-weight: 700;
      font-size: 30px;
      line-height: 35.16px;
      color: #1f1f1f;
    }
    .not-hoax-content-article {
      margin-top: 20px;
      font-size: 16px;
      line-height: 30px;
    }
    .not-hoax-content-topic {
      margin-top: 30px;
      font-size: 16px;
      line-height: 30px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: black;
    }
    .not-hoax-content-list-topic {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .not-hoax-content-box-topic {
      height: 30px;
      padding-top: 2px;
      padding-left: 12px;
      padding-right: 12px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 16px;
      background-color: white;
    }
    .not-hoax-info {
      margin-top: 23px;
      padding-top: 15px;
      border-top: 1px solid #1a59ad;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .not-hoax-info-cta {
      color: #484848;
      font-size: 18px;
    }
    .not-hoax-info-cta-button {
      width: 115px;
      height: 35px;
      margin-left: 20px;
      color: #0465e4;
      border: 1px solid #0465e4;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 16px;
    }
    .yes-hoax-container {
      margin-top: 30px;
      border-radius: 10px;
      overflow: hidden;
    }
    .yes-hoax-header {
      padding: 0 40px;
      background: linear-gradient(180deg, #ea0616 0%, #720305 100%);
      height: 76px;
      color: white;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .yes-hoax-icon {
      font-size: 32px;
      color: #e7e7e7;
      top: -1px;
    }
    .yes-hoax-title {
      font-weight: 700;
      font-size: 30px;
      color: #f2f2f2;
    }
    .yes-hoax-content {
      padding: 30px 40px;
      background-color: #ffefef;
    }
    .yes-hoax-content-title {
      font-weight: 700;
      font-size: 30px;
      line-height: 35.16px;
      color: #1f1f1f;
    }
    .yes-hoax-content-article {
      margin-top: 20px;
      font-size: 16px;
      line-height: 30px;
    }
    .yes-hoax-content-topic {
      margin-top: 30px;
      font-size: 16px;
      line-height: 30px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: black;
    }
    .yes-hoax-content-list-topic {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .yes-hoax-content-box-topic {
      height: 30px;
      padding-top: 2px;
      padding-left: 12px;
      padding-right: 12px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 16px;
      background-color: white;
    }
    .yes-hoax-info {
      margin-top: 23px;
      padding-top: 15px;
      border-top: 1px solid #1a59ad;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .yes-hoax-info-cta {
      color: #484848;
      font-size: 18px;
    }
    .yes-hoax-info-cta-button {
      width: 115px;
      height: 35px;
      margin-left: 20px;
      color: #0465e4;
      border: 1px solid #0465e4;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 16px;
    }
    .result-caption {
      margin-top: 60px;
      font-weight: 700;
      font-size: 24px;
      text-align: center;
    }
    .result-container {
      margin-top: 30px;
      cursor: pointer;
    }
    .result-card {
      margin-top: 10px;
      padding: 30px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      cursor: pointer;
    }
    .result-title {
      font-family: "OpenSans Semi Bold";
      font-size: 20px;
      line-height: 28px;
      color: #000000;
    }
    .result-article {
      margin-top: 4px;
      font-family: "Roboto";
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      color: #484848;
    }
    .result-topic {
      margin-top: 16px;
      font-size: 16px;
      line-height: 30px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: black;
    }
    .result-list-topic {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .result-box-topic {
      min-height: 30px;
      padding-top: 2px;
      padding-left: 12px;
      padding-right: 12px;
      border: 1px solid #a49999;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 16px;
    }
    .result-info {
      margin-top: 23px;
      padding-top: 15px;
      border-top: 2px solid #dce3eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .result-info-cta {
      color: #484848;
      font-size: 18px;
    }
    .result-info-cta-button {
      width: 115px;
      height: 35px;
      margin-left: 20px;
      color: #0465e4;
      border: 1px solid #0465e4;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 16px;
    }
    .result-info-date {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .result-info-icon {
      color: #a8a8a8;
      font-size: 18px;
      top: -1px;
    }
    .result-info-text {
      color: #5b5b5b;
      font-size: 14px;
      line-height: 16.41px;
    }
    .pagination-container {
      margin-top: 30px;
      display: flex;
      justify-content: right;
      align-items: center;
    }
    .pagination-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .pagination-info {
      font-size: 16px;
      color: #4e4e4e;
      margin-right: 10px;
    }
    .q-pagination button {
      font-size: 16px;
      margin: 3px;
      width: 36px;
      height: 36px;
    }
  }
}
</style>
