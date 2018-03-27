<template>
  <div class="container">
    <header>
      <router-link to="/">ifollow</router-link>
      <!-- div class="actions">
        <a class="new"></a>
      </div -->
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
  html, body, .container {
    font-family: Roboto, sans-serif;
    width: 100vw;
    height: 100vh;
    color: #16a085;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: #16a085;
    text-decoration: none;
  }

  small {
    font-size: .5em;
  }

  h1 {
    font-size: 1.25rem;
    line-height: 2rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    margin: .5em 0 1.5em;
  }

  .container {
    position: relative;
    height: calc(100vh - 64px);
    padding-top: 64px;
  }

  header {
    position: fixed;
    top: 0;
    height: 64px;
    width: 100vw;
    background: #2c3e50;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;

    a {
      font-size: 20px;
      font-weight: 500;
      color: #fff;
    }
  }

  main {
    height: calc(100% - 2rem);
    padding: 1rem;
    overflow: auto;

    .loading {
      position: relative;

      &::before {
        content: "Loading...";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: white;
        z-index: 10;
        text-align: center;
        padding-top: 10vh;
      }
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    text-align: left;
    width: 100%;
    margin-bottom: 56px;

    th {
      border-bottom: 2px solid #e7e9ed;
      padding: 0 0 1rem;
      font-weight: 700;
    }

    td {
      border-top: 1px solid #e7e9ed;
      padding: 1rem 0;
    }

    tfoot td {
      color: #2c3e50;
    }
  }

  .form-group {
    margin-bottom: 1rem;

    label, input {
      display: block;
    }

    label {
      line-height: 1rem;
      padding: .4rem 0;
    }

    input, textarea {
      font-size: 1rem;
      background: #fff;
      border: 1px solid #1abc9c;
      border-radius: 2px;
      color: #16a085;
      line-height: 1rem;
      max-width: 100%;
      padding: .5rem;
      box-sizing: border-box;
      width: 100%;
    }

    .switch {
      display: inline-block;
      position: relative;

      input {
        position: absolute;
        left: -100px;

        &:checked {
          & ~ .switch-bg::before {
            background-color: #1abc9c;
            opacity: .5;
          }

          & ~ .switch-bg::after {
            background-color: #1abc9c;
            transform: translateX(14px);
          }
        }
      }

      .switch-bg {
        display: block;
        position: relative;
        width: 34px;
        height: 14px;
        border-radius: 7px;
        margin-right: .5rem;

        &::before {
          position: absolute;
          content: "";
          background-color: #000;
          display: block;
          top: 1px;
          right: 0;
          bottom: -1px;
          left: 0;
          transition: opacity 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 7px;
          opacity: .2;
        }

        &::after {
          content: "";
          background-color: #f5f5f5;
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
          display: block;
          position: absolute;
          top: -2px;
          left: 0;
          width: 20px;
          height: 20px;
          transform: translateX(0);
          transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 10px;
          z-index: 1;
        }
      }
    }
  }

  .form-btn-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .5rem;
    padding-top: .5rem;

    button {
      font-size: 0.875rem;
      line-height: 2.25rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      height: 36px;
      padding: 0 1rem;
      border: none;
      border-radius: 2px;
      background: #f5f5f5;

      &.primary {
        color: #fff;
        background: #1abc9c;
      }
    }
  }

  .fab-new {
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    display: inline-block;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #1abc9c;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 1;

    &::before, &::after {
      content: "";
      position: absolute;
      z-index: -1;
      background: #fff;
    }

    &::before {
      top: 20px;
      left: 27px;
      width: 2px;
      height: 16px;
    }

    &::after {
      top: 27px;
      left: 20px;
      height: 2px;
      width: 16px;
    }
  }
</style>
