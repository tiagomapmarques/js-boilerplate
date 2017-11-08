# Js Boilerplate
This is a boilerplate for any javascript project. Below you can find a list of
variants, derived from the original `develop` branch. Each variant will be only
one commit long so you can easily diff them and see how to properly set up each
variant.

Dependencies:
- `node` >= 8
- `npm` >= 5

Quick start:
- `npm i`
- `npm start`

## Variants
| Branch | Base Branch | Objective | Completion |
| ------ | ------ | ------ | ------ |
| `develop` | - | vanilla javascript project | - |
| `typescript` | `develop` | vanilla typescript project | done |
| `jquery` | `develop` | base for javascript application using jQuery | done |
| `vue` | `develop` | base for reactive application using vue | done |
| `vue-app` | `vue` | proposed structure and base libs for a vue application | missing tests |
| `react` | `develop` | base for reactive application using react | TBD |
| `react-app` | `react` | proposed structure and base libs for a react application | TBD |
| `inferno` | `react` | base for reactive application using inferno | TBD |
| `angular` | `typescript` | base for reactive application using angular | TBD |

**Note**: `typescript` branch is made of 2 commits instead of one: one to rename
`js` files to `ts` and the other to adapt the project to typescript - better for
diffing.

## Tooling
The following are the base commands for this application:
- `npm run clean` performs the 3 commands listed below
  - `:coverage` deletes the `coverage` folder
  - `:generated` deletes the `public` folder
  - `:packages` deletes the `node_modules` folder
- `npm run packages` diffs your list of dependencies on `package.json` with the
  ones available on `npmjs.org` and lists possible upgrades
  - `:write` also updates the `package.json` file with the updated versions
  found on `npmjs.org`
  - `:reset` removes `package-lock.json` file performs the `clean:packages`
  command folder (**Note**: will output an error in the end - ignore it)
- `npm run lint` lints your code and style according to the rules on `.eslintrc`
  and `.stylelintrc` files (which extend `standardjs`' and
  `stylelint-config-standard`'s rules, respectively)
- `npm run test` runs the unit tests for the project (files ending with
  `.spec.js`)
  - `:watch` watches the test files and re-runs the tests on any file update
- `npm run build`
  - `:local` builds the project for a local environment and copies its assets
    - `:watch` watches the files and rebuilds them when they change
  - `:dev` builds the project for a dev environment and copies its assets
  - `:prod` builds the project for a prod environment and copies its assets
- `npm run serve` serves the project on `localhost:8000` and opens a browser
  window with the page
  - `:prod` serves the project on `localhost:80`

The following commands are shortcuts only:
- `npm start` = `npm run build:local` and `npm run serve`
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
| File Compression (gzip) | - | - | X |
| Js/CSS Minification | - | - | X |
| Fails on Build Error | - | - | X |


## Compatibility
- IE9+
- Any evergreen browser (Chrome, Edge, FF, ...)
