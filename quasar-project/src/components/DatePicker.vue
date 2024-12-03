<template>
  <q-btn flat class="datepicker">
    <div class="datepicker-container">
      <div>
        <q-icon name="calendar_month" color="primary" class="datepicker-icon" />
      </div>
      <div class="datepicker-text">
        {{ datePickerDisplay }}
      </div>
    </div>
    <q-menu v-model="datePickerMenu">
      <q-date
        id="datePicker"
        v-model="datePicker"
        mask="DD-MMM-YYYY"
        minimal
        flat
        range
        no-unset
        color="primary"
        @update:model-value="changeDate()"
        @range-start="rangeStart()"
      />
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    datePickerMenu: false,
    datePicker: "",
  }),
  watch: {
    model() {
      this.datePicker = this.model;
    },
  },
  computed: {
    datePickerDisplay() {
      if (this.datePicker.from) {
        return this.datePicker.from + " - " + this.datePicker.to;
      } else {
        return this.datePicker + " - " + this.datePicker;
      }
    },
  },
  // mounted() {
  //   this.datePicker = {
  //     from: this.$moment().startOf("month").format("DD-MMM-YYYY"),
  //     to: this.$moment().format("DD-MMM-YYYY"),
  //   };
  // },
  methods: {
    changeDate() {
      this.datePickerMenu = false;
      this.$emit("change");
    },
    rangeStart() {
      const arrows = [
        ...document
          .getElementById("datePicker")
          .getElementsByClassName("q-date__navigation"),
      ];
      arrows.forEach((arrow) => {
        const buttons = [...arrow.getElementsByTagName("button")];
        buttons.forEach((button) => {
          button.disabled = true;
        });
      });
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  .datepicker {
    width: 160px;
    height: 30px;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    box-shadow: 0px 1px 1px 1px #bdbdbd40;
    border-radius: 1px;
    .datepicker-container {
      width: 100%;
      display: flex;
      justify-content: left;
      align-items: center;
    }
    .datepicker-icon {
      font-size: 16px;
      top: -1px;
    }
    .datepicker-text {
      margin-left: 5px;
      font-size: 10px;
    }
  }
  .q-date span {
    font-size: 10px;
  }
}

@media (min-width: 769px) {
  .datepicker {
    width: 226px;
    height: 40px;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    box-shadow: 0px 1px 1px 1px #bdbdbd40;
    border-radius: 1px;
    .datepicker-container {
      width: 100%;
      display: flex;
      justify-content: left;
      align-items: center;
    }
    .datepicker-icon {
      font-size: 28px;
      top: -2px;
    }
    .datepicker-text {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .q-date span {
    font-size: 14px;
  }
}
</style>
