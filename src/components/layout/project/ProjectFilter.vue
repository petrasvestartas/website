<template>
  <base-card>
    <h2>Filter </h2>
    <div>
      <span class="filter-option">
        <input type="checkbox" id="architecture" checked @change="setFilter" />
        <label for="architecture">architecture</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="prototypes" checked @change="setFilter" />
        <label for="prototypes">prototypes</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="research" checked @change="setFilter" />
        <label for="research">research</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="teaching" checked @change="setFilter" />
        <label for="teaching">teaching</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="tools" checked @change="setFilter" />
        <label for="tools">tools</label>
      </span>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        architecture: true,
        prototypes: true,
        research: true,
        teaching: true,
        tools: true
      }
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters); // to communicate with the parent component
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 30px;
  margin-left: 15px;
  font-size: 1rem;
}

div {
  padding-bottom: 15px;
}

.filter-options {
  display: flex;
  flex-direction: column;
}

.filter-option {
  display: flex;
  align-items: center;
  margin-bottom: 0.0rem;
  margin-left: 15px;
}

.filter-option input {
  margin-right: 0.5rem;
  appearance: none;
  width: 10px;
  height: 10px;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  position: relative;
}

.filter-option input:checked {
  background-color: #000;
}

.filter-option input:checked::after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0px;
  height: 0px;
  border-radius: 50%;
  background-color: rgb(0, 0, 0);
}

.filter-option label {
  background-color: #ffffff;
  color: #000000;
  padding: 0.0rem 0.0rem;
  display: inline-block;
  margin-right: 0.5rem;
  font-size: 0.75rem; /* Change text size here */
}
</style>