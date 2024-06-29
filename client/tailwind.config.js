/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "bounce-in-bck": {
          "0%": {
            transform: "scale(7)",
            "animation-timing-function": "ease-out",
            opacity: "0",
          },
          "5%": {
            transform: "scale(7)",
            "animation-timing-function": "ease-in",
            opacity: "0",
          },
          "11%": {
            transform: "scale(1.5)",
            "animation-timing-function": "ease-out",
            opacity: "0",
          },
          "28%": {
            transform: "scale(1)",
            "animation-timing-function": "ease-in",
            opacity: "1",
          },
          "45%": {
            transform: "scale(1.24)",
            "animation-timing-function": "ease-out",
            opacity: "1",
          },
          "62%": {
            transform: "scale(1.04)",
            "animation-timing-function": "ease-in",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            "animation-timing-function": "ease-out",
            opacity: "1",
          },
        },
        "bounce-out-bck": {
          "0%": {
            transform: "scale(1)",
            "animation-timing-function": "ease-out",
            opacity: "1",
          },
          "38%": {
            transform: "scale(1.04)",
            "animation-timing-function": "ease-in",
          },
          "55%": {
            transform: "scale(1.24)",
            "animation-timing-function": "ease-out",
          },
          "72%": {
            transform: "scale(1)",
            "animation-timing-function": "ease-in",
          },
          "81%": {
            transform: "scale(1.5)",
            "animation-timing-function": "ease-out",
          },
          "89%": {
            transform: "scale(1)",
            "animation-timing-function": "ease-in",
            opacity: "0",
          },
          "95%": {
            transform: "scale(7)",
            "animation-timing-function": "ease-out",
            opacity: "0",
          },
          "100%": {
            transform: "scale(7)",
            "animation-timing-function": "ease-in",
            opacity: "0",
          },
        },
        "rotate-in": {
          "0%": {
            transform: "rotate(-180deg)",
            opacity: "1",
          },
          "100%": {
            transform: "rotate(0deg)",
            opacity: "0.8",
          },
        },
        "rotate-out": {
          "0%": {
            transform: "rotate(0deg)",
            opacity: "0.8",
          },
          "100%": {
            transform: "rotate(-180deg)",
            opacity: "1",
          },
        },
        "slide-in": {
          "0%": {
            transform: "translateX(-800px) rotateY(30deg) scale(0)",
            "transform-origin": "-100% 50%",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0) rotateY(0) scale(1)",
            "transform-origin": "1800px 50%",
            opacity: "1",
          },
        },
      },
      animation: {
        "bounce-in-bck": "bounce-in-bck 1.1s both",
        "bounce-out-bck": "bounce-out-bck 1.1s both",
        "rotate-in":
          "rotate-in 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "rotate-out":
          "rotate-out 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-in": "slide-in 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  plugins: [],
};
