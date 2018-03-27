/**
 * helper functions
 * @author Abdelhakim Bachar
 */
import numeral from 'numeral'
import moment from 'moment'
import {and, compose, filter, length, map, multiply, prop, propEq, sort, sortBy, sum, toPairs, values} from 'ramda'
import {db} from './firebase'

// Configure numeral
import 'numeral/locales/fr';
numeral.locale('fr');

export const MANAGEMENT_FEES_RATE = 0.03;

// Helper functions
const formatAmount = v => numeral(v).format();
const yyyymmm2mmmmyyyy = s => moment(s, 'YYYY-MM').format('MMMM YYYY');

// Load worked days object
export const loadWorkedDays = () => db.ref('/worked-days').once('value').then(snapshot => snapshot.val());

// Convert worked days pair to object
const pairToWorkedDays = ([id, o]) => ({
  id,
  ...o,
  formattedMonth: yyyymmm2mmmmyyyy(o.month),
});

// Convert worked days object to list
export const workedDaysAsList = compose(sortBy(prop('month')), map(pairToWorkedDays), toPairs);

export const totalWorkedDays = compose(sum, map(prop('workedDays')), values);

const billedWorkedDays = compose(sum, map(prop('amount')), values);
export const formattedBilledWorkedDays = compose(formatAmount, billedWorkedDays);

// Load salaries object
export const loadSalaries = () => db.ref('/salaries').once('value').then(snapshot => snapshot.val());

// Convert salary pair to object
const pairToSalary = ([id, s]) => ({
  id,
  ...s,
  formattedMonth: yyyymmm2mmmmyyyy(s.month),
  salary: formatAmount(s.salary)
});

// Convert salaries object to list
export const salariesAsList = compose(sortBy(prop('month')), map(pairToSalary), toPairs);

export const totalOfSalaries = compose(sum, map(prop('salary')), values);
export const formattedTotalOfSalaries = compose(formatAmount, totalOfSalaries);

// Load overtimes object
export const loadOvertimes = () => db.ref('/overtimes').once('value').then(snapshot => snapshot.val());

// Convert overtime pair to object
const pairToOvertime = ([id, o]) => ({
  id,
  ...o,
  formattedMonth: yyyymmm2mmmmyyyy(o.month),
  amount: formatAmount(o.amount)
});

// Convert overtimes object to list
export const overtimesAsList = compose(sortBy(prop('month')), map(pairToOvertime), toPairs);
export const totalOfOvertimeAmount = compose(sum, map(prop('amount')), values);
export const formattedTotalOfOvertimeAmount = compose(formatAmount, totalOfOvertimeAmount);

// Load overtimes object
export const loadExpenses = () => db.ref('/expenses').once('value').then(snapshot => snapshot.val());

// Convert expenses pair to object
const pairToExpense = ([id, e]) => ({
  id,
  ...e,
  amount: formatAmount(e.amount),
  reportedAt: moment(e.reportedAt, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY HH:mm')
});

// Convert expenses object to list
const compareExpense = (a, b) => moment(a.reportedAt, 'DD/MM/YYYY HH:mm').diff(moment(b.reportedAt, 'DD/MM/YYYY HH:mm'));
export const expensesAsList = compose(sort(compareExpense), map(pairToExpense), toPairs);

export const countOfExpenses = compose(length, values);

export const countOfPaidExpenses = compose(length, filter(propEq('paid', true)), values);

export const totalOfExpenses = compose(formatAmount, sum, map(prop('amount')), values);

export const totalOfPaidNonBillableExpenses = compose(sum, map(prop('amount')), filter(and(propEq('paid', true), propEq('billable', false))), values);
export const totalOfPaidExpenses = compose(sum, map(prop('amount')), filter(propEq('paid', true)), values);
export const formattedTotalOfPaidExpenses = compose(formatAmount, totalOfPaidExpenses);

// Calculate the turnover
const totalTurnover = rawData => billedWorkedDays(prop('worked-days', rawData)) + totalOfOvertimeAmount(prop('overtimes', rawData));
const managementFees = compose(multiply(MANAGEMENT_FEES_RATE), billedWorkedDays, prop('worked-days'));
const totalCashed = rawData => totalOfSalaries(prop('salaries', rawData)) + totalOfPaidNonBillableExpenses(prop('expenses', rawData));
const totalTreasury = rawData => totalTurnover(rawData) - totalCashed(rawData) - managementFees(rawData);
const estimatedGrossMargin = rawData => {
  const expectedWorkedMonths = 10;
  const paidMonths = compose(length, values, prop('salaries'))(rawData);
  const remainPaidMonths = expectedWorkedMonths - paidMonths;
  const avgSalary = totalOfSalaries(prop('salaries', rawData)) / paidMonths;

  const workedMonths = compose(length, values, prop('worked-days'))(rawData);
  const remainWorkedMonths = expectedWorkedMonths - workedMonths;
  const avgWorkedDays = billedWorkedDays(prop('worked-days', rawData)) / workedMonths;

  return totalTreasury(rawData) + ((avgWorkedDays * (1 - MANAGEMENT_FEES_RATE) * remainWorkedMonths) - (avgSalary * remainPaidMonths));
};

// Build dashboard object
const mapDashboard = rawData => ({
  overview: {
    turnover: formatAmount(totalTurnover(rawData)),
    managementFees: formatAmount(managementFees(rawData)),
    cashed: formatAmount(totalCashed(rawData)),
    treasury: formatAmount(totalTreasury(rawData)),
    estimatedGrossMargin: formatAmount(estimatedGrossMargin(rawData))
  },
  workedDays: totalWorkedDays(rawData['worked-days']),
  salaries: totalOfSalaries(rawData.salaries),
  expenses: {
    paid: countOfPaidExpenses(rawData.expenses),
    count: countOfExpenses(rawData.expenses)
  },
  overtimes: totalOfOvertimeAmount(rawData.overtimes)
});

// Load dashboard
export const loadDashboard = () => db.ref('/').once('value').then(snapshot => mapDashboard(snapshot.val()));
