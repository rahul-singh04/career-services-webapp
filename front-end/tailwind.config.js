/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "0px 0px 12px 11px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
});
