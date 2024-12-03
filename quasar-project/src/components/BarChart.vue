<template>
  <div id="chart">
    <div id="chart-container" class="chart-container">
      <div
        id="chart-content"
        class="chart-content"
        :style="{ width: barContainer * chartData.length + 101 + 'px' }"
      >
        <div v-if="maxNumber === 0" class="empty-content">
          <div class="empty-content-container">
            <img
              src="images/empty.svg"
              alt="Empty Content"
              class="empty-content-image"
            />
          </div>
        </div>
        <div class="left-axis">
          <div class="left-axis-title">Jumlah Isu Hoaks</div>
          <div
            v-for="(data, index) in axisNumber"
            :key="index"
            class="left-axis-number"
            :style="{ bottom: 30 + (300 * data) / chartHeight + 'px' }"
          >
            {{ $thousand(data) }}
          </div>
        </div>
        <div
          v-for="(data, index) in chartData"
          :key="index"
          class="bar-container"
          :style="{ width: barContainer + 'px' }"
        >
          <div class="bottom-axis-number">
            {{ data.day }}
          </div>
          <div
            v-if="maxNumber !== 0 && data.total === 0"
            class="empty-bar"
            :style="{
              width: barWidth + 'px',
            }"
            @mouseover="mouseover(data, index)"
            @mouseleave="mouseleave()"
          />
          <div
            class="instagram-bar"
            :style="{
              width: barWidth + 'px',
              height: (300 * data.total) / chartHeight + 'px',
            }"
            @mouseover="mouseover(data, index)"
            @mouseleave="mouseleave()"
          />
          <div
            class="twitter-bar"
            :style="{
              width: barWidth + 'px',
              height: (300 * data.twitter) / chartHeight + 'px',
            }"
            @mouseover="mouseover(data, index)"
            @mouseleave="mouseleave()"
          />
        </div>
        <div
          id="tooltip"
          class="tooltip"
          :style="{
            top: tooltipTop,
            left: tooltipType === 'left' ? tooltipLeft : 'unset',
            right: tooltipType === 'right' ? tooltipRight : 'unset',
          }"
        >
          <table class="tooltip-table">
            <tbody>
              <tr>
                <td><div class="tooltip-instagram" /></td>
                <td class="tooltip-text">Instagram</td>
                <td class="tooltip-number">
                  {{ tooltipData ? tooltipData.instagram : "" }}
                </td>
              </tr>
              <tr>
                <td><div class="tooltip-twitter" /></td>
                <td class="tooltip-text">Twitter</td>
                <td class="tooltip-number">
                  {{ tooltipData ? tooltipData.twitter : "" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; justify-content: center">
      <div v-for="item in socmed" :key="item.name" class="legend-container">
        <div class="legend-bullet" :style="{ backgroundColor: item.color }" />
        <div class="legend-text">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    chartData: [],
    chartWidth: 0,
    chartHeight: 0,
    barWidth: 0,
    barContainer: 0,
    maxNumber: 0,
    axisNumber: [],
    socmed: [
      {
        name: "Twitter",
        color: "#FFB740",
      },
      {
        name: "Instagram",
        color: "#0465E4",
      },
    ],
    tooltipTop: "0px",
    tooltipLeft: "-1000px",
    tooltipRight: "-1000px",
    tooltipData: null,
    tooltipType: "left",
  }),
  mounted() {
    const elem = document.querySelector("#chart-container");
    new ResizeObserver(this.refreshChart).observe(elem);
  },
  methods: {
    refreshChart() {
      if (document.getElementById("chart-container")) {
        const rectChart = document
          .getElementById("chart-container")
          .getBoundingClientRect();
        this.chartWidth = rectChart.width - 101;
        this.barContainer = this.chartWidth / this.chartData.length;
        if (this.barContainer < 22) {
          this.barContainer = 22;
        }
        this.barWidth = this.barContainer / 2;
        let upperNumber = 0;
        let maxNumber = 0;
        for (const x in this.chartData) {
          if (this.chartData[x].total > maxNumber) {
            maxNumber = this.chartData[x].total;
          }
        }
        this.maxNumber = maxNumber;
        const string = maxNumber.toString();
        upperNumber = parseInt(string[0]) + 1;
        this.axisNumber = [];
        for (let x = 0; x <= upperNumber; x++) {
          let number = x;
          for (let y = 1; y < string.length; y++) {
            number = 10 * number;
          }
          this.axisNumber.push(number);
        }
        for (let x = 1; x < string.length; x++) {
          upperNumber = 10 * upperNumber;
        }
        this.chartHeight = upperNumber;
      }
    },
    mouseover(data, index) {
      this.tooltipTop = 280 - (300 * data.total) / this.chartHeight + "px";
      this.tooltipLeft =
        this.barContainer * index + 101 + this.barContainer / 2 + "px";
      this.tooltipData = data;
      setTimeout(() => {
        const scrollChart =
          document.getElementById("chart-container").scrollLeft;
        const rectChart = document
          .getElementById("chart-container")
          .getBoundingClientRect();
        const rectContent = document
          .getElementById("chart-content")
          .getBoundingClientRect();
        const rectTooltip = document
          .getElementById("tooltip")
          .getBoundingClientRect();
        if (rectTooltip.right + 1 > rectChart.right) {
          this.tooltipType = "right";
          this.tooltipRight =
            rectContent.width - scrollChart - rectChart.width + 1 + "px";
        }
      }, 0);
    },
    mouseleave() {
      this.tooltipTop = "0px";
      this.tooltipLeft = "-1000px";
      this.tooltipRight = "-1000px";
      this.tooltipData = null;
      this.tooltipType = "left";
    },
  },
};
</script>

