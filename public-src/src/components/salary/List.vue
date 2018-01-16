<template>
  <main :class="{ loading }">
    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Salary</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{row.month}}</td>
        <td>{{row.salary}} euro</td>
        <td><i class="fa fa-pencil-square-o" @click="edit(row.id)"></i></td>
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
  import {loadSalaries, salariesAsList, formattedTotalOfSalaries} from "../../functions";

  export default {
    data() {
      return {
        loading: true,
        salaries: null
      }
    },
    computed: {
      rows() { return salariesAsList(this.salaries) },
      months() { return this.rows.length },
      sumOfSalaries() { return formattedTotalOfSalaries(this.salaries) }
    }
    ,
    methods: {
      edit(id) {
        this.$router.push({name: 'ed-salary', params: { id }})
      }
    },
    created() {
      loadSalaries()
        .then(salaries => {
          this.loading = false;
          this.salaries = salaries;
        });
    }
  }
</script>