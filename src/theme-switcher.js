class ThemeSwitcher {
  constructor () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      console.log('dark mode')
      document.body.classList.add('dark')
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // light mode
      console.log('light mode')
      document.body.classList.add('light')
    }

    console.log(window.matchMedia('(prefers-color-schema: dark)'))
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      console.log('changed!!', e.matches)
      if (e.matches) {
        document.body.classList.replace('light', 'dark')
      } else {
        document.body.classList.replace('dark', 'light')
      }
    })
  }
};

module.exports = ThemeSwitcher
