<template>
  <div :class="{ loading }">
    <h1>List of salaries</h1>

    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Salary</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id" @click="edit(row.id)">
        <td>{{row.formattedMonth}}</td>
        <td>{{row.salary}} euro</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td>{{months}} months</td>
        <td>{{sumOfSalaries}} euro</td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab-new" :to="{name: 'nw-salary'}"></router-link>
  </div>
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