<style>
#chart {
  .chart-container {
    width: 100%;
    height: 420px;
    font-size: 14px;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .chart-content {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  .empty-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
  }
  .empty-content-container {
    background-color: white;
  }
  .left-axis {
    width: 100px;
    height: 400px;
    background-color: white;
    position: sticky;
    left: 0;
    z-index: 1000;
  }
  .bar-container {
    position: relative;
    height: 400px;
    display: flex;
    justify-content: center;
  }
  .empty-bar {
    position: absolute;
    bottom: 40px;
    background-color: grey;
    height: 7px;
  }
  .instagram-bar {
    position: absolute;
    bottom: 40px;
    border-radius: 20px 20px 0 0;
    background-color: #0465e4;
  }
  .twitter-bar {
    position: absolute;
    bottom: 40px;
    border-radius: 20px 20px 0 0;
    background-color: #ffb740;
  }
  .tooltip-instagram {
    width: 18px;
    height: 9px;
    border-radius: 20px;
    background-color: #0465e4;
  }
  .tooltip-twitter {
    width: 18px;
    height: 9px;
    border-radius: 20px;
    background-color: #ffb740;
  }
  .legend-container {
    display: flex;
    align-items: center;
    margin: 20px;
  }
  .legend-bullet {
    width: 30px;
    height: 15px;
    border-radius: 20px;
  }
}

@media (max-width: 768px) {
  #chart {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    .empty-content-image {
      width: 100px;
      height: 100px;
    }
    .left-axis-title {
      position: absolute;
      top: 180px;
      right: 30px;
      transform: rotate(-90deg);
      width: 100px;
      font-family: "OpenSans Regular";
      font-size: 9px;
    }
    .left-axis-number {
      position: absolute;
      right: 10px;
      font-family: "OpenSans Regular";
      font-size: 9px;
    }
    .bottom-axis-number {
      position: absolute;
      bottom: -15px;
      width: 100%;
      height: 40px;
      padding: 10px;
      text-align: center;
      font-size: 9px;
    }
    .tooltip {
      height: 83px;
      background-color: white;
      box-shadow: 0px 4px 4px 0px #00000040;
      border-radius: 4px;
      position: absolute;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tooltip-table {
      width: 100%;
      border-spacing: 5px;
    }
    .tooltip-text {
      width: 50px;
      text-align: left;
      font-size: 10px;
      color: #292929;
    }
    .tooltip-number {
      text-align: right;
      font-size: 12px;
      color: #292929;
    }
    .legend-text {
      padding-left: 10px;
      font-family: "OpenSans Regular";
      font-size: 9px;
      color: #2c2c2c;
    }
  }
}

@media (min-width: 769px) {
  #chart {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    .left-axis-title {
      position: absolute;
      top: 180px;
      right: 30px;
      transform: rotate(-90deg);
      width: 100px;
      font-family: "OpenSans Regular";
      font-size: 11px;
    }
    .left-axis-number {
      position: absolute;
      right: 10px;
      font-family: "OpenSans Regular";
      font-size: 11px;
    }
    .bottom-axis-number {
      position: absolute;
      bottom: -15px;
      width: 100%;
      height: 40px;
      padding: 10px;
      text-align: center;
      font-size: 14px;
    }
    .tooltip {
      height: 83px;
      background-color: white;
      box-shadow: 0px 4px 4px 0px #00000040;
      border-radius: 4px;
      position: absolute;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tooltip-table {
      width: 100%;
      border-spacing: 10px;
    }
    .tooltip-text {
      width: 80px;
      text-align: left;
      font-size: 14px;
      color: #292929;
    }
    .tooltip-number {
      text-align: right;
      font-size: 18px;
      color: #292929;
    }
    .legend-text {
      padding-left: 10px;
      font-family: "OpenSans Regular";
      font-size: 11px;
      color: #2c2c2c;
    }
  }
}
</style>
