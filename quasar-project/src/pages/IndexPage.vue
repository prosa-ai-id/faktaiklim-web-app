<template>
  <div id="index">
    <section class="search-section">
      <div class="search-background">
        <div class="search-content">
          <div class="search-title">
            Verifikasi Hoaks atau Temukan Fakta Iklim
          </div>
          <div class="search-description">
            Verifikasi informasi yang anda dapatkan dan telusuri berita hoaks
            berkaitan dengan iklim
          </div>
          <div class="search-bar">
            <div class="search-input-container">
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
        </div>
      </div>
      <div class="search-graph">
        <div class="graph">
          <div class="graph-title">Statistik Temuan Isu Hoaks</div>
          <div class="graph-description">
            Diagram ini menampilkan hasil deteksi hoaks menggunakan AI dengan
            rentang akurasi <b>{{ accuracy }}%</b>
          </div>
          <div class="graph-toolbar">
            <q-select
              v-model="graphKeyword"
              color="primary"
              dense
              filled
              :options="graphKeywordOptions"
              dropdown-icon="keyboard_arrow_down"
              class="graph-keyword"
              @update:model-value="drawChart()"
            />
            <DatePicker
              ref="graphDatePicker"
              :model="graphDatePicker"
              class="graph-date"
              @change="drawChart()"
            />
            <q-btn
              label="Atur Ulang"
              icon="refresh"
              class="graph-reset"
              @click="resetChart()"
            />
          </div>
          <div class="graph-content">
            <BarChart ref="barChart" />
          </div>
        </div>
      </div>
    </section>
    <section class="recent-section">
      <div class="recent-panel">
        <div class="recent-text">Terbaru</div>
        <div
          v-for="(item, index) in tableNew"
          :key="index"
          class="recent-container"
          @click="goTo(item.source)"
        >
          <div class="recent-title">
            {{ item.title }}
          </div>
          <div class="recent-article">
            {{ item.article }}
          </div>
          <div class="recent-topic">
            Topik:
            <div class="recent-list-topic">
              <div
                v-for="(item2, index) in item.topic"
                :key="index"
                class="recent-box-topic"
              >
                {{ item2 }}
              </div>
            </div>
          </div>
          <div class="recent-info">
            <div class="recent-info-date">
              <q-icon name="schedule" class="recent-info-icon">
                <q-tooltip> Tanggal </q-tooltip>
              </q-icon>
              <div class="recent-info-text">
                {{ item.date }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="topic-section">
      <div class="topic-panel">
        <div class="tab-container">
          <q-tabs
            v-model="tab"
            :outside-arrows="true"
            :mobile-arrows="true"
            no-caps
            align="justify"
            active-color="primary"
            indicator-color="primary"
            @click="selectTab"
          >
            <q-tab v-for="item in tabs" :key="item" :name="item">
              <template #default>
                <div class="inner-tab">
                  {{ item }}
                </div>
              </template>
            </q-tab>
          </q-tabs>
        </div>
        <div class="topic-container">
          <div v-show="tableTopic.length">
            <div
              v-for="(item, index) in tableTopic"
              :key="index"
              class="recent-container"
              @click="goTo(item.source)"
            >
              <div class="recent-title">
                {{ item.title }}
              </div>
              <div class="recent-article">
                {{ item.article }}
              </div>
              <div class="recent-topic">
                Topik:
                <div class="recent-list-topic">
                  <div
                    v-for="(item2, index) in item.topic"
                    :key="index"
                    class="recent-box-topic"
                  >
                    {{ item2 }}
                  </div>
                </div>
              </div>
              <div class="recent-info">
                <div class="recent-info-date">
                  <q-icon name="schedule" class="recent-info-icon">
                    <q-tooltip> Tanggal </q-tooltip>
                  </q-icon>
                  <div class="recent-info-text">
                    {{ item.date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="!tableTopic.length">
            <EmptyState />
          </div>
        </div>
      </div>
      <div v-show="maxPages" class="pagination-container">
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
    <section class="cta-section">
      <div class="cta-panel">
        <div class="cta-container">
          <div>
            <div class="cta-text">
              Lawan Misinformasi Iklim Bersama! Verifikasi informasi atau
              laporkan hoaks iklim langsung lewat chatbot Telegram kami
            </div>
            <div class="cta-button">
              <q-btn flat class="cta-button-analysis" @click="chatbot()">
                ANALISIS HOAKS
              </q-btn>
              <q-btn flat class="cta-button-report" @click="report()">
                LAPORKAN HOAKS
              </q-btn>
            </div>
          </div>
          <div class="cta-image-container">
            <img src="/images/cta.svg" alt="CTA Image" class="cta-image" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BarChart from "components/BarChart.vue";
import DatePicker from "components/DatePicker.vue";
import EmptyState from "components/EmptyState.vue";
export default {
  components: {
    BarChart,
    DatePicker,
    EmptyState,
  },
  data: () => ({
    keywords: "",
    warning: false,
    accuracy: 0,
    graphKeyword: "",
    graphKeywordOptions: [],
    graphDatePicker: {},
    tableNew: [],
    tab: "Semua",
    tabs: ["Semua"],
    tableTopic: [],
    currentPage: 1,
    maxPages: 1,
    recordStart: 0,
    recordEnd: 0,
    recordTotal: 0,
  }),
  async mounted() {
    await this.keywordList();
    this.resetChart();
    this.newIssue();
    await this.topicList();
    this.goToPage();
    const the = this;
    setTimeout(function () {
      the.$refs.keywords.focus();
    }, 0);
  },
  methods: {
    async keywordList() {
      const response = await this.$api({
        method: "get",
        url: "/api/keyword/list/",
        params: {
          order: "name",
          sort: "asc",
        },
      });
      this.graphKeywordOptions = response.data.data.map((item) => item.name);
      if (this.graphKeywordOptions.length) {
        this.graphKeyword = this.graphKeywordOptions[0];
      }
    },
    async drawChart() {
      const start_date = this.$refs.graphDatePicker.datePicker.from
        ? this.$moment(
            this.$refs.graphDatePicker.datePicker.from,
            "DD-MMM-YYYY"
          ).format("YYYY-MM-DD")
        : this.$moment(
            this.$refs.graphDatePicker.datePicker,
            "DD-MMM-YYYY"
          ).format("YYYY-MM-DD");
      const end_date = this.$refs.graphDatePicker.datePicker.to
        ? this.$moment(
            this.$refs.graphDatePicker.datePicker.to,
            "DD-MMM-YYYY"
          ).format("YYYY-MM-DD")
        : this.$moment(
            this.$refs.graphDatePicker.datePicker,
            "DD-MMM-YYYY"
          ).format("YYYY-MM-DD");
      const response = await this.$api({
        method: "get",
        url: "/api/dashboard/",
        params: {
          keyword: this.graphKeyword,
          start_date: start_date,
          end_date: end_date,
        },
      });
      const data = [];
      this.accuracy = response.data.data.akurasi;
      response.data.data.date.forEach((item, index) => {
        data.push({
          date: item,
          day: this.$moment(item, "YYYY-MM-DD").format("D"),
          twitter: response.data.data.twitter[index],
          instagram: response.data.data.instagram[index],
          total:
            response.data.data.twitter[index] +
            response.data.data.instagram[index],
        });
      });
      this.$refs.barChart.chartData = data;
      this.$refs.barChart.refreshChart();
    },
    resetChart() {
      this.graphKeyword = this.graphKeywordOptions[0];
      this.graphDatePicker = {
        from: this.$moment().startOf("month").format("DD-MMM-YYYY"),
        to: this.$moment().format("DD-MMM-YYYY"),
      };
      setTimeout(() => {
        this.drawChart();
      }, 0);
    },
    search() {
      const words = this.keywords
        .split(" ")
        .filter((item) => item.trim() !== "").length;
      if (words >= 3) {
        this.$search.keywords = this.keywords;
        this.$router.push("/search");
      } else {
        this.warning = true;
      }
    },
    async newIssue() {
      const response = await this.$api({
        method: "get",
        url: "/api/article/",
        params: {
          page_size: 5,
          page_number: 1,
          order: "created_at",
          sort: "desc",
        },
      });
      this.tableNew = [];
      response.data.data.forEach((item) => {
        item.content = item.content.replace(/(<([^>]+)>)/gi, "");
        this.tableNew.push({
          title: item.title,
          source: item.source,
          article:
            item.content.length > 300
              ? item.content.substr(0, 300) + "..."
              : item.content,
          topic: item.topic ? item.topic.split(",") : "",
          date: this.$moment(item.created_at).format("DD-MM-YYYY"),
        });
      });
    },
    async topicList() {
      const response = await this.$api({
        method: "get",
        url: "/api/topic/list/",
        params: {
          order: "name",
          sort: "asc",
        },
      });
      this.tabs = ["Semua", ...response.data.data.map((item) => item.name)];
    },
    async topicIssue(topic, page) {
      const response = await this.$api({
        method: "get",
        url: "/api/article/",
        params: {
          topic: topic === "Semua" ? "" : topic,
          page_size: 5,
          page_number: page,
          order: "created_at",
          sort: "desc",
        },
      });
      this.tableTopic = [];
      response.data.data.forEach((item) => {
        item.content = item.content.replace(/(<([^>]+)>)/gi, "");
        this.tableTopic.push({
          title: item.title,
          source: item.source,
          article:
            item.content.length > 300
              ? item.content.substr(0, 300) + "..."
              : item.content,
          topic: item.topic ? item.topic.split(",") : "",
          date: this.$moment(item.created_at).format("DD-MM-YYYY"),
        });
      });
      this.maxPages = Math.ceil(
        response.data.meta.total / response.data.meta.perPage
      );
      this.currentPage = page;
      this.recordStart =
        response.data.meta.total > 0
          ? response.data.meta.perPage * (this.currentPage - 1) + 1
          : 0;
      this.recordEnd =
        response.data.meta.total > response.data.meta.perPage * this.currentPage
          ? response.data.meta.perPage * this.currentPage
          : response.data.meta.total;
      this.recordTotal = response.data.meta.total;
    },
    selectTab() {
      this.currentPage = 1;
      this.goToPage();
    },
    goTo(url) {
      window.open(url);
    },
    goToPage() {
      this.topicIssue(this.tab, this.currentPage);
    },
    report() {
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
  #index {
    padding-bottom: 49px;
    .search-section {
      color: white;
      text-align: center;
    }
    .search-background {
      padding-bottom: 70px;
      background: linear-gradient(
        180deg,
        #10205e 0%,
        rgba(11, 58, 233, 0.8) 63.02%,
        #10205e 85.42%,
        #10205e 100%
      );
    }
    .search-content {
      padding: 20px;
    }
    .search-title {
      margin-top: 30px;
      font-family: "Ubuntu Bold";
      color: white;
      font-size: 24px;
      line-height: 27.58px;
    }
    .search-description {
      margin-top: 10px;
      color: white;
      font-size: 12px;
      line-height: 14.22px;
    }
    .search-bar {
      width: 100%;
      max-width: 483px;
      margin: auto;
      margin-top: 23px;
      height: 31px;
      display: grid;
      grid-template-columns: auto 41px;
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__control {
        min-height: 31px !important;
        height: 31px !important;
      }
    }
    .search-input {
      background-color: white;
      border-radius: 22px 0px 0px 22px;
      padding: 15px;
      font-size: 12px;
    }
    .search-button {
      width: 100%;
      height: 100%;
      background-color: #002b52;
      border-radius: 0px 22px 22px 0px;
      color: white;
      font-size: 10px;
    }
    .search-warning {
      margin-top: 5px;
      margin-left: 15px;
      text-align: left;
      font-size: 11px;
      color: yellow;
    }
    .search-graph {
      padding: 0 20px;
    }
    .graph {
      max-width: 1227px;
      margin: auto;
      margin-top: -60px;
      background-color: white;
      color: black;
      box-shadow: 20px 30px 40px 0px #2830cf30;
      border-radius: 10px;
      text-align: left;
      padding: 12px;
    }
    .graph-title {
      font-family: "OpenSans Semi Bold";
      font-size: 14px;
      line-height: 18px;
      color: #1b1b1b;
      padding-bottom: 5px;
      border-bottom: 1px solid #ededf4;
    }
    .graph-description {
      margin-top: 5px;
      font-size: 10px;
      line-height: 15px;
      color: #444444;
    }
    .graph-toolbar {
      margin-top: 18px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .graph-keyword {
      font-size: 10px;
      width: 125px;
      .q-field__control,
      .q-field__native,
      .q-field__marginal {
        min-height: 30px !important;
        height: 30px !important;
        border-radius: 1px;
        background: #ededf466;

        &::before,
        &::after {
          display: none;
        }
      }
    }
    .graph-date {
      font-size: 12px;
      margin-right: 20px;
    }
    .graph-reset {
      width: 125px;
      height: 30px;
      font-size: 12px;
      border-radius: 8px;
      background-color: #0465e4;
      color: white;
    }
    .graph-content {
      margin-top: 10px;
    }
    .recent-section {
      margin-top: 30px;
      background-color: white;
      padding: 30px;
    }
    .recent-panel {
      max-width: 1227px;
      margin: auto;
    }
    .recent-text {
      font-family: "Ubuntu Bold";
      font-size: 20px;
      line-height: 23px;
      color: var(--primary-color);
    }
    .recent-container {
      margin-top: 15px;
      cursor: pointer;
    }
    .recent-title {
      font-family: "OpenSans Semi Bold";
      font-size: 12px;
      line-height: 16px;
      color: #000000;
    }
    .recent-article {
      margin-top: 4px;
      font-family: "Roboto";
      font-weight: 400;
      font-size: 10px;
      line-height: 15px;
      color: #484848;
    }
    .recent-topic {
      margin-top: 10px;
      font-size: 8px;
      line-height: 15px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: black;
    }
    .recent-list-topic {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .recent-box-topic {
      height: 15px;
      padding-left: 6px;
      padding-right: 6px;
      border: 1px solid #a49999;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 8px;
    }
    .recent-info {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .recent-info-author {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
    }
    .recent-info-date {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
    }
    .recent-info-icon {
      color: #a8a8a8;
      font-size: 12px;
      top: -1px;
    }
    .recent-info-text {
      color: #5b5b5b;
      font-size: 10px;
      line-height: 12px;
    }
    .topic-section {
      background-color: white;
      color: var(--primary-color);
      padding: 0px 30px 30px 30px;
    }
    .topic-panel {
      max-width: 768px;
      margin: auto;
    }
    .tab-container {
      height: 46px;
      border-bottom: 1px solid #424242;
      color: #424242;
      font-family: "Ubuntu Regular";
      font-size: 12px;
      line-height: 16px;
    }
    .inner-tab {
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    }
    .q-tab__indicator {
      height: 4px;
      border-radius: 4.5px;
    }
    .topic-container {
      margin-top: 15px;
    }
    .pagination-container {
      margin-top: 30px;
      display: flex;
      justify-content: center;
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
    .cta-section {
      margin-top: 50px;
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
      padding: 8px 11px;
    }
    .cta-image-container {
      padding-top: 15px;
    }
    .cta-image {
      height: 120px;
    }
  }
}

@media (min-width: 769px) {
  #index {
    padding-bottom: 98px;
    .search-section {
      color: white;
      text-align: center;
    }
    .search-background {
      padding-bottom: 140px;
      background: linear-gradient(
        180deg,
        #10205e 0%,
        rgba(11, 58, 233, 0.8) 63.02%,
        #10205e 85.42%,
        #10205e 100%
      );
    }
    .search-content {
      padding: 60px;
    }
    .search-title {
      margin-top: 30px;
      font-family: "Ubuntu Bold";
      color: white;
      font-size: 48px;
      line-height: 55.15px;
    }
    .search-description {
      margin-top: 14px;
      color: white;
      font-size: 18px;
      line-height: 21.33px;
    }
    .search-bar {
      width: 100%;
      max-width: 954px;
      margin: auto;
      margin-top: 40px;
      height: 73px;
      display: grid;
      grid-template-columns: auto 113px;
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__control {
        min-height: 73px !important;
        height: 73px !important;
      }
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
      margin-top: 10px;
      margin-left: 35px;
      text-align: left;
      font-size: 15px;
      color: yellow;
    }
    .search-graph {
      padding: 0 60px;
    }
    .graph {
      max-width: 1227px;
      margin: auto;
      margin-top: -120px;
      background-color: white;
      color: black;
      box-shadow: 20px 30px 40px 0px #2830cf30;
      border-radius: 10px;
      text-align: left;
      padding: 30px;
    }
    .graph-title {
      font-family: "OpenSans Semi Bold";
      font-size: 24px;
      line-height: 32.68px;
      color: #1b1b1b;
      padding-bottom: 10px;
      border-bottom: 1px solid #ededf4;
    }
    .graph-description {
      margin-top: 10px;
      font-size: 16px;
      line-height: 18.75px;
      color: #444444;
    }
    .graph-toolbar {
      margin-top: 36px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
    }
    .graph-keyword {
      width: 200px;
      .q-field__control,
      .q-field__native,
      .q-field__marginal {
        min-height: 40px !important;
        height: 40px !important;
        border-radius: 1px;
        background: #ededf466;

        &::before,
        &::after {
          display: none;
        }
      }
      .q-field__native {
        padding: 5px;
      }
    }
    .graph-date {
      margin-right: 40px;
    }
    .graph-reset {
      width: 150px;
      height: 40px;
      font-size: 15px;
      border-radius: 8px;
      background-color: #0465e4;
      color: white;
    }
    .graph-content {
      margin-top: 10px;
    }
    .recent-section {
      margin-top: 60px;
      background-color: white;
      padding: 60px;
    }
    .recent-panel {
      max-width: 1227px;
      margin: auto;
    }
    .recent-text {
      font-family: "Ubuntu Bold";
      font-size: 40px;
      line-height: 45.96px;
      color: var(--primary-color);
    }
    .recent-container {
      margin-top: 30px;
      cursor: pointer;
    }
    .recent-title {
      font-family: "OpenSans Semi Bold";
      font-size: 20px;
      line-height: 28px;
      color: #000000;
    }
    .recent-article {
      margin-top: 4px;
      font-family: "Roboto";
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      color: #484848;
    }
    .recent-topic {
      margin-top: 16px;
      font-size: 14px;
      line-height: 30px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: black;
    }
    .recent-list-topic {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .recent-box-topic {
      height: 30px;
      padding-top: 2px;
      padding-left: 12px;
      padding-right: 12px;
      border: 1px solid #a49999;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    .recent-info {
      margin-top: 23px;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .recent-info-author {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .recent-info-date {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .recent-info-icon {
      color: #a8a8a8;
      font-size: 18px;
      top: -1px;
    }
    .recent-info-text {
      color: #5b5b5b;
      font-size: 14px;
      line-height: 16.41px;
    }
    .topic-section {
      background-color: white;
      color: var(--primary-color);
      padding: 0px 60px 60px 60px;
    }
    .topic-panel {
      max-width: 1227px;
      margin: auto;
    }
    .tab-container {
      height: 60px;
      border-bottom: 1px solid #424242;
      color: #424242;
      font-family: "Ubuntu Regular";
      font-size: 20px;
      line-height: 22.98px;
    }
    .inner-tab {
      padding-top: 16px;
      padding-bottom: 18px;
    }
    .q-tab__indicator {
      height: 9px;
      border-radius: 4.5px;
    }
    .topic-container {
      margin-top: 30px;
    }
    .pagination-container {
      margin-top: 60px;
      display: flex;
      justify-content: center;
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
    .cta-section {
      margin-top: 105px;
      padding: 0 60px;
      background-color: white;
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
      width: 209px;
      background-color: white;
      color: var(--primary-color);
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 16px;
      line-height: 19.5px;
      padding: 16px 22px;
    }
    .cta-button-report {
      width: 209px;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      font-family: "Montserrat Bold";
      font-size: 16px;
      line-height: 19.5px;
      padding: 16px 22px;
    }
    .cta-image-container {
      padding-top: 30px;
    }
  }
}
</style>
