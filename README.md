# Js Boilerplate &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![CircleCI Status](https://circleci.com/gh/tiagomapmarques/js-boilerplate.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd)
This is a boilerplate for any frontend project. Below you can find a list of
_flavors_, derived from the original `develop` branch. Each _flavor_ will be
only one commit long so you can easily diff them and see how to properly set up
each of them.

All standards and decisions made regarding this project, its implementation and
maintainability are **[documented here](STANDARDS.md)**. Remember to read it
along with the **[contributing](CONTRIBUTING.md)** and
**[code of conduct](CODE_OF_CONDUCT.md)** guidelines.

Dependencies:
- `node` >= 8
- `npm` >= 5

Quick start:
- `npm i`
- `npm start`

Quick start (docker):
- `docker-compose up`

## Flavors
| Branch | Base Branch | Objective | Completion | Status |
| ------ | ------ | ------ | ------ | ------ |
| [`develop`](https://github.com/tiagomapmarques/js-boilerplate) | - | vanilla javascript project | - | ![CircleCI Status](https://circleci.com/gh/tiagomapmarques/js-boilerplate.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd) |
| [`typescript`](https://github.com/tiagomapmarques/js-boilerplate/tree/typescript) | `develop` | vanilla typescript project | done | ![CircleCI Status](https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/typescript.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd) |
| `electron` | `develop` | vanilla javascript electron project | TBD | - |
| [`jquery`](https://github.com/tiagomapmarques/js-boilerplate/tree/jquery) | `develop` | base for frontend app using jquery | done | ![CircleCI Status](https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/jquery.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd) |
| [`vue`](https://github.com/tiagomapmarques/js-boilerplate/tree/vue) | `develop` | base for frontend app using vue | done | ![CircleCI Status](https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/vue.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd) |
| [`react`](https://github.com/tiagomapmarques/js-boilerplate/tree/react) | `develop` | base for frontend app using react | done | ![CircleCI Status](https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/react.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd) |
| [`inferno`](https://github.com/tiagomapmarques/js-boilerplate/tree/inferno) | `react` | base for frontend app using inferno | done | ![CircleCI Status](https://circleci.com/gh/tiagomapmarques/js-boilerplate/tree/inferno.svg?style=shield&circle-token=a1853ef566db72f165f70b008b5929d5978f2bcd) |
| `aurelia` | `develop` | base for frontend app using aurelia | TBD | - |
| `angular` | `typescript` | base for frontend app using angular | TBD | - |

**Note**: `typescript` branch is made of 2 commits instead of one: one to rename
`js` files to `ts` and the other to adapt the project to typescript - better for
diffing.

## Compatibility
- IE9+
- Any evergreen browser (Chrome, Edge, FF, ...)

## Environments
This project comes with 3 environments setup. Each environment has been setup
according to the general needs of each one. They are:
- Local: quick/local usage and debugging
- Development: full app for external server usage and debugging
- Production: full app for production usage

| Features | Local | Development | Production |
| ------ | ------ | ------ | ------ |
| Live Reload | X | - | - |
| Source Map | X | X | - |
| Chunks | X | X | X |
| All Favicons | - | X | X |
| HTML/JS/CSS Minification | - | - | X |
| File Compression (gzip) | - | - | X |
| Fails on Build Error | - | - | X |

## Tooling
The following are the base commands for this application (`npm run`):
- `clean` performs `:coverage`, `:generated` and `:packages`
  - `:coverage` deletes the `coverage` folder
  - `:generated` deletes the `public` folder
  - `:packages` deletes the `node_modules` folder
  - `:reset` removes `package-lock.json` and performs `clean`
- `lint` lints your code and style according to the rules on `.eslintrc.json`
and `.stylelintrc.json` files (which extend `airbnb-base` and
`stylelint-config-standard` rules, respectively)
- `test` runs the unit tests for the project (files ending with `.spec.js`)
  - `:watch` watches the test files and re-runs the tests on any file update
- `build` runs `:local`
  - `:local`/`:dev`/`:prod` builds the project and its assets for the
    `local`/`dev`/`prod` environments respectively
    - `:watch` watches app files and rebuilds them upon change
- `serve` serves the project on `localhost:8000`
  - `:secure` serves on https only

The following commands are shortcuts only:
- `npm start` = `npm run build` and `npm run serve`
- `npm run build` = `npm run build:local`
- `npm run watch` = `npm run build:local:watch`

## Using the project
The `develop` branch will be released incrementally (i.e. through PRs), but the
_flavor_ branches will not. Their code will be updated/modified without
notice on every release (and/or PR) of the project.

That said, you should always use the `develop` branch as the base for your
projects. If you want to add a feature/lib already featured on _flavors_,
take a look at it and implement it yourself on your project.

Remember that the _flavor_ branches are just examples on how to implement and
adapt this project to other languages/libraries/frameworks.

### Examples
| Project | Objective | Base version | Completion |
| ------ | ------ | ------ | ------ |
| [`weather-app-vue`](https://github.com/tiagomapmarques/weather-app-vue) | example of a vue pwa using this project | [`v0.7.5`](https://github.com/tiagomapmarques/js-boilerplate/tree/v0.7.5) | WIP |
| `weather-app-react` | example of a react pwa using this project | TBD | TBD |
| `weather-app-angular` | example of an angular pwa using this project | TBD | TBD |
| `weather-app-react-electron` | example of a react desktop application using this project | TBD | TBD |
