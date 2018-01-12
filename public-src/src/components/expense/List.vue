<template>
  <main>
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Label</th>
        <th>Amount</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows">
        <td><i class="fa fa-check" v-if="row.isPaid"></i></td>
        <td>{{row.label}}<br /><small>{{row.transactionDate}}</small></td>
        <td>{{row.amount}} euro</td>
        <td><i class="fa fa-pencil-square-o" @click="edit(row.key)"></i></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td></td>
        <td>{{paid}} out of {{countOfExpenses}}</td>
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
  import numeral from 'numeral'
  import moment from 'moment'
  import {filter, map, sum} from 'ramda'

  export default {
    data() {
      return {
        expenses: [
          {
            amount: 629,
            billable: true,
            'is-paid': false,
            label: 'Hotel',
            'transaction-date': '2017-11-24'
          },
          {
            amount: 70,
            billable: false,
            'is-paid': true,
            label: 'Facutre Awani',
            'transaction-date': '2017-11-01'
          }
        ]
      }
    },
    computed: {
      rows() {
        return map((expense, index) => ({
          ...expense,
          key: index,
          isPaid: expense['is-paid'],
          amount: numeral(expense.amount).format(),
          transactionDate:moment(expense['transaction-date']).format('DD/MM/YYYY'),
        }), this.expenses)
      },
      paid() {
        return filter(e => e['is-paid'], this.expenses).length
      },
      countOfExpenses() {
        return this.expenses.length
      },
      paidAmount() {
        return sum(map(e => e.amount, filter(e => e['is-paid'], this.expenses)))
      },
      totalAmount() {
        return sum(map(e => e.amount, this.expenses))
      }
    }
    ,
    methods: {
      edit(id) {
        this.$router.push({name: 'ed-expense', params: { id }})
      }
    }
  }
</script>