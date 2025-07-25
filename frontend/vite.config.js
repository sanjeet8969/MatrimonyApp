// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/socket.io': {
//         target: 'http://localhost:5000',
//         ws: true,
//         changeOrigin: true
//       }
//     }
//   },
//   build: {
//     outDir: 'dist',
//     sourcemap: true
//   }
// })
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})