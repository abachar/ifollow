<template>
  <div :class="{ loading }">
    <h1>Edit worked days</h1>

    <div class="form-group">
      <label for="month">Month</label>
      <input id="month" type="month" v-model="month">
    </div>
    <div class="form-group">
      <label for="worked-days">Worked days</label>
      <input id="worked-days" type="number" v-model="workedDays">
    </div>
    <div class="form-group">
      <label>Amount</label>
      <p>{{ amount }}</p>
    </div>
    <div class="form-btn-group">
      <button @click="cancel">Cancel</button>
      <button class="primary" @click="save">Save</button>
    </div>
  </div>
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
        workedDays: ''
      }
    },
    computed: {
      amount() {
        return this.workedDays * 750
      }
    },
    methods: {
      cancel() {
        this.$router.push({name: 'ls-worked-days'})
      },
      save() {
        db.ref('/worked-days')
          .child(this.id)
          .set({
            month: this.month,
            workedDays:  parseInt(this.workedDays),
            amount: parseInt(this.amount)
          })
          .then(() => this.$router.push({name: 'ls-worked-days'}))
      }
    },
    created() {
      if (this.$route.params.id) {
        db.ref(`/worked-days/${this.$route.params.id}`)
          .once('value')
          .then(snapshot => snapshot.val())
          .then(({month, workedDays}) => {
            this.loading = false;
            this.id = this.$route.params.id;
            this.month = month;
            this.workedDays = workedDays;
          });
      }
      else {
        this.loading = false;
        this.id = uuid()
      }
    }
  }
</script>