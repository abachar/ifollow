<template>
  <main>
    <div class="form-group">
      <label for="month">Months</label>
      <input id="month" type="month" v-model="month">
    </div>
    <div class="form-group">
      <label for="worked-days">Worked days</label>
      <input id="worked-days" type="number" v-model="workedDays">
    </div>
    <div class="form-btn-group">
      <button @click="cancel">Cancel</button>
      <button class="primary" @click="save">Save</button>
    </div>
  </main>
</template>

<script>
  import {db} from '../../firebase';
  import moment from 'moment';

  export default {
    data() {
      return {
        month: '',
        workedDays: 0
      }
    }
  }
</script>