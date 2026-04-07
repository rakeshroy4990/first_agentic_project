import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { HeaderConfig, UiMetadataResponse } from "../types/header";

export const useHeaderStore = defineStore("header", () => {
  const uniqueId = ref("");
  const response = ref<UiMetadataResponse | null>(null);
  const loading = ref(false);
  const error = ref("");

  const hasConfig = computed(() => response.value !== null);
  const config = computed<HeaderConfig | null>(() => {
    if (!response.value) return null;
    return {
      ...response.value.data.header,
      menu: response.value.data.menu
    };
  });

  const loadUiMetadata = async (pageUniqueId: string): Promise<void> => {
    loading.value = true;
    error.value = "";
    try {
      const apiResponse = await fetch(`/api/components/uiMetadata/${pageUniqueId}`);
      if (!apiResponse.ok) {
        throw new Error("Unable to load UI metadata.");
      }
      response.value = (await apiResponse.json()) as UiMetadataResponse;
      uniqueId.value = pageUniqueId;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unexpected error";
    } finally {
      loading.value = false;
    }
  };

  return {
    config,
    uniqueId,
    response,
    loading,
    error,
    hasConfig,
    loadUiMetadata
  };
});
