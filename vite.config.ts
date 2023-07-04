import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                //target: 'http://121.37.158.48:5000', // 目标地址 --> 服务器地址
                target:'http://10.181.122.135:5000',
                changeOrigin: true, // 允许跨域
            }
        },
    }
})
