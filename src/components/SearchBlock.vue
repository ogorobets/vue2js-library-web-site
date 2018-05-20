<template>
  <div class="row">
    <div class="form-group col-xs-12 col-sm-4">
      <input type="text" class="search-input form-control" placeholder="Search query" v-model="searchQuery" @keyup="onSearchBook">
    </div>
    <div class="form-group col-xs-12 col-sm-8">
      <router-link class="add-book btn btn-primary" to="/add-book">
        <i class="ion ion-md-add"></i> <span class="btn-text">Add book</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'search-block',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    onSearchBook() {
      this.search(this.searchQuery)
      this.updatePagination()
      this.$router.push('/')
    },
    ...mapActions([
      'search',
      'updatePagination'
    ]),
  },
}
</script>

<style lang="scss">
.add-book {
  .ion.ion-md-add {
    font-size: 20px;
    padding-right: 5px;
  }

  .btn-text {
    position: relative;
    top: -2px;
  }
}
</style>
