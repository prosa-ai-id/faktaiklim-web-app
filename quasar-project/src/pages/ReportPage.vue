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
                  <form
                    autocorrect="off"
                    autocapitalize="off"
                    autocomplete="off"
                    spellcheck="false"
                  >
                    <q-input
                      v-model="source"
                      for="source"
                      type="textarea"
                      color="primary"
                      outlined
                      placeholder="Tambahkan sumber"
                      class="form-input-source"
                      input-style="resize:none;"
                    />
                  </form>
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
                  <form
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
                  </form>
                  <div class="character-count">
                    {{ $thousand(charCount) }} karakter
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    id="borderTopic"
                    for="topic"
                    @click="$refs.category.focus()"
                  >
                    Topik<span class="red">*</span>
                  </label>
                </td>
                <td>
                  <q-select
                    ref="topic"
                    v-model="topicModel"
                    for="topic"
                    color="primary"
                    filled
                    dense
                    :options="topicOptions"
                    dropdown-icon="keyboard_arrow_down"
                    class="form-input-topic"
                  />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <div class="vertical-line">
                    <span class="red">*</span>Masukan bersifat wajib diisi
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
    source: "",
    narration: "",
    charCount: 0,
    topicModel: "Pilih topik",
    topicOptions: [],
    stripFormatting: false,
  }),
  async mounted() {
    await this.topicList();
  },
  methods: {
    async topicList() {
      const response = await this.$api({
        method: "get",
        url: "/api/topic/list/",
        params: {
          order: "name",
          sort: "asc",
        },
      });
      this.topicOptions = response.data.data.map((item) => item.name).sort();
    },
    countTotalChar() {
      this.charCount = this.narration.replace(/(<([^>]+)>)/gi, "").length;
    },
    disabled() {
      return (
        this.title.trim() === "" ||
        !this.narration.replace(/(<([^>]+)>)/gi, "").trim().length ||
        this.topicModel === "Pilih topik"
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
            topic: this.topicModel,
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
      width: 100px;
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
        min-height: 55px !important;
        height: 55px !important;
        font-size: 10px;
        padding: 4px 6px !important;
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
    .vertical-line {
      border-top: 1px solid #ededf4;
      padding-top: 10px;
      font-size: 12px;
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
      width: 150px;
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
      .q-field__control {
        min-height: 48px !important;
        height: 48px !important;
      }
    }
    .form-input-source {
      .q-field--auto-height .q-field__native,
      .q-field--auto-height .q-field__control,
      .q-field__marginal,
      .q-field__control {
        min-height: 110px !important;
        height: 110px !important;
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
      .q-field__control {
        min-height: 48px !important;
        height: 48px !important;
        border-radius: 4px !important;
        background: #ededf4;
        font-size: 14px;
        &::before,
        &::after {
          display: none;
        }
      }
    }
    .vertical-line {
      border-top: 1px solid #ededf4;
      padding-top: 20px;
      font-size: 14px;
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
