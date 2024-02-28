<template>
  <div class="date-picker-container">
    <button class="date-picker-trigger" @click="toggleDatePicker">Select Date</button>
    <div class="date-picker-popup" :class="{ 'show': isDatePickerOpen }" ref="datePickerPopup">
      <label for="datepicker">Choose a date:</label>
      <input type="date" id="datepicker" name="datepicker" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  data() {
    return {
      isDatePickerOpen: false
    };
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  methods: {
    toggleDatePicker() {
      this.isDatePickerOpen = !this.isDatePickerOpen;
    },
    handleDocumentClick(event) {
      if (
        !this.$refs.datePickerPopup.contains(event.target) &&
        event.target !== this.$el.querySelector(".date-picker-trigger")
      ) {
        this.isDatePickerOpen = false;
      }
    }
  }
};
</script>


<style scoped>
.date-picker-popup {
  display: none;
}

.date-picker-popup.show {
  display: block;
}
</style>
