<template>
  <div :class="{ loading }">
    <h1>List of worked days</h1>

    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Worked days</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id" @click="edit(row.id)">
        <td>{{row.formattedMonth}}</td>
        <td>{{row.workedDays}} days</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td>{{months}} months</td>
        <td>{{days}} days<br />{{billed}} euros</td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab-new" :to="{name: 'nw-worked-days'}"></router-link>
  </div>
</template>

<script>
  import {workedDaysAsList, formattedBilledWorkedDays, totalWorkedDays, loadWorkedDays} from "../../functions";

  export default {
    data() {
      return {
        loading: true,
        workedDays: null
      }
    },
    computed: {
      rows()   { return workedDaysAsList(this.workedDays) },
      months() { return this.rows.length },
      days()   { return totalWorkedDays(this.workedDays) },
      billed() { return formattedBilledWorkedDays(this.workedDays) }
    },
    methods: {
      edit(id) {
        this.$router.push({name: 'ed-worked-days', params: {id}})
      }
    },
    created() {
      loadWorkedDays()
        .then(workedDays => {
          this.loading = false;
          this.workedDays = workedDays;
        });
    }
  }
</script>
