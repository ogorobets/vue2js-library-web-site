import VueRouter from 'vue-router'
import BookListPage from './components/BookListPage.vue'
import EditBook from './components/EditBook.vue'

let router = new VueRouter({
  routes: [
    { path: '/page/:pnumber', name: 'page', component: BookListPage },
    { path: '/edit-book/:id', name: 'editBook', component: EditBook },
    { path: '/add-book', name:'addBook', component: EditBook },
    { path: '/', component: BookListPage }
  ]
})

export default router;
