<template>
  <div class="table-container">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ tableTitle }}</h3>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Section</th>
              <th>Rank</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in paginatedcvProjectsData" :key="employee.employ_id">
              <td>{{ employee.full_name }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.rank }}</td>
              <td>{{ employee.effort_percentage + '%' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Back</button>
          <span>Page {{ currentPage }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage * itemsPerPage >= cvProjectsData.length"
          >Next...</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { anotherUrl } from "@/main";

export default {
  props: {
    tableTitle: String
  },
  data() {
    return {
      cvProjectsData: [],
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    paginatedcvProjectsData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.cvProjectsData.slice(startIndex, endIndex);
    }
  },
  created() {
    this.fetchCvProjectsDataFromAPI();
  },
  methods: {
    async fetchCvProjectsDataFromAPI() {
      try {
        const response = await axios.get(anotherUrl, { withCredentials: true });
        this.cvProjectsData = response.data;
      } catch (error) {
        console.error("Error fetching data from cv_projects API:", error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      const lastPage = Math.ceil(
        this.cvProjectsData.length / this.itemsPerPage
      );
      if (this.currentPage < lastPage) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style scoped>
.pagination {
  margin-top: 10px;
  float: right;
}

.pagination button {
  margin-right: 7px;
  margin-left: 7px;
  border-radius: 3px;
  color: rgb(0, 0, 0);

  cursor: pointer;
}
</style>