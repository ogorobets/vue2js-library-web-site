<template>
  <nav aria-label="Page navigation" v-if="paginationData.pages.length > 0">
    <ul class="pagination">
      <li>
        <router-link :to="paginationData.firstPageUrl">
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </router-link>
      </li>
      <li v-for="currPage in paginationData.pages"  :class="{ 'active': paginationData.page === currPage.pageNum }">
        <router-link :to="currPage.url">
          {{ currPage.pageNum }}
        </router-link>
      </li>
      <li>
        <router-link :to="paginationData.lastPageUrl">
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'pagination',
  methods: {
    ...mapActions({
      updatePageNumberInStore: 'updatePageNumber',
    }),
    updatePageNumber(routeTo) {
      let pageNumber;
      if (routeTo) {
        pageNumber = routeTo.params.pnumber
      } else {
        pageNumber = this.$route.params.pnumber
      }

      this.updatePageNumberInStore(pageNumber)
    },
  },
  computed: {
    ...mapGetters([
      'paginationData'
    ])
  },
  watch: {
    '$route' (to, from) {
      this.updatePageNumber(to)
    }
  },
  created() {
    this.updatePageNumber()
  }
}

</script>
