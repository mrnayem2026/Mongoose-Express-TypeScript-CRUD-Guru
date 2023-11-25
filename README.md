# Mongoose-Express-TypeScript-CRUD-Guru

## Table of Contents

- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Environment Configuration](#EnvironmentConfiguration)
- [Running the Application](#RunningtheApplication)
- [Scripts](#Scripts)
- [Dependencies](#Dependencies)
- [Dev Dependencies](#DevDependencies)

## Prerequisites

Ensure you have the following installed on your system:

- Node Version: v20.9.0

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone : https://github.com/mrnayem2026/Mongoose-Express-TypeScript-CRUD-Guru.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Mongoose-Express-TypeScript-CRUD-Guru
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```

## Environment Configuration

1. Create a `.env` file in the root directory based on the provided `.env.example`.
2. Configure the environment variables as needed for your local setup.
   NODE_ENV = **\*\*\***
   PORT = **\*\***
   DB_USER= **\*\***
   DB_PASS= **\*\*\***
   DATABASE_URL =**\*\***

## Running the Application

- To start the application in production mode:

  ```bash
  npm run start:prod
  ```

  This command transpiles the TypeScript code and starts the server.

- To start the application in development mode with hot reloading:
  ```bash
  npm run start:dev
  ```
  This command utilizes `ts-node-dev` for automatic transpilation and restarts the server upon file changes.

## Scripts

The project provides additional scripts to perform various tasks:

- `build`: Transpile TypeScript code to JavaScript.
- `lint`: Lint the source files using ESLint.
- `lint:fix`: Lint and automatically fix linting errors using ESLint.
- `prettier`: Format source files using Prettier.
- `prettier:fix`: Format and automatically fix formatting errors using Prettier.

## Dependencies

The project relies on the following dependencies:

- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt) v5.0.2
- [@typescript-eslint/typescript-estree](https://www.npmjs.com/package/@typescript-eslint/typescript-estree) v6.12.0
- [bcrypt](https://www.npmjs.com/package/bcrypt) v5.1.1
- [cors](https://www.npmjs.com/package/cors) v2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv) v16.3.1
- [express](https://www.npmjs.com/package/express) v4.18.2
- [mongoose](https://www.npmjs.com/package/mongoose) v8.0.1
- [zod](https://www.npmjs.com/package/zod) v3.22.4
- [zod-validation-error](https://www.npmjs.com/package/zod-validation-error) v2.1.0

## Dev Dependencies

The project uses the following dev dependencies:

- [@types/cors](https://www.npmjs.com/package/@types/cors) v2.8.17
- [@types/express](https://www.npmjs.com/package/@types/express) v4.17.21
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) v6.12.0
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) v6.12.0
- [eslint](https://www.npmjs.com/package/eslint) v8.54.0
- [prettier](https://www.npmjs.com/package/prettier) v3.1.0
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) v2.0.0
- [typescript](https://www.npmjs.com/package/typescript) v5.3.2
