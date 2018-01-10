import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Dashboard from './components/Dashboard.vue';
import ListOfWorkedDays from './components/worked-days/List.vue';
import FormWorkedDays from './components/worked-days/Form.vue';
// import ExpenseReport from './components/expense-report/ExpenseReport.vue';
// import Salary from './components/salary/Salary.vue';
// import Overtime from './components/overtime/Overtime.vue';
import History from './components/History.vue';

// Install router & fire modules
Vue.use(VueRouter);

// Declare routes
const router = new VueRouter({
  routes: [
    {path: '/', component: Dashboard},
    {name: 'nw-worked-days', path: '/worked-days/new', component: FormWorkedDays},
    {name: 'ed-worked-days', path: '/worked-days/:id', component: FormWorkedDays},
    {name: 'ls-worked-days', path: '/worked-days', component: ListOfWorkedDays},
    // {path: '/expense-report', component: ExpenseReport},
    // {path: '/salary', component: Salary},
    // {path: '/overtime', component: Overtime},
    {name: 'history', path: '/history', component: History}
  ]
});

// Create vue application
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
