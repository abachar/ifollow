<template>
  <main :class="{ loading }">
    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Worked days</th>
        <th>Amount</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{row.month}}</td>
        <td>{{row.workedDays}}</td>
        <td>{{row.amount}} euro</td>
        <td><i class="fa fa-pencil-square-o" @click="edit(row.id)"></i></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td></td>
        <td>{{sumOfWorkedDays}}</td>
        <td>{{sumOfAmounts}} euro</td>
        <td></td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab" :to="{name: 'nw-overtime'}">
      <i class="fa fa-plus"></i>
    </router-link>
  </main>
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