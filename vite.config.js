import { defineConfig } from 'vite';
import { defineConfig as defineTestConfig } from 'vitest/config';

export default defineConfig({
  test: defineTestConfig({
    globals: true,
    environment: 'node',
  }),
});
