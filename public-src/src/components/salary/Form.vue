<template>
  <main :class="{ loading }">
    <div class="form-group">
      <label for="month">Month</label>
      <input id="month" type="month" v-model="month">
    </div>
    <div class="form-group">
      <label for="salary">Salary</label>
      <input id="salary" type="number" v-model="salary">
    </div>
    <div class="form-btn-group">
      <button @click="cancel">Cancel</button>
      <button class="primary" @click="save">Save</button>
    </div>
  </main>
</template>

<script>
  import {db} from '../../firebase'
  import uuid from 'uuid-v4'

  export default {
    data() {
      return {
        loading: true,
        id: null,
        month: '',
        salary: ''
      }
    },
    methods: {
      cancel() {
        this.$router.push({name: 'ls-salary'})
      },
      save() {
        db.ref(`/salaries`)
          .child(this.id)
          .set({
            month: this.month,
            salary:  parseInt(this.salary)
          })
          .then(() => this.$router.push({name: 'ls-salary'}))
      }
    },
    created() {
      if (this.$route.params.id) {
        db.ref(`/salaries/${this.$route.params.id}`)
          .once('value')
          .then(snapshot => snapshot.val())
          .then(({month, salary}) => {
            this.loading = false;
            this.id = this.$route.params.id;
            this.month = month;
            this.salary = salary;
          });
      }
      else {
        this.loading = false;
        this.id = uuid()
      }
    }
  }
</script>