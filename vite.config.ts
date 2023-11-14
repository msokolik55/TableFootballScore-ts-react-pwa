import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["abacus.png"],
	manifest: {
		name: "KFC - góly",
		short_name: "KFC - počítadlo gólov",
		description: "Aplikácia na počítania gólov počas zápasov KFC.",
		icons: [
			{
				src: "/abacus.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "landscape",
	},
};

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [react(), VitePWA(manifestForPlugin)],
	server: {
		watch: {
			usePolling: true,
		},
	},
});
