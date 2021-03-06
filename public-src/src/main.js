import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import App from './App.vue';
import Dashboard from './components/Dashboard.vue';
import FormWorkedDays from './components/worked-days/Form.vue';
import ListOfWorkedDays from './components/worked-days/List.vue';
import FormExpense from './components/expense/Form.vue';
import ListOfExpenses from './components/expense/List.vue';
import FormSalary from './components/salary/Form.vue';
import ListOfSalaries from './components/salary/List.vue';

// Sign in with a pop-up window
firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then(() => {

    // Install router & fire modules
    Vue.use(VueRouter);

    // Declare routes
    const router = new VueRouter({
      routes: [
        { name: 'home', path: '/', component: Dashboard},
        { name: 'nw-worked-days', path: '/worked-days/new', component: FormWorkedDays   },
        { name: 'ed-worked-days', path: '/worked-days/:id', component: FormWorkedDays   },
        { name: 'ls-worked-days', path: '/worked-days'    , component: ListOfWorkedDays },
        { name: 'nw-expense'    , path: '/expense/new'    , component: FormExpense      },
        { name: 'ed-expense'    , path: '/expense/:id'    , component: FormExpense      },
        { name: 'ls-expense'    , path: '/expense'        , component: ListOfExpenses   },
        { name: 'nw-salary'     , path: '/salary/new'     , component: FormSalary       },
        { name: 'ed-salary'     , path: '/salary/:id'     , component: FormSalary       },
        { name: 'ls-salary'     , path: '/salary'         , component: ListOfSalaries   }
      ]
    });

    // Create vue application
    new Vue({
      el: '#app',
      router,
      render: h => h(App)
    });
  });



