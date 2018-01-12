<template>
  <main>
    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Worked days</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows">
        <td>{{row.month}}</td>
        <td>{{row.workedDays}} days</td>
        <td><i class="fa fa-pencil-square-o" @click="edit(row.key)"></i></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td>{{months}} months</td>
        <td>{{days}} days</td>
        <td></td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab" :to="{name: 'nw-worked-days'}">
      <i class="fa fa-plus"></i>
    </router-link>
  </main>
</template>

<script>
  import moment from 'moment'
  import {keys, sum, values} from 'ramda'

  export default {
    data() {
      return {
        workedDays: {
          '201711': 21,
          '201712': 20
        }
      }
    },
    computed: {
      rows() {
        return keys(this.workedDays).map(key => ({
          key,
          month: moment(key, 'YYYYMM').format('MMMM YYYY'),
          workedDays: this.workedDays[key]
        }))
      },
      months() {
        return keys(this.workedDays).length
      },
      days() {
        return sum(values(this.workedDays))
      }
    }
    ,
    methods: {
      edit(id) {
        this.$router.push({name: 'ed-worked-days', params: { id }})
      }
    }
  }
</script>