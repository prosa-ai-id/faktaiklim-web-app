<template>
  <div id="report">
    <q-card class="form-card">
      <div class="form-title">Menambahkan Laporan Baru</div>
      <div class="form-container">
        <div class="table-container">
          <table class="table">
            <tbody>
              <tr>
                <td>
                  <label id="borderTitle" for="title">
                    Judul Aduan<span class="red">*</span>
                  </label>
                </td>
                <td>
                  <q-input
                    v-model="title"
                    for="title"
                    color="primary"
                    outlined
                    placeholder="Tambahkan judul"
                    class="form-input-title"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="source"> Sumber </label>
                </td>
                <td>
                  <q-select
                    v-model="source"
                    :options="sourceOptions"
                    for="source"
                    color="primary"
                    outlined
                    placeholder="Tambahkan sumber"
                    class="form-input-source"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    id="borderNarration"
                    for="narration"
                    @click="$refs.narration.focus()"
                  >
                    Penjelasan<span class="red">*</span>
                  </label>
                </td>
                <td>
                  <div
                    autocorrect="off"
                    autocapitalize="off"
                    autocomplete="off"
                    spellcheck="false"
                  >
                    <q-editor
                      ref="narration"
                      v-model="narration"
                      toolbar-bg="toolbar"
                      :toolbar="[
                        ['undo', 'redo'],
                        [
                          'bold',
                          'italic',
                          'strike',
                          'underline',
                          'subscript',
                          'superscript',
                        ],
                        ['left', 'center', 'right', 'justify'],
                        ['ordered', 'unordered'],
                      ]"
                      placeholder="Tambahkan narasi"
                      class="form-input-narration"
                      @input="countTotalChar()"
                      @paste="(evt) => pasteCapture(evt)"
                    />
                  </div>
                  <div
                    class="character-count"
                    :style="{ color: charCount === 0 ? 'red' : '' }"
                  >
                    {{ $thousand(charCount) }} karakter
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label id="borderTopic" for="topic">
                    Topik<span class="red">*</span>
                  </label>
                </td>
                <td>
                  <q-input
                    v-model="topic"
                    for="topic"
                    color="primary"
                    outlined
                    placeholder="Tambahkan topik"
                    class="form-input-topic"
                    @keyup.enter="addTopic()"
                  />
                  <div v-if="!topicList.length" class="form-info-topic">
                    Tekan Enter untuk menambahkan topik baru
                  </div>
                  <div v-else>
                    <div class="form-topic">
                      <div class="form-list-topic">
                        <div
                          v-for="(item, index) in topicList"
                          :key="index"
                          class="form-box-topic"
                        >
                          {{ item }}
                          <div
                            class="form-close-topic"
                            @click="removeTopic(index)"
                          >
                            <q-icon name="cancel" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <div class="vertical-line">
                    <div>
                      <span class="red">*</span>Masukan bersifat wajib diisi
                    </div>
                    <div class="text-italic">
                      *Pastikan informasi yang Anda masukkan sudah benar
                    </div>
                  </div>
                  <div class="button-container">
                    <q-btn
                      label="BATAL"
                      flat
                      class="form-button-cancel"
                      @click="cancel()"
                    />
                    <q-btn
                      label="KIRIM"
                      flat
                      :disabled="disabled()"
                      class="form-button-send"
                      @click="send()"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </q-card>
    <ModalFailed ref="modalFailed" />
    <ModalSuccess ref="modalSuccess" @click="homepage()" />
  </div>
</template>

