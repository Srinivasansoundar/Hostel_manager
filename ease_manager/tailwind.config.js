const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js",
    // 'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),


  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        sidebar: '#1E3A8A',      // Cool blue tint for sidebar
        dashboard: '#EFF6FF	',    // Soft neutral for dashboard background
        panel: '#ffffff',        // White panel/card background
        navbar:"#3DA6A2",
        sidebartext:"#F9FAFB",
        cardbg:"#F9FAFB",
        button:"#2563EB",
        buttonhover:"#1E40AF",
      },
      boxShadow: {
        panel: '0 2px 8px rgba(0, 0, 0, 0.05)', // Slight shadow for cards
      },
    },
  },
  plugins: [ flowbite.plugin(),],
}