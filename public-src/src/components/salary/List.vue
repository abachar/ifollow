<template>
  <main>
    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Salary</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows">
        <td>{{row.month}}</td>
        <td>{{row.salary}} euro</td>
        <td><i class="fa fa-pencil-square-o" @click="edit(row.key)"></i></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td>{{months}} months</td>
        <td>{{sumOfSalaries}} euro</td>
        <td></td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab" :to="{name: 'nw-salary'}">
      <i class="fa fa-plus"></i>
    </router-link>
  </main>
</template>

<script>
  import numeral from 'numeral'
  import moment from 'moment'
  import {keys, sum, values} from 'ramda'

  export default {
    data() {
      return {
        salaries: {
          '201711': 10988
        }
      }
    },
    computed: {
      rows() {
        return keys(this.salaries).map(key => ({
          key,
          month: moment(key, 'YYYYMM').format('MMMM YYYY'),
          salary: numeral(this.salaries[key]).format()
        }))
      },
      months() {
        return keys(this.salaries).length
      },
      sumOfSalaries() {
        return numeral(sum(values(this.salaries))).format()
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