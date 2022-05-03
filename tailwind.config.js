module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      height: {
        '129': '29rem',
      },
      
      colors: {

        "primary": {
          "light_blue": "#43AFFF",
          "dark_blue": "#1A253C",
          "medium_blue": "#303F60"
        },
  
        "secondary": {
          "light": "#EDF6FF",
          "medium": "#D9EFFF",
          "dark": "#A9AFBC",
        },
  
        "nav-btn-bg": "#43AFFF33",
      },

    },

      container: {
        center: true,
      },

   

  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
