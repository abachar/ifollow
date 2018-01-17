<template>
  <div :class="{ loading }">
    <h1>Edit expense</h1>

    <div class="form-group">
      <label for="reportedAt">Reported at</label>
      <input id="reportedAt" type="datetime-local" v-model="reportedAt">
    </div>
    <div class="form-group">
      <label for="label">Label</label>
      <input id="label" type="text" v-model="label">
    </div>
    <div class="form-group">
      <label for="amount">Amount</label>
      <input id="amount" type="text" v-model="amount">
    </div>
    <div class="form-group">
      <label>
        <div class="switch">
          <input type="checkbox" v-model="billable">
          <div class="switch-bg"></div>
        </div>
        Is billable
      </label>
    </div>
    <div class="form-group">
      <label>
        <div class="switch">
          <input type="checkbox" v-model="paid">
          <div class="switch-bg"></div>
        </div>
        Is paid
      </label>
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
        reportedAt: null,
        label: null,
        amount: null,
        billable: false,
        paid: false
      }
    },
    methods: {
      cancel() {
        this.$router.push({name: 'ls-expense'})
      },
      save() {
        db.ref('/expenses')
          .child(this.id)
          .set({
            reportedAt: this.reportedAt,
            label: this.label,
            amount: parseInt(this.amount),
            paid: this.paid,
            billable: this.billable
          })
          .then(() => this.$router.push({name: 'ls-expense'}))
      }
    },
    created() {
      if (this.$route.params.id) {
        db.ref(`/expenses/${this.$route.params.id}`)
          .once('value')
          .then(snapshot => snapshot.val())
          .then(({reportedAt, label, amount, paid, billable}) => {
            this.loading = false;
            this.id = this.$route.params.id;
            this.reportedAt = reportedAt;
            this.label = label;
            this.amount = amount;
            this.paid = paid;
            this.billable = billable;
          });
      }
      else {
        this.loading = false;
        this.id = uuid()
      }
    }
  }
</script>