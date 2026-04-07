<template>
  <header v-if="config" class="header" :style="headerStyle">
    <div class="left">
      <a class="brand" :href="config.brand.target" :style="{ color: config.theme.accentColor }">
        {{ config.brand.text }}
      </a>
      <nav class="menu">
        <a
          v-for="item in config.menu"
          :key="item.id"
          class="menu-item"
          :href="item.target"
          :style="{ color: config.theme.textColor }"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>

    <div class="right">
      <a
        v-for="item in config.actions"
        :key="item.id"
        class="action-item"
        :href="item.target"
        :style="{ color: config.theme.mutedTextColor }"
      >
        <span v-if="item.icon" class="action-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { HeaderConfig } from "../../types/header";

const props = defineProps<{
  config: HeaderConfig | null;
}>();

const headerStyle = computed(() => ({
  backgroundColor: props.config?.theme.backgroundColor ?? "#111418",
  color: props.config?.theme.textColor ?? "#f4f4f4"
}));
</script>

<style scoped>
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 1rem;
}

.left,
.right {
  align-items: center;
  display: flex;
  gap: 1rem;
}

.brand {
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
}

.menu,
.right {
  display: flex;
  gap: 0.9rem;
}

.menu-item,
.action-item {
  font-size: 0.92rem;
  text-decoration: none;
}

.action-item {
  align-items: center;
  display: inline-flex;
  gap: 0.35rem;
}

.action-icon {
  font-size: 0.8rem;
  text-transform: uppercase;
}
</style>
