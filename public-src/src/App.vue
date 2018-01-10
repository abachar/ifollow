<template>
  <div class="container">
    <h1>
      <router-link to="/">ifollow</router-link>
      <i class="fa fa-table"></i>
    </h1>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  html, body, .container {
    font: 400 18px/20px 'Lato', sans-serif;
    width: 100vw;
    height: 100vh;
  }

  h1 {
    display: block;
    background: #2c3e50;
    font-size: 1.5rem;
    padding: .8rem;
    color: #fff;
    line-height: 1em;
    position: relative;

    a {
      color: #fff;
      text-decoration: none;
    }

    .fa {
      font-size: 1rem;
      position: absolute;
      top: 1.2rem;
      right: .8rem;
    }
  }

  a {
    color: #16a085;
    text-decoration: none;
  }

  small {
    font-size: .5em;
  }

  main {
    color: #16a085;
    padding: 1rem;
    height: calc(100vh - 57px);

    .form-group {
      display: grid;
      margin-bottom: .5rem;

      label, input {
        display: block;
      }

      label {
        line-height: 1rem;
        padding: .4rem 0;
      }

      input {
        background: #fff;
        border: 1px solid #2c3e50;
        border-radius: 2px;
        color: #50596c;
        line-height: 1rem;
        max-width: 100%;
        padding: .35rem .4rem;
      }
    }

    .form-btn-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: .5rem;
      padding-top: .5rem;

      button {
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        border: 1px solid #2c3e50;
        padding: 5px;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 2px;
        color: #2c3e50;
        background: transparent;

        &.primary {
          background: #2c3e50;
          color: #fff;
        }
      }
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
      text-align: left;
      width: 100%;

      th {
        border-bottom: 2px solid #e7e9ed;
        padding: .6rem 0;
        font-weight: 700;
      }

      td {
        border-top: 1px solid #e7e9ed;
        padding: .6rem 0;
      }

      tfoot td {
        color: #2c3e50;
      }
    }

    .fab {
      color: #fff;
      z-index: 10;
      padding: 0;
      background: #f44336;
      border-radius: 50%;
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      width: 56px;
      height: 56px;
      line-height: 56px;
      border: 0;
      text-align: center;
      font-size: 1.2rem;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
  }
</style>
