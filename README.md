# js-boilerplate
Boilerplate for any javascript project

## TODO
`src\app\home\index.vue` is not being imported correctly on tests. This is due
to Vue files import on jest not supporting the `src` attribute inside vue files.
Even if the code from the template and script files gets copied to the vue file,
code coverage is still incorrect, so either solution is wrong. Will leave the
code as is until the `jest-vue` (or `jest-vue-preprocessor`) packages support
non SFCs (single-file components).
