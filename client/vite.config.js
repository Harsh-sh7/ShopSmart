import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/shopsmart/',
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5001',
                changeOrigin: true,
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        exclude: ['e2e/**', 'node_modules/**'],
        server: {
            deps: {
                inline: ['@exodus/bytes', 'html-encoding-sniffer', 'jsdom']
            }
        }
    },
})
