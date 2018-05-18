<template>
  <div id="app">
    <header class="bs-docs-nav navbar navbar-static-top main-navbar">
      <router-link class="lib-home-link" to="/">
        <span class="title">Library Web Site</span> <i class="ion ion-md-book"></i>
      </router-link>
    </header>
    <main class="main-content">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <footer class="bs-docs-footer">
      Copyright © 2018 Oleksandr Horobets. All rights reserved.
    </footer>
  </div>
</template>

<script>
import BookList from './components/BookList.vue'
import EditBook from './components/EditBook.vue'

export default {
  name: 'app',
  components: {
    BookList, EditBook
  }
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/ionicons/dist/css/ionicons.css';

.navbar.main-navbar {
  text-align: center;
  background-color: #07c;
  color: #fff;
  margin: 0;
}

.lib-home-link,
.lib-home-link:hover,
.lib-home-link:active {
  text-decoration: none !important;
}

header .title {
  font-size: 30px;
  position: relative;
  top: -6px;
  padding-right: 10px;
  color: #fff;
}

header .ion.ion-md-book {
  color: #fff;
  font-size: 43px;
  line-height: 52px;
}

.main-content {
  padding: 20px;
  height: calc(100vh - 93px);
  overflow: scroll;
  min-height: 200px;
}

.bs-docs-footer {
  padding: 10px;
  background-color: #145d80;
  color: #fff;
}
</style>
