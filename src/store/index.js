import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'
import initialBooksInfo from './books.json'
import initialAuthorsInfo from './authors.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authorsInfo: initialAuthorsInfo,
    booksInfo: initialBooksInfo
  },
  getters: {
    bookList(state) {
      return state.booksInfo.books
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
      let newBookList = state.booksInfo.books.filter((book) => {
        return book.id != id
      })

      let currentBook = state.booksInfo.books.filter((book) => {
        return book.id === id
      })[0]

      state.booksInfo.books = [
        ...newBookList,
        {
          ...currentBook,
          ...newBook
        }
      ]
    },
    addBook(state, newBook) {
      let lastId = ++state.booksInfo.lastId

      newBook.id = lastId
      state.booksInfo.books = [
        ...state.booksInfo.books,
        newBook
      ];
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
  }
})

export default store
