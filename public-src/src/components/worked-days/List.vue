<template>
  <main>
    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Worked days</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>November 2017</td>
        <td>21 days</td>
        <td><i class="fa fa-pencil-square-o"></i></td>
      </tr>
      <tr>
        <td>December 2017</td>
        <td>20 days</td>
        <td><i class="fa fa-pencil-square-o"></i></td>
      </tr>
      <tr>
        <td>January 2018</td>
        <td>22 days</td>
        <td><i class="fa fa-pencil-square-o"></i></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td>2 months</td>
        <td>63 days</td>
        <td></td>
      </tr>
      </tfoot>
    </table>

    <router-link class="fab" :to="{name: 'nw-worked-days'}">
      <i class="fa fa-plus"></i>
    </router-link>
  </main>
</template>