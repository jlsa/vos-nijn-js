const { default: MatchMedia } = require("jest-matchmedia-mock");
const ThemeSwitcher = require("../src/theme-switcher");

let matchMedia;

const appearanceMq = {
  light: '(prefers-color-scheme: light)',
  dark: '(prefers-color-scheme: dark)'
}

describe('ThemeSwitcher Test', () => {
  beforeAll(() => {
    matchMedia = new MatchMedia()
  })

  afterEach(() => {
    matchMedia.clear()
    const classList = document.body.classList
    while (classList.length > 0) {
      classList.remove(classList.item(0))
    }
  })

  test('Adds Eventlistener', () => {
    const themeSwitcher = new ThemeSwitcher()
    expect(matchMedia.getListeners(appearanceMq.dark)).toHaveLength(1);
  });

  test('Turn from light theme to dark theme', () => {
    matchMedia.useMediaQuery(appearanceMq.light);
    const themeSwitcher = new ThemeSwitcher()

    expect(document.body.classList.contains('light')).toBeTruthy()

    matchMedia.useMediaQuery(appearanceMq.dark);
    expect(document.body.classList.contains('dark')).toBeTruthy()
  })

  test('Perform one-time check that the applied media query\'s are applied and matches', () => {
    matchMedia.useMediaQuery(appearanceMq.dark)
    expect(window.matchMedia(appearanceMq.dark).matches).toBeTruthy()

    matchMedia.useMediaQuery(appearanceMq.light)
    expect(window.matchMedia(appearanceMq.light).matches).toBeTruthy()
  })

  test('Turn from dark theme to light theme', () => {
    matchMedia.useMediaQuery(appearanceMq.dark)
    expect(window.matchMedia(appearanceMq.dark).matches).toBeTruthy()
    // matchMedia.useMediaQuery(appearanceMq.light);
    const themeSwitcher = new ThemeSwitcher()
    // matchMedia.useMediaQuery(appearanceMq.light);
    expect(window.matchMedia(appearanceMq.light).matches).toBeTruthy()

    // expect(document.body.classList.contains('light')).toBeTruthy()

    // matchMedia.useMediaQuery(appearanceMq.dark);
    // expect(document.body.classList.contains('dark')).toBeTruthy()
  })

  test('Set Theme Manually from dark to light', () => {
    matchMedia.useMediaQuery(appearanceMq.dark);
    const themeSwitcher = new ThemeSwitcher()
    expect(document.body.classList.contains('dark')).toBeTruthy()

    themeSwitcher.setTheme('light')
    expect(document.body.classList.contains('dark')).toBeFalsy()
    expect(document.body.classList.contains('light')).toBeTruthy()
  })
})

