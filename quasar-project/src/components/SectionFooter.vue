<template>
  <footer class="footer-section">
    <div class="footer-panel">
      <div class="footer-container">
        <div class="footer-text">&copy; 2025</div>
      </div>
    </div>
  </footer>
</template>

<script></script>

<style>
@media (max-width: 768px) {
  .footer-section {
    padding: 0 30px;
    background-color: #000718;
  }
  .footer-panel {
    max-width: 768px;
    margin: auto;
  }
  .footer-container {
    max-width: 768px;
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer-text {
    font-family: "Opensans Regular";
    font-size: 12px;
    color: white;
  }
}

@media (min-width: 769px) {
  .footer-section {
    padding: 0 60px;
    background-color: #000718;
  }
  .footer-panel {
    max-width: 1227px;
    margin: auto;
  }
  .footer-container {
    max-width: 1227px;
    min-height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer-text {
    font-family: "Opensans Regular";
    font-size: 16px;
    color: white;
  }
}
</style>
