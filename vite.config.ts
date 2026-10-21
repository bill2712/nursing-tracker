import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/nursing-tracker/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      build: {
        rollupOptions: {
          output: {
            // Split large libraries into their own long-lived cached files.
            manualChunks(id) {
              if (!id.includes('node_modules')) return;
              if (id.includes('@firebase') || id.includes('/firebase/')) return 'firebase';
              if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-vendor')) return 'charts';
              if (id.includes('@google/genai')) return 'genai';
              if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'react';
            }
          }
        }
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
