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
    searchString: ''
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
    }
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
    }
  }
})

export default store
