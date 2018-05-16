<template>
  <div class="dashboard" :class="{ loading }">
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
    <router-link class="card" to="/worked-days">
      <label>{{dashboard.workedDays}}  <small>DAYS</small></label>
    </router-link>
    <router-link class="card mountain-meadow" to="/salary">
      <label>{{dashboard.salaries}} <small>EUR</small></label>
    </router-link>
    <router-link class="card card-large white-smoke" to="/expense">
      <label>
        {{dashboard.expenses.paid}} <small>out of</small> {{dashboard.expenses.count}}
      </label>
      <label>
        {{dashboard.expenses.paidAmount}} <small>out of</small> {{dashboard.expenses.totalAmount}} <small>EUR</small>
      </label>
    </router-link>
  </div>
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
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 42vw 42vw;
    grid-gap: 1px;
    height: calc(100% + 2rem);
    margin: -1rem;
    position: relative;
    z-index: 1;

    .overview {
      grid-column: 1 / 3;
      background: #2c3e50;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
      padding: 1rem;
      align-items: end;

      dt {
        font-size: .6em;
        text-transform: uppercase;
        margin-bottom: .4rem;
      }

      dd {
        color: #fff;
        font-size: 1.5em;
      }

      .left {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-gap: 1.5rem;
      }

      .right {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-gap: 1.5rem;

        dd {
          font-size: 2.5rem;
        }
      }
    }

    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.card-large {
        grid-column: 1 / 3;
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