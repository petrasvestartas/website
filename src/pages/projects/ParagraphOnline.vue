<template>
  <div>
    <h2 class="title">{{ type }}</h2>
    <p v-for="(part, index) in formattedText" :key="index">
      <span v-if="part.type === 'text'">{{ part.content }}</span>
      <base-button v-else :to="part.content" :link="true">{{ part.content }}</base-button>
    </p>
  </div>
</template>

<script>
export default {
  props: ['type', 'text'],
  computed: {
    formattedText() {
      const parts = [];
      const regex = /(https?:\/\/[^\s]+)/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(this.text)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: 'text', content: this.text.slice(lastIndex, match.index) });
        }
        parts.push({ type: 'link', content: match[0] });
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < this.text.length) {
        parts.push({ type: 'text', content: this.text.slice(lastIndex) });
      }

      return parts;
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 1.25em;
}
</style>