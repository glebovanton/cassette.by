# cassette.by

# Cassette.by (cassette)

A Cassette project for cassette.by

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
quasar build -m ssr
```

### nvm use v20.11.0 Now using node v20.11.0 (npm v10.2.4)

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Deployment

This project is deployed automatically using **GitHub Actions**.

### Deployment flow

- Every push to the **`main`** branch triggers a GitHub Actions workflow.
- The workflow:
  1. Checks out the repository
  2. Sets up **Node.js v20.11.0**
  3. Installs dependencies
  4. Builds the Quasar SPA
  5. Uploads the build artifacts to the production server via **FTP**

