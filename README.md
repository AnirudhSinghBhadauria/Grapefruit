
---

# Grapefruit 🍊

Grapefruit is a monorepo that combines TypeScript, Zod, Drizzle, PostgreSQL, Next.js, Express.js, and Docker to provide a solid foundation for building scalable, maintainable, and efficient web applications. The "trpc" branch also incorporates tRPC for end-to-end typesafe APIs. Additionally, Grapefruit uses PNPM workspaces for efficient package management.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with Grapefruit, follow these steps:

0. First install pnpm if you don't have it already using **npm i -g pnpm**
1. Clone the repository: `git clone https://github.com/AnirudhSinghBhadauria/Grapefruit.git`
2. Navigate into the project directory: `cd grapefruit`
3. Install the dependencies using PNPM: `pnpm install`

## Usage

To start the application, run the following commands:

### Development

Start the application in development mode:
```sh
pnpm dev
```
Build the application using Docker Compose:
```sh
docker-compose up --build
```
### Production

Build the application:
```sh
pnpm build
```
Run the application:
```sh
pnpm dev
```
Start the application using Docker Compose:
```sh
docker-compose up
```
## Features

Here are some of the features of Grapefruit:

- 🚀 Fast and efficient development experience using Next.js and Turbo Repo
- 🛡️ Strongly-typed codebase using TypeScript
- 📝 Schema validation using Zod
- 💧 Lightweight and type-safe SQL queries using Drizzle ORM
- 🐳 Dockerized for easy deployment and scaling
- 🔄 End-to-end typesafe APIs using tRPC (on the "trpc" branch)
- 📦 Efficient package management using PNPM workspaces

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://github.com/colinhacks/zod)
- [Drizzle](https://github.com/drizzle-team/drizzle-orm)
- [PostgreSQL](https://www.postgresql.org/)
- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [Turbo Repo](https://turbo.build/repo)
- [Docker](https://www.docker.com/)
- [tRPC](https://trpc.io/) (on the "trpc" branch)
- [PNPM Workspaces](https://pnpm.io/workspaces)

## Contributing

We welcome contributions from the community! If you'd like to contribute to Grapefruit, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear and descriptive commit messages.
4. Open a pull request and describe your changes in detail.

You can also open an issue to suggest changes or report bugs.

## License

This project is licensed under the [MIT License](LICENSE).

---