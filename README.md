# Defense prep site: Delivery Quotes (Assignment 5)

Static website (plain HTML, CSS and JavaScript, no build step) for preparing the oral defense.
Languages: English, Russian, Kazakh. Works on phones and opens locally by double-clicking `index.html`.

## Structure

| Path | Purpose |
|---|---|
| `index.html` | Page shell, loads the styles and scripts |
| `css/style.css` | Styles (light and dark theme, mobile layout) |
| `js/ui.js` | Interface texts, project overview texts, run commands |
| `js/app.js` | Rendering, language switch, navigation |
| `js/files/*.js` | One file per source-code page: full code + explanations in 3 languages |

## Deploy on GitHub Pages

1. Settings → Pages → Source: **Deploy from a branch**, branch **main**, folder **/ (root)** → Save.
2. After 1–2 minutes the address appears on the same page: `https://<user>.github.io/<repo>/`.

## Edit

Each source page lives in `js/files/<name>.js`: `code` is the full source, each item in `n` is one explained excerpt
(`a` = text of the first line to show, `n` = number of lines, `en` / `ru` / `kk` = explanation).
