/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'lounge': "url('../public/images/carousel_lounge_img.jpg')"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
