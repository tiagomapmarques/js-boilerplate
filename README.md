# Js Boilerplate &middot; ![ci-status][ci-develop]

This is a boilerplate for any frontend project. Below you can find a list of _flavors_, derived from
the original `develop` branch. Each _flavor_ will be only one commit long so you can easily diff
them and see how to properly set up each of them.

All standards and decisions made regarding this project, its implementation and maintainability are
**[documented here](.github/STANDARDS.md)**. Remember to read it along with the
**[contributing](.github/CONTRIBUTING.md)** and **[code of conduct](.github/CODE_OF_CONDUCT.md)**
guidelines.

Dependencies:
  - `node` >= 10.15.0
  - `yarn` >= 1.13.0

Quick start:
  - `yarn`
  - `yarn start`

Quick start (docker):
  - `docker build . -t js-boilerplate`
  - `docker run -p 8000:80 -d js-boilerplate`
  - visit `localhost:8000`

## Flavors

| Branch | Base Branch | Objective | Completion | Status |
| ------ | ------ | ------ | ------ | ------ |
| [`develop`][link-develop] | - | vanilla javascript and/or typescript project | - | ![ci-develop][ci-develop] |
| `electron` | `develop` | vanilla electron project | TBD | - |
| [`web-components`][link-web-components] | `develop` | base for frontend app using web-components | unit-tests | ![ci-web-components][ci-web-components] |
| [`jquery`][link-jquery] | `develop` | base for frontend app using jquery | done | ![ci-jquery][ci-jquery] |
| [`vue`][link-vue] | `develop` | base for frontend app using vue | done | ![ci-vue][ci-vue] |
| [`vue-jsx`][link-vue-jsx] | `vue` | base for frontend app using vue with jsx | done | ![ci-vue-jsx][ci-vue-jsx] |
| [`react`][link-react] | `develop` | base for frontend app using react | done | ![ci-react][ci-react] |
| [`inferno`][link-inferno] | `react` | base for frontend app using inferno | done | ![ci-inferno][ci-inferno] |
| `aurelia` | `develop` | base for frontend app using aurelia | TBD | - |
| `angular` | `develop` | base for frontend app using angular | TBD | - |

## Compatibility
  - IE11+
  - Any evergreen browser (Chrome, Edge, FF, ...)

## Environments

This project comes with 3 environments setup. Each environment has been setup according to the
general needs of each one. They are:
  - Local: quick/local usage and debugging
  - Development: full app for external server usage and debugging
  - Production: full app for production usage

| Features | Local | Development | Production |
| ------ | ------ | ------ | ------ |
| Live Reload | X | - | - |
| Source Map | X | X | - |
| Chunks | X | X | X |
| All Favicons | - | X | X |
| Pre-render | - | X | X |
| Critical CSS | - | X | X |
| HTML/JS/CSS Minimisation | - | - | X |
| Fails on Build Error | - | - | X |

## Tooling

The following are the base commands for this application (`yarn`):
  - `build` runs `:local`
    - `:local`/`:dev`/`:prod` builds the project and its assets for the `local`/`dev`/`prod`
environments respectively
      - `:watch` serves the app on `localhost:8000`, watches the files and rebuilds them upon change
  - `lint` performs `:code`, `:style` and `:tests`
    - `:code` lints the code according to `.eslintrc.json` (which extends `airbnb-base` rules)
    - `:config` lints the configuration files (similarly to `:code`)
    - `:style` lints the style according to `.stylelintrc.json` (which extends
`stylelint-config-standard` and `stylelint-config-recommended-scss` rules)
    - `:tests` lints the tests according to `.eslintrc.spec.json` (which extends `airbnb-base`
rules)
  - `test` runs the unit tests for the project (files ending with `.spec.js` and `.spec.ts`)
    - `:no-cache` runs the tests with no cache
    - `:watch` watches the test files and re-runs the tests on any file update

The following commands are shortcuts only:
  - `yarn start` = `yarn watch`
  - `yarn build` = `yarn build:local`
  - `yarn watch` = `yarn build:local:watch`

## Using the project

The `develop` branch will be released incrementally (i.e. through PRs), but the _flavor_ branches
will not. Their code will be updated/modified without notice on every release (and/or PR) of the
project.

That said, you should always use the `develop` branch as the base for your projects. If you want to
add a feature/lib already featured on _flavors_, take a look at it and implement it yourself on your
project.

Remember that the _flavor_ branches are just examples on how to implement and adapt this project to
other languages/libraries/frameworks.

### Examples

| Project | Objective | Base version | Completion |
| ------ | ------ | ------ | ------ |
| [`weather-app-vue`][link-app-vue] | example of a vue pwa using this project | [`v0.11.9`][version-rc2] | WIP |
| `weather-app-react` | example of a react pwa using this project | TBD | TBD |
| `weather-app-angular` | example of an angular pwa using this project | TBD | TBD |
| `weather-app-react-electron` | example of a react desktop application using this project | TBD | TBD |

[link-develop]: https://github.com/tiagomapmarques/js-boilerplate
[link-electron]: https://github.com/tiagomapmarques/js-boilerplate/tree/electron
[link-web-components]: https://github.com/tiagomapmarques/js-boilerplate/tree/web-components
[link-jquery]: https://github.com/tiagomapmarques/js-boilerplate/tree/jquery
[link-vue]: https://github.com/tiagomapmarques/js-boilerplate/tree/vue
[link-vue-jsx]: https://github.com/tiagomapmarques/js-boilerplate/tree/vue-jsx
[link-react]: https://github.com/tiagomapmarques/js-boilerplate/tree/react
[link-inferno]: https://github.com/tiagomapmarques/js-boilerplate/tree/inferno
[link-aurelia]: https://github.com/tiagomapmarques/js-boilerplate/tree/aurelia
[link-angular]: https://github.com/tiagomapmarques/js-boilerplate/tree/angular
[link-app-vue]: https://github.com/tiagomapmarques/js-boilerplate/tree/examples/weather-app-vue
[ci-develop]: https://circleci.com/gh/tiagomapmarques/js-boilerplate.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-electron]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/electron.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-web-components]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/web-components.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-jquery]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/jquery.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-vue]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/vue.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-vue-jsx]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/vue-jsx.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-react]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/react.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-inferno]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/inferno.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-aurelia]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/aurelia.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[ci-angular]: https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/angular.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd
[version-rc2]: https://github.com/tiagomapmarques/js-boilerplate/tree/v0.11.9