<script>
import ModalFailed from "src/components/ModalFailed.vue";
import ModalSuccess from "components/ModalSuccess.vue";
export default {
  components: {
    ModalFailed,
    ModalSuccess,
  },
  data: () => ({
    title: "",
    source: "Umum",
    sourceOptions: ["Website FaktaIklim", "Chatbot FaktaIklim", "Umum"],
    narration: "",
    charCount: 0,
    topic: "",
    topicList: [],
    stripFormatting: false,
  }),
  mounted() {
    if (this.$report.active) {
      this.title = this.$report.title;
      this.source = this.$report.source;
      this.narration = this.$report.narration;
      this.countTotalChar();
      this.topicList = [...this.$report.topicList];
      this.$report.active = false;
    }
  },
  methods: {
    countTotalChar() {
      this.charCount = this.narration.replace(/(<([^>]+)>)/gi, "").length;
    },
    disabled() {
      return (
        this.title.trim() === "" ||
        !this.narration.replace(/(<([^>]+)>)/gi, "").trim().length ||
        !this.topicList.length
      );
    },
    async send() {
      try {
        const response = await this.$api({
          method: "post",
          url: "/api/aduan/create/",
          data: {
            title: this.title,
            source: this.source,
            content_html: this.narration,
            content: this.narration
              .replaceAll("</div>", "</div> ")
              .replace(/(<([^>]+)>)/gi, "")
              .trim(),
            topic: this.topicList.join(", "),
          },
        });
        this.$refs.modalSuccess.text =
          "Laporan aduan baru berhasil ditambahkan";
        this.$refs.modalSuccess.confirmSuccess = true;
      } catch {
        this.$refs.modalFailed.text = "Laporan aduan baru gagal ditambahkan";
        this.$refs.modalFailed.show = true;
      }
    },
    cancel() {
      this.homepage();
    },
    homepage() {
      this.$goTo("/");
    },
    pasteCapture(e) {
      let text = "";
      if (
        e.originalEvent &&
        e.originalEvent.clipboardData &&
        e.originalEvent.clipboardData.getData
      ) {
        e.preventDefault();
        text = e.originalEvent.clipboardData.getData("text/plain");
        window.document.execCommand("insertText", false, text);
      } else if (e.clipboardData && e.clipboardData.getData) {
        e.preventDefault();
        text = e.clipboardData.getData("text/plain");
        window.document.execCommand("insertText", false, text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!this.stripFormatting) {
          this.stripFormatting = true;
          e.preventDefault();
          window.document.execCommand("ms-pasteTextOnly", false);
        }
        this.stripFormatting = false;
      }
    },
    addTopic() {
      if (this.topic.trim()) {
        this.topicList.push(this.topic);
        this.topic = "";
      }
    },
    removeTopic(index) {
      this.topicList.splice(index, 1);
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  #report {
    padding: 20px;
    .form-card {
      max-width: 768px;
      margin: auto;
      box-shadow: 0px 9px 9px #e1e4ea;
      border-radius: 10px;
    }
    td {
      vertical-align: top;
      font-size: 12px;
    }
    tr td:first-child {
      width: 75px;
      padding-top: 7px;
    }
    .red {
      color: red;
    }
    .red-border {
      border: 1px solid red;
    }
    .form-title {
      height: 50px;
      font-family: "OpenSans Regular";
      font-size: 14px;
      font-weight: 600;
      color: #444444;
      padding: 15px;
      border-bottom: 1px solid #ededf4;
    }
    .form-container {
      padding: 10px;
      padding-top: 0px;
      overflow: hidden;
    }
    .table-container {
      width: 100%;
      margin-top: 10px;
    }
    .table {
      width: 100%;
      border-spacing: 10px;
    }
    .form-input-title {
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__native,
      .q-field__control {
        min-height: 30px !important;
        height: 30px !important;
        font-size: 10px;
      }
    }
    .form-input-source {
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__native,
      .q-field__control {
        min-height: 30px !important;
        height: 30px !important;
        font-size: 10px;
      }
    }
    .form-input-narration {
      height: 160px;
      font-size: 10px;
    }
    .character-count {
      margin-top: 5px;
      font-size: 10px;
      color: #222222;
    }
    .form-input-topic {
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__native,
      .q-field__control {
        min-height: 30px !important;
        height: 30px !important;
        border-radius: 4px !important;
        background: #ededf4;
        font-size: 10px;
        &::before,
        &::after {
          display: none;
        }
      }
    }
    .form-info-topic {
      margin-top: 5px;
      font-size: 10px;
      color: red;
    }
    .form-topic {
      margin-top: 5px;
    }
    .form-list-topic {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 5px;
    }
    .form-box-topic {
      min-height: 20px;
      padding-left: 6px;
      padding-right: 6px;
      background-color: #d6f7ff;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 10px;
      color: #1b1b1b;
    }
    .form-close-topic {
      margin-left: 5px;
      font-size: 14px;
      color: #1b1b1b;
      cursor: pointer;
    }
    .vertical-line {
      margin-top: 10px;
      border-top: 1px solid #ededf4;
      padding-top: 10px;
      font-size: 11px;
    }
    .button-container {
      margin-top: 30px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    .form-button-cancel {
      width: 75px;
      font-family: "Montserrat Bold";
      font-size: 10px;
      border-radius: 5px;
      border: 1px solid #0465e4;
      color: #0465e4;
    }
    .form-button-send {
      width: 75px;
      font-family: "Montserrat Bold";
      font-size: 10px;
      border-radius: 5px;
      border: 1px solid #0465e4;
      background-color: #0465e4;
      color: white;
    }
  }
}

@media (min-width: 769px) {
  #report {
    padding: 30px;
    .form-card {
      max-width: 1227px;
      margin: auto;
      box-shadow: 0px 9px 9px #e1e4ea;
      border-radius: 10px;
    }
    td {
      vertical-align: top;
    }
    tr td:first-child {
      width: 120px;
      padding-top: 12px;
      font-size: 16px;
    }
    .red {
      color: red;
    }
    .red-border {
      border: 1px solid red;
    }
    .form-title {
      height: 84px;
      font-family: "OpenSans Regular";
      font-size: 20px;
      font-weight: 600;
      color: #444444;
      padding: 30px;
      border-bottom: 1px solid #ededf4;
    }
    .form-container {
      padding: 60px;
      padding-top: 0px;
      overflow: hidden;
    }
    .table-container {
      width: 100%;
      margin-top: 43px;
    }
    .table {
      width: 100%;
      border-spacing: 20px;
    }
    .form-input-title {
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__native,
      .q-field__control {
        min-height: 48px !important;
        height: 48px !important;
      }
    }
    .form-input-source {
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__native,
      .q-field__control {
        min-height: 48px !important;
        height: 48px !important;
      }
    }
    .form-input-narration {
      height: 320px;
      font-size: 14px;
    }
    .character-count {
      margin-top: 10px;
      font-size: 14px;
      color: #222222;
    }
    .form-input-topic {
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__native,
      .q-field__control {
        min-height: 48px !important;
        height: 48px !important;
      }
    }
    .form-info-topic {
      margin-top: 10px;
      font-size: 14px;
      color: red;
    }
    .form-topic {
      margin-top: 15px;
    }
    .form-list-topic {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .form-box-topic {
      min-height: 30px;
      padding-left: 12px;
      padding-right: 12px;
      background-color: #d6f7ff;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #1b1b1b;
    }
    .form-close-topic {
      margin-left: 5px;
      font-size: 16px;
      color: #1b1b1b;
      cursor: pointer;
    }
    .vertical-line {
      margin-top: 15px;
      border-top: 1px solid #ededf4;
      padding-top: 15px;
      font-size: 14px;
      div {
        margin-bottom: 5px;
      }
    }
    .button-container {
      margin-top: 60px;
      display: flex;
      justify-content: flex-end;
      gap: 20px;
    }
    .form-button-cancel {
      width: 127px;
      height: 45px;
      font-family: "Montserrat Bold";
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #0465e4;
      color: #0465e4;
    }
    .form-button-send {
      width: 127px;
      height: 45px;
      font-family: "Montserrat Bold";
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #0465e4;
      background-color: #0465e4;
      color: white;
    }
  }
}
</style>
