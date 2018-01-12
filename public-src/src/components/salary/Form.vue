<template>
  <main>
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
  export default {
    data() {
      return {
        month: '',
        salary: ''
      }
    },
    methods: {
      cancel() {
        this.$router.push({name: 'ls-salary'})
      },
      save() {
      }
    }
  }
</script>