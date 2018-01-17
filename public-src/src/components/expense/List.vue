<template>
  <div :class="{ loading }">
    <h1>List of expenses</h1>

    <table>
      <thead>
      <tr>
        <th>Reported At</th>
        <th>Label</th>
        <th>Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id" @click="edit(row.id)" :class="{'non-billable': !row.billable, unpaid: !row.paid}">
        <td>{{row.reportedAt}}</small></td>
        <td>{{row.label}}</td>
        <td>{{row.amount}} euro</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td></td>
        <td>{{countOfPaid}} out of {{countOfExpenses}}</td>
        <td>{{paidAmount}} out of {{totalAmount}} euro</td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab-new" :to="{name: 'nw-expense'}"></router-link>
  </div>
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

<style lang="scss">
  tr {
    &.non-billable {
      text-decoration: underline;
    }

    &.unpaid {
      color: #ea183a;
    }
  }

</style>