<template>
  <div>
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
    <book-list :page="page" @deleteBook="onDeleteBook"></book-list>
    <nav aria-label="Page navigation" v-if="pages.length > 0">
      <ul class="pagination">
        <li>
          <router-link :to="firstPageUrl">
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </router-link>
        </li>
        <li v-for="currPage in pages"  :class="{ 'active': page === currPage.pageNum }">
          <router-link :to="currPage.url">
            {{ currPage.pageNum }}
          </router-link>
        </li>
        <li>
          <router-link :to="lastPageUrl">
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import BookList from './BookList.vue'

export default {
  components: {
    BookList
  },
  data() {
    return {
      page: 1,
      pages: [],
      firstPageUrl: '',
      lastPageUrl: '',
      searchQuery: ''
    }
  },
  methods: {
    updatePageNumber(to) {
      let pageNumber;
      if (to) {
        pageNumber = to.params.pnumber
      } else {
        pageNumber = this.$route.params.pnumber
      }
      this.page = Number(pageNumber) || 1
    },
    updatePagination() {
      debugger
      const BOOKS_PER_PAGE = 5
      const pagesNumber = Math.ceil((this.$store.getters.bookList.length / BOOKS_PER_PAGE))
      this.pages = []
      for(let i = 1; i < pagesNumber + 1; i++) {
        this.pages.push({
          pageNum: i,
          url: '/page/' + i
        });
      }
      this.firstPageUrl = '/page/1'
      this.lastPageUrl = '/page/' + pagesNumber
    },
    onDeleteBook() {
      updatePagination()
      updatePageNumber()
    },
    onSearchBook() {
      this.$store.dispatch( 'search', this.searchQuery )
      this.updatePagination()
      this.$router.push('/')
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePageNumber(to)
    }
  },
  created() {
     this.updatePageNumber()
     this.updatePagination()
  }
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
