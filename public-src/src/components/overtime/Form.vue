<template>
  <main>
    <div class="form-group">
      <label for="fromDate">From</label>
      <input id="fromDate" type="date" v-model="fromDate">
      <input type="time" v-model="fromTime">
    </div>
    <div class="form-group">
      <label for="toDate">To</label>
      <input id="toDate" type="date" v-model="toDate">
      <input type="time" v-model="toTime">
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
        fromDate: '',
        fromTime: '',
        toDate: '',
        toTime: ''
      }
    },
    methods: {
      cancel() {
        this.$router.push({name: 'ls-overtime'})
      },
      save() {
      }
    }
  }
</script>