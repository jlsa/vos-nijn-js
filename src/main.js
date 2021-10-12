const App = require('./app')
const ThemeSwitcher = require('./theme-switcher')
const app = new App()
app.init()
app.start()

const themeSwitcher = new ThemeSwitcher()
