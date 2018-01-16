<template>
  <main :class="{ loading }">
    <header>
      <div class="overview">
        <div class="left">
          <dl>
            <dt>turnover</dt>
            <dd>{{dashboard.overview.turnover}} <small>EUR</small></dd>
          </dl>
          <dl>
            <dt>management fees</dt>
            <dd>{{dashboard.overview.managementFees}} <small>EUR</small></dd>
          </dl>
          <dl>
            <dt>cashed</dt>
            <dd>{{dashboard.overview.cashed}} <small>EUR</small></dd>
          </dl>
        </div>
        <div class="right">
          <dl>
            <dt>treasury</dt>
            <dd>{{dashboard.overview.treasury}} <small>EUR</small></dd>
          </dl>
          <dl>
            <dt>estimated gross margin</dt>
            <dd>{{dashboard.overview.estimatedGrossMargin}} <small>EUR</small></dd>
          </dl>
        </div>
      </div>
    </header>
    <router-link class="card" to="/worked-days">
      <label>{{dashboard.workedDays}}  <small>DAYS</small></label>
    </router-link>
      <router-link class="card mountain-meadow" to="/expense">
        <label><span class="red">{{dashboard.expenses.paid}}</span> out of {{dashboard.expenses.count}}</label>
      </router-link>
    <router-link class="card white-smoke" to="/salary">
      <label>{{dashboard.salaries}} <small>EUR</small></label>
    </router-link>
      <router-link class="card" to="/overtime">
        <label>{{dashboard.overtimes}} <small>EUR</small></label>
      </router-link>
  </main>
</template>

<script>
  import {loadDashboard} from "../functions";

  export default {
    data() {
      return {
        loading: true,
        dashboard: {overview: {}, expenses: {}}
      }
    },
    created() {
      loadDashboard()
        .then(dashboard => {
          this.loading = false;
          this.dashboard = dashboard;
        });
    }
  }
</script>

<style lang="scss" scoped>
  main {
    display: grid;
    padding: 0;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 42vw 42vw;
    grid-gap: 1px;
    height: calc(100vh - 57px);

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