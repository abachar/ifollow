<template>
  <main :class="{ loading }">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Reported At</th>
        <th>Label</th>
        <th>Amount</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td><i class="fa fa-check" v-if="row.paid"></i></td>
        <td>{{row.reportedAt}}</small></td>
        <td>{{row.label}}</td>
        <td>{{row.amount}} euro</td>
        <td><i class="fa fa-pencil-square-o" @click="edit(row.id)"></i></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="2"></td>
        <td>{{countOfPaid}} out of {{countOfExpenses}}</td>
        <td colspan="2">{{paidAmount}} out of {{totalAmount}} euro</td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab" :to="{name: 'nw-expense'}">
      <i class="fa fa-plus"></i>
    </router-link>
  </main>
</template>

<script>
  import {
    countOfExpenses, countOfPaidExpenses, expensesAsList, formattedTotalOfPaidExpenses, loadExpenses,
    totalOfExpenses
  } from "../../functions";

  export default {
    data() {
      return {
        loading: true,
        expenses: null
      }
    },
    computed: {
      rows() { return expensesAsList(this.expenses) },
      countOfPaid() { return countOfPaidExpenses(this.expenses) },
      countOfExpenses() { return countOfExpenses(this.expenses) },
      paidAmount() { return formattedTotalOfPaidExpenses(this.expenses) },
      totalAmount() { return totalOfExpenses(this.expenses) }
    }
    ,
    methods: {
      edit(id) {
        this.$router.push({name: 'ed-expense', params: { id }})
      }
    },
    created() {
      loadExpenses()
        .then(expenses => {
          this.loading = false;
          this.expenses = expenses;
        });
    }
  }
</script>