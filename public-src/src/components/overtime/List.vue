<template>
  <div :class="{ loading }">
    <h1>List of overtimes</h1>

    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Worked days</th>
        <th>Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id" @click="edit(row.id)">
        <td>{{row.month}}</td>
        <td>{{row.workedDays}}</td>
        <td>{{row.amount}} euro</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td></td>
        <td>{{sumOfWorkedDays}}</td>
        <td>{{sumOfAmounts}} euro</td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab-new" :to="{name: 'nw-overtime'}"></router-link>
  </div>
</template>

<script>
  import {countOfOvertimeWorkedDays, loadOvertimes, overtimesAsList, formattedTotalOfOvertimeAmount} from "../../functions";

  export default {
    data() {
      return {
        loading: true,
        overtimes: null
      }
    },
    computed: {
      rows() { return overtimesAsList(this.overtimes) },
      sumOfWorkedDays() { return countOfOvertimeWorkedDays(this.overtimes) },
      sumOfAmounts() { return formattedTotalOfOvertimeAmount(this.overtimes) }
    },
    methods: {
      edit(id) {
        this.$router.push({name: 'ed-overtime', params: {id}})
      }
    },
    created() {
      loadOvertimes()
        .then(overtimes => {
          this.loading = false;
          this.overtimes = overtimes;
        });
    }
  }
</script>