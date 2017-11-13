# Js Boilerplate
This is a boilerplate for any javascript project. Below you can find a list of
_flavours_, derived from the original `develop` branch. Each _flavour_ will be
only one commit long so you can easily diff them and see how to properly set up
each of them.

Dependencies:
- `node` >= 8
- `npm` >= 5

Quick start:
- `npm i`
- `npm start`

Quick start (docker):
- `docker-compose up`

## Flavours
| Branch | Base Branch | Objective | Completion |
| ------ | ------ | ------ | ------ |
| `develop` | - | vanilla javascript project | - |
| `typescript` | `develop` | vanilla typescript project | done |
| `jquery` | `develop` | base for javascript application using jQuery | done |
| `vue` | `develop` | base for pwa using vue | done |
| `vue-app` | `vue` | proposed structure and base libs for a vue pwa | missing tests |
| `react` | `develop` | base for pwa using react | TBD |
| `react-app` | `react` | proposed structure and base libs for a react pwa | TBD |
| `inferno` | `react` | base for pwa using inferno | TBD |
| `angular` | `typescript` | base for pwa using angular | TBD |
| `angular-app` | `angular` | proposed structure and base libs for an angular pwa | TBD |

**Note**: `typescript` branch is made of 2 commits instead of one: one to rename
`js` files to `ts` and the other to adapt the project to typescript - better for
diffing.

## Tooling
The following are the base commands for this application (`npm run`):
- `clean` performs the 3 commands listed below
  - `:coverage` deletes the `coverage` folder
  - `:generated` deletes the `public` folder
  - `:packages` deletes the `node_modules` folder
- `packages` diffs your list of dependencies on `package.json` with the ones
available on `npmjs.org` and lists possible upgrades
  - `:write` also updates the `package.json` file with the updated versions
  - `:reset` removes `package-lock.json` file and performs `clean:packages`
- `lint` lints your code and style according to the rules on `.eslintrc` and
`.stylelintrc` files (which extend `standardjs`' and
`stylelint-config-standard`'s rules, respectively)
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
| Js/CSS Minification | - | - | X |
| File Compression (gzip) | - | - | X |
| Fails on Build Error | - | - | X |


## Compatibility
- IE9+
- Any evergreen browser (Chrome, Edge, FF, ...)
