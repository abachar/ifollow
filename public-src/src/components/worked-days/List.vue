<template>
  <main :class="{ loading }">
    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Worked days</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{row.month}}</td>
        <td>{{row.workedDays}} days</td>
        <td><i class="fa fa-pencil-square-o" @click="edit(row.id)"></i></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td>{{months}} months</td>
        <td>{{days}} days<br />{{billed}} euros</td>
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
