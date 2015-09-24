# babel-jsxgettext
A tool like jsxgettext, but works for es6 + jsx that babel support.

This tool is still WIP.

### Why

I'm Using Babel with React + JSX for most of my project, but there's no perfect and direct way to generate `.po` file from ES6 + JSX code.

`acron-jsx` support `jsx` but not all the feature I use in Babel(ES7 etc.,). So I grab the `babylon` parser from Babel and use it to generate `.po` file.

### License
MIT
