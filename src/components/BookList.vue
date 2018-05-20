<template>
  <div>
    <div v-if="books.length > 0">
      <table class="books-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books">
            <td class="width-4-percent">{{ book.id }}</td>
            <td class="width-11-percent">{{ book.isbn }}</td>
            <td class="width-20-percent">{{ book.title }}</td>
            <td class="width-15-percent">{{ getAuthorName(book.authorId) }}</td>
            <td class="width-45-percent">{{ getShortDescription(book) }}</td>
            <td class="width-5-percent">
                <i class="action-icon ion ion-md-trash" title="Remove book" @click="removeBook(book.id)"></i>
                <router-link :to="{ name: 'editBook', params: { id: book.id } }">
                  <i class="action-icon glyphicon glyphicon-pencil" aria-hidden="true" title="Edit book"></i>
                </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <!--span class="glyphicon glyphicon-align-left" aria-hidden="true"></span-->
    </div>
  <h3 class="no-books" v-else-if="!isPageRoute">
    There are no books in the library at the moment
  </h3>
  <h3 class="no-books" v-else-if="isPageRoute && isPageNotExist">
    This page doesn't exist
  </h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'book-list',
  props: ['page'],
  data() {
    return {
      isPageRoute: false,
      isPageNotExist: false
    }
  },
  methods: {
    ...mapActions({
      removeBookFromStore: 'removeBook',
      updatePagination: 'updatePagination'
    }),
    getShortDescription(book) {
      const MAX_DESCRIPTION_LENGTH = 120;
      let shortDescription = '';
      if (book.description.length > MAX_DESCRIPTION_LENGTH) {
        shortDescription = book.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
      } else {
        shortDescription = book.description
      }
      return shortDescription
    },
    removeBook(bookIdToRemove) {
      this.removeBookFromStore(bookIdToRemove)
      this.checkNoPage()
      this.updatePagination()
    },
    getAuthorName(authorId) {
      return this.getAuthorNameFromStore(authorId)
    },
    checkNoPage(to) {
      const BOOKS_PER_PAGE = 5
      let routeName;
      if (to) {
        routeName = to.name
      } else {
        routeName = this.$route.name
      }
      if (routeName === 'page') {
        this.isPageRoute = true
        const startBookNumber = (this.page - 1) * BOOKS_PER_PAGE
        if (startBookNumber + 1 > this.bookList.length) {
          this.isPageNotExist = true
        } else {
          this.isPageNotExist = false
        }
      } else {
        this.isPageRoute = false
      }
    },
  },
  watch: {
    '$route' (to, from) {
      this.checkNoPage(to)
    }
  },
  computed: {
    books() {
      const BOOKS_PER_PAGE = 5
      const startBookNumber = (this.paginationData.page - 1) * BOOKS_PER_PAGE
      const endBookNumber = this.paginationData.page * BOOKS_PER_PAGE
      const bookListForPage = [
        ...this.bookList.slice(startBookNumber, endBookNumber)
      ]
      return bookListForPage
    },
    ...mapGetters({
      getAuthorNameFromStore: 'getAuthorName',
      bookList: 'bookList',
      paginationData: 'paginationData'
    })
  },
  mounted() {
    this.checkNoPage()
  },
  created() {
    this.updatePagination()
  }
}
</script>

<style lang="scss">
  .width-4-percent {
    width: 4%;
  }

  .width-5-percent {
    width: 5%;
  }

  .width-11-percent {
    width: 11%;
  }

  .width-20-percent {
    width: 20%;
  }

  .width-15-percent {
    width: 15%;
  }

  .width-45-percent {
    width: 45%;
  }

  .books-table {
    thead {
      color: #fff;

      th {
        padding: 20px;
        background-color: #008000;

        &:first-child {
          border-radius: 5px 0 0 0;
        }

        &:last-child {
          border-radius: 0 5px 0 0;
        }
      }
    }

    tbody {
      td {
        padding: 10px 20px;
      }

      tr:nth-child(odd) td {
        background-color: #d3d3d3;
      }

      tr:nth-child(even) td {
        background-color: #c3c3c3;
      }

      tr:last-child {
        td:first-child {
          border-radius: 0 0 0 5px;
        }

        td:last-child {
            border-radius: 0 0 5px 0;
        }
      }

      .action-icon {
        color: #0847bb;
        cursor: pointer;
        margin-right: 2px;

        &:hover {
          color: #5883d2
        }

        &.ion.ion-md-trash {
          font-size: 21px;
        }

        &.glyphicon.glyphicon-pencil {
          font-size: 17px;
          position: relative;
          top: 0px;
        }
      }
    }
  }

  .no-books {
    text-align: center;
  }
</style>
