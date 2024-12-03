<template>
  <div id="emptystate">
    <div class="circle">
      <div class="image-container">
        <img src="images/empty-state.png" alt="Empty State" class="image" />
      </div>
    </div>
    <div class="text">Maaf, isu tidak tersedia</div>
  </div>
</template>

<script></script>

<style>
#emptystate {
  .image {
    width: 100%;
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  #emptystate {
    padding: 60px;
    text-align: center;
    .circle {
      width: 177px;
      height: 177px;
      margin: auto;
      background-color: rgba(190, 243, 255, 0.1);
      border-radius: 50%;
      display: grid;
    }
    .image-container {
      width: 100px;
      height: 100px;
      margin: auto;
    }
    .text {
      margin-top: 22px;
      font-size: 12px;
      line-height: 14.06px;
      color: #2b2b2b;
    }
  }
}

@media (min-width: 769px) {
  #emptystate {
    padding: 80px;
    text-align: center;
    .circle {
      width: 236px;
      height: 236px;
      margin: auto;
      background-color: rgba(190, 243, 255, 0.1);
      border-radius: 50%;
      display: grid;
    }
    .image-container {
      width: 133px;
      height: 133px;
      margin: auto;
    }
    .text {
      margin-top: 30px;
      font-size: 16px;
      line-height: 18.75px;
      color: #2b2b2b;
    }
  }
}
</style>
