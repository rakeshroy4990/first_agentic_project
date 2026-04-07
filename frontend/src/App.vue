<template>
  <div>
    <p v-if="headerStore.error" class="error global-error">
      Header metadata error: {{ headerStore.error }}
    </p>
    <HeaderBar :config="headerStore.config" />
    <main class="container">
      <h1>Runtime HTML Renderer</h1>
      <p>Config + TypeScript compiler -> minimal HTML at runtime.</p>
      <button @click="store.loadAnnotation" :disabled="store.loading">
        {{ store.loading ? "Loading..." : "Load Annotation" }}
      </button>
      <p v-if="store.error" class="error">{{ store.error }}</p>
      <UiNodeRenderer v-if="store.nodes.length" :nodes="store.nodes" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import UiNodeRenderer from "./adapters/vue/UiNodeRenderer";
import HeaderBar from "./components/header/HeaderBar.vue";
import { useAnnotationStore } from "./stores/annotation";
import { useHeaderStore } from "./stores/header";

const store = useAnnotationStore();
const headerStore = useHeaderStore();

onMounted(async () => {
  await headerStore.loadUiMetadata("home-page");
});
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  margin: 2rem auto;
  max-width: 900px;
  padding: 0 1rem;
}

button {
  border: 1px solid #111;
  cursor: pointer;
  padding: 0.5rem 1rem;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

pre {
  background: #f7f7f7;
  border: 1px solid #ddd;
  margin-top: 1rem;
  overflow-x: auto;
  padding: 1rem;
}

.runtime-html :deep(h3) {
  margin-top: 1rem;
}

.error {
  color: #c00;
}

.global-error {
  margin: 0.5rem 1rem 0;
}
</style>
