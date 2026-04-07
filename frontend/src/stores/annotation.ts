import { defineStore } from "pinia";
import { ref } from "vue";
import { compileAnnotationToUINodes } from "../core/compiler";
import type { ComponentAnnotation, UINode } from "../core/ui-types";

export const useAnnotationStore = defineStore("annotation", () => {
  const nodes = ref<UINode[]>([]);
  const error = ref("");
  const loading = ref(false);

  const loadAnnotation = async (): Promise<void> => {
    error.value = "";
    loading.value = true;
    try {
      const response = await fetch("/api/components/sample");
      if (!response.ok) {
        throw new Error("Unable to load annotation data.");
      }
      const annotation = (await response.json()) as ComponentAnnotation;
      nodes.value = compileAnnotationToUINodes(annotation);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unexpected error";
    } finally {
      loading.value = false;
    }
  };

  return {
    nodes,
    error,
    loading,
    loadAnnotation
  };
});
