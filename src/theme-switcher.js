class ThemeSwitcher {
  constructor () {
    this.setTheme = this.setTheme.bind(this)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      this.setTheme('dark')
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // light mode
      this.setTheme('light')
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.setTheme(e.matches ? 'dark' : 'light')
    })
  }

  setTheme (theme = 'dark') {
    const current = theme === 'dark' ? 'dark' : 'light'
    const opposite = theme === 'dark' ? 'light' : 'dark'

    if (document.body.classList.length > 0) {
      document.body.classList.replace(opposite, current)
    } else {
      document.body.classList.add(current)
    }
  }
};

module.exports = ThemeSwitcher
