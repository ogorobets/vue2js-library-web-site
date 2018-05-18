<template>
  <div>
    <h2 v-if="pageHeading">{{ pageHeading }}</h2>
    <form>
      <div class="form-group" :class="{ 'has-error': errors.isbn }">
        <label lass="control-label" for="isbn-input">ISBN</label>
        <input type="text" class="form-control" id="isbn-input" placeholder="ISBN" v-model="form.isbn">
        <div v-if="errors.isbn" class="help-block">{{ errors.isbn }}</div>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.title }">
        <label lass="control-label" for="title-input">Title</label>
        <input type="text" class="form-control" id="title-input" placeholder="Title" v-model="form.title">
        <div v-if="errors.title" class="help-block">{{ errors.title }}</div>
      </div>
      <div class="form-group author-form-group" :class="{ 'has-error': errors.author }">
        <label lass="control-label" for="author-input">Author</label>
        <input type="text"
          class="form-control"
          id="author-input"
          placeholder="Author"
          v-model="form.author"
          @keyup="showAuthorDropdown">
        <div v-if="errors.author" class="help-block">{{ errors.author }}</div>
        <ul class="author-list dropdown-menu" v-if="(filterBy(authors, 'name', form.author).length > 0) && isAuthorDropdownShown">
          <li v-for="author in filterBy(authors, 'name', form.author)" @click="onAuthorItemClick(author)">
            {{ author.name }}
          </li>
        </ul>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.description }">
        <label lass="control-label" for="description-input">Description</label>
        <textarea class="form-control" id="description-input" placeholder="Description" v-model="form.description">
        </textarea>
        <div v-if="errors.description" class="help-block">{{ errors.description }}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-complete" @click.prevent="onComplete">Complete</button>
        <button class="btn btn-default btn-cancel" @click.prevent="onCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import filterBy from './../filters/filterBy.js'

export default {
  data() {
    return {
      isEditBook: false,
      isAuthorDropdownShown: false,
      pageHeading: '',
      currentBook: {},
      errors: {
      },
      form: {
        isbn: '',
        title: '',
        author: '',
        description: ''
      }
    }
  },
  methods: {
    getAuthorName(authorId) {
      return this.$store.getters.getAuthorName(authorId)
    },
    getAuthorId(authorName) {
      return this.$store.getters.getAuthorId(authorName)
    },
    addBook() {
      let newBook = {
        isbn: this.form.isbn,
        title: this.form.title,
        authorId: this.getAuthorId(this.form.author),
        description: this.form.description,
        recordCreationDate: new Date().toUTCString()
      }
      this.$store.dispatch('addBook', newBook )
    },
    editBook() {
      let newBook = {
        isbn: this.form.isbn,
        title: this.form.title,
        author: this.form.author,
        description: this.form.description,
      }

      this.$store.dispatch('editBook', { newBook, id: this.currentBook.id })
    },
    onCancel() {
      this.$router.push('/')
    },
    onComplete() {
      let errors = {};
      if (!this.form.isbn) {
        errors.isbn = 'Please fill in ISBN info'
      }

      if (!this.form.title) {
        errors.title = 'Please fill in title info'
      }

      if (!this.form.author) {
        errors.author = 'Please fill in author info'
      } else if (this.getAuthorId(this.form.author) === undefined) {
        errors.author = 'Please fill in author name using a predefined one'
      }

      if (!this.form.description) {
        errors.description = 'Please fill in description info'
      }

      this.errors = errors

      if (Object.keys(this.errors).length === 0) {
        if (this.isEditBook) {
          this.editBook();
        } else {
          this.addBook();
        }
        this.$router.push('/');
      }
    },
    onAuthorItemClick(author) {
      this.form.author = author.name;
      this.isAuthorDropdownShown = false;
    },
    filterBy: filterBy,
    showAuthorDropdown() {
      this.isAuthorDropdownShown = true;
    }
  },
  mounted() {
    this.isEditBook = this.$route.name === 'editBook';
    if (this.isEditBook) {
      this.pageHeading = 'Edit book info'
      let idToEdit = this.$route.params.id
      let book = this.$store.getters.getBookById(idToEdit)

      this.form = {
        ...book,
        author: this.getAuthorName(book.authorId)
      }
      this.currentBook = book;
      delete this.form.recordCreationDate
      delete this.form.id
    } else {
      this.pageHeading = 'Add new book'
    }
  },
  computed: {
    authors() {
      return this.$store.getters.authorsList
    }
  }
}
</script>

<style lang="scss">
.btn-complete {
  margin-right: 20px;
}
.author-form-group {
  position: relative;

  .author-list {
    display: block;
    z-index: 99999;

    & li{
      padding: 7px;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.3)
      }
    }
  }
}
</style>
