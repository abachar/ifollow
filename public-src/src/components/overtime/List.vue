<template>
  <main>
    <table>
      <thead>
      <tr>
        <th>Time slot</th>
        <th>Amount</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows">
        <td>{{row.formattedFrom}}<br/>{{row.formattedTo}}</td>
        <td>{{row.amount}} euro</td>
        <td><i class="fa fa-pencil-square-o" @click="edit(row.key)"></i></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td></td>
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
  import numeral from 'numeral'
  import moment from 'moment'
  import {sum, map} from 'ramda'

  export default {
    data() {
      return {
        overtimes: [
          {
            from: '2017-11-18T10:00:00+01:00',
            to: '2017-11-18T23:00:00+01:00'
          }
        ]
      }
    },
    computed: {
      rows() {
        return map(o => ({
          key: '',
          formattedFrom: moment(o.from).format('DD/MM/YYYY HH:mm'),
          formattedTo: moment(o.to).format('DD/MM/YYYY HH:mm'),
          amount: 0 // numeral(this.salaries[key]).format()
        }), this.overtimes)
      },
      sumOfAmounts() {
        return numeral(sum(map(r => r.amount, this.rows))).format()
      }
    }
    ,
    methods: {
      edit(id) {
        this.$router.push({name: 'ed-salary', params: { id }})
      }
    }
  }
</script>