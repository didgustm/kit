import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    resolve: {
        alias: [
            { find: '$scss', replacement: '/src/lib/scss' },
            { find: '$js', replacement: '/src/lib/js' },
            { find: '$img', replacement: '/src/lib/images' },
            { find: '$comp', replacement: '/src/lib/components' }
        ]
    }
});
