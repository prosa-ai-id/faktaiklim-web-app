<template>
  <section class="collaboration-section">
    <div class="collaboration-panel">
      <div class="collaboration-container">
        <div class="collaboration-left">
          <div class="collaboration-text">
            Platform ini dibangun melalui kolaborasi:
          </div>
          <div class="collaboration-logo-container">
            <div class="collaboration-logo">
              <div>
                <img
                  src="images/collaboration/Kerjasamalogo.png"
                  alt="Logo Kerjasama"
                  class="logo-kerjasama"
                />
              </div>
            </div>
            <div class="collaboration-logo">
              <div>
                <img
                  src="images/collaboration/GIZlogo.png"
                  alt="Logo GIZ"
                  class="logo-giz"
                />
              </div>
            </div>
            <div class="collaboration-logo">
              <div>
                <img
                  src="images/collaboration/Bappenaslogo.png"
                  alt="Logo Bappenas"
                  class="logo-bappenas"
                />
              </div>
            </div>
            <div class="collaboration-logo">
              <div>
                <img
                  src="images/collaboration/FFlogo.png"
                  alt="Logo Fair Forward"
                  class="logo-ff"
                />
              </div>
            </div>
            <div class="collaboration-logo">
              <div>
                <img
                  src="images/collaboration/Prosalogo.png"
                  alt="Logo Prosa"
                  class="logo-prosa"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="collaboration-right">
          <div class="collaboration-text">Bekerjasama dengan:</div>
          <div class="collaboration-logo-container">
            <div class="collaboration-logo">
              <div>
                <img
                  src="images/collaboration/BMKGlogo.png"
                  alt="Logo BMKG"
                  class="logo-bmkg"
                />
              </div>
            </div>
            <div class="collaboration-logo">
              <div>
                <img
                  src="images/collaboration/Komdigilogo.png"
                  alt="Logo Komdigi"
                  class="logo-komdigi"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script></script>

<style>
@media (max-width: 768px) {
  .collaboration-section {
    margin-top: 30px;
    background-color: #f1f1f1;
    padding: 0 30px;
  }
  .collaboration-panel {
    max-width: 768px;
    margin: auto;
  }
  .collaboration-container {
    max-width: 768px;
    padding: 15px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 15px;
    color: #646464;
  }
  .collaboration-text {
    font-family: "Montserrat Semi Bold";
    font-size: 12px;
  }
  .collaboration-logo-container {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 15px;
  }
  .collaboration-logo {
    height: 50px;
    display: flex;
    align-items: center;
  }
  .logo-kerjasama {
    width: calc(0.5 * 151px);
  }
  .logo-giz {
    width: calc(0.5 * 142px);
  }
  .logo-bappenas {
    width: calc(0.5 * 96px);
  }
  .logo-ff {
    width: calc(0.5 * 171px);
  }
  .logo-prosa {
    width: calc(0.5 * 98px);
  }
  .logo-bmkg {
    width: calc(0.5 * 51px);
  }
  .logo-komdigi {
    width: calc(0.5 * 86px);
  }
}

@media (min-width: 769px) {
  .collaboration-section {
    margin-top: 60px;
    background-color: #f1f1f1;
    padding: 0 60px;
  }
  .collaboration-panel {
    max-width: 1227px;
    margin: auto;
  }
  .collaboration-container {
    max-width: 1227px;
    padding: 30px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 30px;
    color: #646464;
  }
  .collaboration-left {
    min-width: 300px;
  }
  .collaboration-right {
    min-width: 300px;
  }
  .collaboration-text {
    font-family: "Montserrat Semi Bold";
    font-size: 18px;
    line-height: 28px;
  }
  .collaboration-logo-container {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
  .collaboration-logo {
    height: 120px;
    display: flex;
    align-items: center;
  }
  .logo-kerjasama {
    width: 151px;
  }
  .logo-giz {
    width: 142px;
  }
  .logo-bappenas {
    width: 96px;
  }
  .logo-ff {
    width: 171px;
  }
  .logo-prosa {
    width: 98px;
  }
  .logo-bmkg {
    width: 51px;
  }
  .logo-komdigi {
    width: 86px;
  }
}
</style>
