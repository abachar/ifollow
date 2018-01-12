<template>
  <main>
    <div class="form-group">
      <label for="transactionDate">Transaction date</label>
      <input id="transactionDate" type="date" v-model="transactionDate">
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
        <input type="checkbox" v-model="billable">
        Is billable
      </label>
    </div>
    <div class="form-group">
      <label>
        <input type="checkbox" v-model="paid">
        Is paid
      </label>
    </div>
    <div class="form-btn-group">
      <button @click="cancel">Cancel</button>
      <button class="primary" @click="save">Save</button>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        transactionDate: '',
        label: '',
        amount: '',
        billable: false,
        paid: false
      }
    },
    methods: {
      cancel() {
        this.$router.push({name: 'ls-expense'})
      },
      save() {
      }
    }
  }
</script>