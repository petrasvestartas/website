<template>
  <button v-if="!link" :class="[mode, 'external-link']" :type="type">
    <slot></slot>
  </button>
  <router-link v-else-if="!isExternal" :to="to" :class="mode">
    <slot></slot>
  </router-link>
  <a v-else :href="to" :class="[mode, 'external-link']" target="_blank" rel="noopener noreferrer">
    <slot></slot>
  </a>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    },
    type: {
      type: String,
      required: false,
      default: 'submit'
    }
  },
  setup(props) {
    const isExternal = computed(() => {
      return /^(http|https):\/\//.test(props.to);
    });

    return {
      isExternal
    };
  }
});
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  font: inherit;
  background-color: #ffffff;
  border: 0px solid #000000;
  color: rgb(0, 0, 0);
  cursor: pointer;
  margin-right: 0.0rem;
  display: inline-block;
}

a:active {
  background-color: #ffffff;
  border-color: #ffffff;
  color: #000000;
}

button:hover,
a:hover,
button:active {
  background-color: #000000;
  border-color: #000000;
  color: #ffffff;
}

.flat {
  background-color: transparent;
  color: #000000;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #000000;
  color: #000000;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #000000;
}

.external-link {

  background-color: #efefef;
  color: #000000;
  cursor: pointer; /* Change cursor to pointer */
  outline: 2px solid #ffffff; /* Outer white border */
  outline-offset: -1px; /* Position the white border closer to the black border */
}

.external-link:hover {
  background-color: #000000;
  color: #ffffff;
}
</style>