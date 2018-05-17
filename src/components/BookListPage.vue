<template>
  <div>
    <router-link to="/add-book">
      <a class="add-book btn btn-primary"><i class="ion ion-md-add"></i> <span class="btn-text">Add book</span></a>
    </router-link>
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
      lastPageUrl: ''
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
