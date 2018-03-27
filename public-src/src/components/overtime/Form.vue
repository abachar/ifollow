<template>
  <div :class="{ loading }">
    <h1>Edit overtime</h1>

    <div class="form-group">
      <label for="month">Month</label>
      <input id="month" type="month" v-model="month">
    </div>
    <div class="form-group">
      <label>Amount</label>
      <input id="amount" type="number" v-model="amount">
    </div>
    <div class="form-group">
      <label for="note">Note</label>
      <textarea id="note" rows="3" v-model="note"></textarea>
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
        amount: '',
        note: ''
      }
    },
    computed: {
      amount() {
        return this.workedDays * 750
      }
    },
    methods: {
      cancel() {
        this.$router.push({name: 'ls-overtime'})
      },
      save() {
        db.ref('/overtimes')
          .child(this.id)
          .set({
            month: this.month,
            amount:  parseInt(this.amount),
            note: this.note
          })
          .then(() => this.$router.push({name: 'ls-overtime'}))
      }
    },
    created() {
      if (this.$route.params.id) {
        db.ref(`/overtimes/${this.$route.params.id}`)
          .once('value')
          .then(snapshot => snapshot.val())
          .then(({month, amount, note}) => {
            this.loading = false;
            this.id = this.$route.params.id;
            this.month = month;
            this.amount = amount;
            this.note = note;
          });
      }
      else {
        this.loading = false;
        this.id = uuid()
      }
    }
  }
</script>