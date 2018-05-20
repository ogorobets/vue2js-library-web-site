<template>
  <div>
    <search-block></search-block>
    <book-list></book-list>
    <pagination></pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import BookList from './BookList.vue'
import Pagination from './Pagination.vue'
import SearchBlock from './SearchBlock.vue'

export default {
  components: {
    BookList, Pagination, SearchBlock
  },
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
      'search'
    ]),
  },
}
</script>

