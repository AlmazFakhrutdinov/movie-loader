<template>
  <section>
    <b-pagination
      :total="total"
      :current.sync="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    ></b-pagination>
  </section>
</template>

<script>
export default {
  props: ['pageNumber'],
  data() {
    return {
      total: 1540,
      current: 1,
      perPage: 50,
      rangeBefore: 3,
      rangeAfter: 1,
      order: "is-centered",
      size: "",
      isSimple: false,
      isRounded: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right"
    };
  },
  watch: {
    current() {
      this.$emit('changePageNumber', this.current)
    }
  }
};
</script>