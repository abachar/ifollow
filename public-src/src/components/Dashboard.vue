<template>
  <main>
    <header>
      <div class="overview">
        <div class="left">
          <dl>
            <dt>Chiffre d'affaires</dt>
            <dd>20 249
              <small>EUR</small>
            </dd>
          </dl>
          <dl>
            <dt>Frais de gestion</dt>
            <dd>456
              <small>EUR</small>
            </dd>
          </dl>
          <dl>
            <dt>Encaissé</dt>
            <dd>20 249
              <small>EUR</small>
            </dd>
          </dl>
        </div>
        <div class="right">
          <dl>
            <dt>Trésorerie</dt>
            <dd>12 245
              <small>EUR</small>
            </dd>
          </dl>
          <dl>
            <dt>Bénéfice brut</dt>
            <dd>25 342
              <small>EUR</small>
            </dd>
          </dl>
        </div>
      </div>
    </header>
    <router-link class="card" to="/worked-days">
      <label>21
        <small>JOURS</small>
      </label>
      <p>travaillés</p>
    </router-link>
    <router-link class="card mountain-meadow" to="/expense-report">
      <label><span class="red">2</span> / 5</label>
      <p>notes de frais</p>
    </router-link>
    <router-link class="card white-smoke" to="/salary">
      <label>21 954
        <small>EUR</small>
      </label>
      <p>salaire</p>
    </router-link>
    <router-link class="card" to="/overtime">
      <label>23
        <small>HEURES</small>
      </label>
      <p>supplémentaires</p>
    </router-link>
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: grid;
    padding: 0;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 40vw 40vw;
    grid-gap: 1px;

    header {
      grid-column: 1 / 3;
      background: #2c3e50;
      position: relative;

      .overview {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2rem;

        .left {
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
          grid-gap: 1.2rem;
        }

        .right {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-gap: 1.2rem;

          dd {
            font-size: 2.2rem;
          }
        }
      }

      dt {
        font-size: .6em;
        text-transform: uppercase;
        margin-bottom: .4rem;
      }

      dd {
        color: #fff;
        font-size: 1.2em;
      }
    }

    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .red {
        color: #ea386d;
      }

      label {
        font-size: 1.8rem;
        line-height: 2.8rem;
        height: 2.8rem;
        margin-bottom: .5rem;
      }

      &.white-smoke {
        background: #f5f5f5;
      }

      &.mountain-meadow {
        background: #1abc9c;
        color: #fff;
      }
    }
  }
</style>