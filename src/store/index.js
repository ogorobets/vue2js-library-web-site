import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'
import initialBooksInfo from './books.json'
import initialAuthorsInfo from './authors.json'
import filterBy from './../filters/filterBy.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authorsInfo: initialAuthorsInfo,
    booksInfo: initialBooksInfo,
    searchString: '',
    pagination: {
      page: 1,
      pages: [],
      firstPageUrl: '',
      lastPageUrl: '',
    }
  },
  getters: {
    bookList(state) {
      return filterBy(state.booksInfo.books, 'title', state.searchString)
    },
    authorsList(state) {
      return state.authorsInfo.authors
    },
    getBookById(state) {
      return (idToEdit) => {
        let bookArr = state.booksInfo.books.filter((book) => {
          return book.id === idToEdit
        })

        if (bookArr.length > 0) {
          return bookArr[0]
        }
      }
    },
    getAuthorName(state) {
      return (authorId) => {
        let authorArr = state.authorsInfo.authors.filter((author) => {
          return author.id === authorId
        })

        if (authorArr.length > 0) {
          return authorArr[0].name
        }
      }
    },
    getAuthorId(state) {
      return (authorName) => {
        let authorArr = state.authorsInfo.authors.filter((currAuthor) => {
          return currAuthor.name === authorName
        })

        if (authorArr.length > 0) {
          return authorArr[0].id
        }
      }
    },
    paginationData(state) {
      return state.pagination
    }
  },
  mutations: {
    set(state, {type, items}) {
      state[type] = items
    },
    removeBook(state, bookIdToRemove) {
      state.booksInfo.books = state.booksInfo.books.filter((currentBook) => {
        return currentBook.id !== bookIdToRemove
      })
    },
    editBook(state, { newBook, id}) {
      state.booksInfo.books = state.booksInfo.books.map((book) => {
        if (book.id != id) {
          return book;
        } else {
          return {
            ...book,
            ...newBook
          }
        }
      })
    },
    addBook(state, newBook) {
      let lastId = ++state.booksInfo.lastId

      newBook.id = lastId
      state.booksInfo.books = [
        ...state.booksInfo.books,
        newBook
      ];
    },
    search(state, query) {
      state.searchString = query
    },
    updatePagination(state) {
      const BOOKS_PER_PAGE = 5
      const pagesNumber = Math.ceil((state.booksInfo.books.length / BOOKS_PER_PAGE))
      state.pagination.pages = []
      for(let i = 1; i < pagesNumber + 1; i++) {
        state.pagination.pages.push({
          pageNum: i,
          url: '/page/' + i
        });
      }
      state.pagination.firstPageUrl = '/page/1'
      state.pagination.lastPageUrl = '/page/' + pagesNumber
    },
    updatePageNumber(state, pageNumber) {
      state.pagination.page = Number(pageNumber) || 1
    },
  },
  actions: {
    removeBook({ commit }, id) {
      commit('removeBook', id)
    },
    editBook({ commit }, { newBook, id}) {
      commit('editBook', { newBook, id})
    },
    addBook({ commit }, newBook) {
      commit('addBook', newBook)
    },
    search({ commit }, query) {
      commit('search', query)
    },
    updatePagination({ commit }) {
      commit('updatePagination')
    },
    updatePageNumber({ commit }, pageNumber) {
      commit('updatePageNumber', pageNumber)
    }
  }
})

export default store
