  tailwind.config = {
      darkMode: 'class',
      theme: {
          extend: {
              colors: {
                  primary: {
                      light: '#c9a74d',
                      dark: '#d4b45f'
                  },
                  secondary: {
                      light: '#1a1a1a',
                      dark: '#2d2d2d'
                  },
                  background: {
                      light: '#f8f8f8',
                      dark: '#121212'
                  },
                  text: {
                      light: '#333333',
                      dark: '#f0f0f0'
                  }
              },
              fontFamily: {
                  sans: ['Montserrat', 'sans-serif'],
                  serif: ['Cormorant Garamond', 'serif'],
              },
              animation: {
                  'fade-in': 'fadeIn 1s ease-in-out',
                  'fade-in-up': 'fadeInUp 1s ease-out',
                  'fade-in-down': 'fadeInDown 1s ease-out',
                  'theme-switch': 'themeSwitch 0.5s ease-out'
              },
              keyframes: {
                  fadeIn: {
                      '0%': {
                          opacity: '0'
                      },
                      '100%': {
                          opacity: '1'
                      },
                  },

                  fadeInUp: {
                      '0%': {
                          opacity: '0',
                          transform: 'translateY(20px)'
                      },
                      '100%': {
                          opacity: '1',
                          transform: 'translateY(0)'
                      },
                  },
                  fadeInDown: {
                      '0%': {
                          opacity: '0',
                          transform: 'translateY(-20px)'
                      },
                      '100%': {
                          opacity: '1',
                          transform: 'translateY(0)'
                      },


                  },
                  themeSwitch: {
                      '0%': {
                          transform: 'scale(1) rotate(0deg)'
                      },
                      '50%': {
                          transform: 'scale(0.8) rotate(180deg)'
                      },
                      '100%': {
                          transform: 'scale(1) rotate(360deg)'
                      }
                  }
              },
          }
      }
  }