class ThemeSwitcher {
  constructor () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      document.body.classList.add('dark')
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // light mode
      document.body.classList.add('light')
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (e.matches) {
        document.body.classList.replace('light', 'dark')
      } else {
        document.body.classList.replace('dark', 'light')
      }
    })
  }
};

module.exports = ThemeSwitcher
