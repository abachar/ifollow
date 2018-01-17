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
    <div class="form-group">
      <label for="receipt">Receipt</label>
      <div v-if="receiptUrl">
        <img style="width: 100%" :src="receiptUrl"/>
      </div>
      <div v-else>
        <div   v-if="progress" class="progress"><span :style="{width: progress}"></span></div>
        <input v-else id="receipt" name="receipt" type="file" accept="image/*" capture="camera" @change="uploadReceipt">
      </div>
    </div>
    <div class="form-btn-group">
      <button @click="cancel">Cancel</button>
      <button class="primary" @click="save">Save</button>
    </div>
  </div>
</template>

<script>
  import {db, storage} from '../../firebase'
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
        paid: false,
        progress: null,
        receiptUrl: null
      }
    },
    methods: {
      uploadReceipt(ev) {
        const file = ev.target.files[0];

        const uploadTask = storage
          .child('receipts/' + file.name)
          .put(file, { contentType: file.type });

        uploadTask.on('state_changed',
          snapshot => { this.progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) + '%' },
          error => {},
          () => { this.receiptUrl = uploadTask.snapshot.downloadURL }
        );
      },
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
            billable: this.billable,
            receiptUrl: this.receiptUrl
          })
          .then(() => this.$router.push({name: 'ls-expense'}))
      }
    },
    created() {
      if (this.$route.params.id) {
        db.ref(`/expenses/${this.$route.params.id}`)
          .once('value')
          .then(snapshot => snapshot.val())
          .then(({reportedAt, label, amount, paid, billable, receiptUrl}) => {
            this.loading = false;
            this.id = this.$route.params.id;
            this.reportedAt = reportedAt;
            this.label = label;
            this.amount = amount;
            this.paid = paid;
            this.billable = billable;
            this.receiptUrl = receiptUrl;
          });
      }
      else {
        this.loading = false;
        this.id = uuid()
      }
    }
  }
</script>

<style lang="scss">
  .progress {
    position: relative;
    width: 100%;
    height: 4px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
    margin: 1rem 0;
    border-radius: 2px;

    > span {
      background: #1abc9c;
      height: 4px;
      display: block;
    }
  }
</style>