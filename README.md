# **Express TS Template (based on Next.JS)**

**This project was inspired by [express-file-routing](https://github.com/matthiaaas/express-file-routing).** Give both of it a star. ⭐

This is a template for a NodeJS Express server written in TypeScript. This template uses `File-based Routing` (similar to NextJS) to make it easier to manage routes. So,

```
NO MORE ROUTE IMPORTS! 🎉
```

and

```ts
app.use("/api", require("./routes/api"));
```

If you're interested in NextJS or you've already used it in past, you'll feel right at home. 😁

## !! ⚠ WARNING !!

We still don't have a proper way to load CSS in the rendered HTML. So, you can't use TailwindCSS or any other CSS framework. You can only use inline styles. If you know how to fix this, please open a PR. 😉

## Features

-   **File-based Routing (similar to NextJS)**: No more route imports! Just create a new file in the `app` directory and it will be automatically registered as a route.
-   **TypeScript**: Written in TypeScript, so no more type errors!
-   **ESLint**: Linting is done using ESLint, just run `npm run lint` to lint the code.
-   **Prettier**: Code formatting is done using Prettier, just run `npm run format` or use the `Format Document` command in VSCode to format the code.
    -   +1 if you use the `Format on Save` option in VSCode. 😉
-   **.env**: Environment variables are loaded from the `.env` file using the `dotenv` package.
-   **nodemon**: `nodemon` is used to automatically restart the server when a file is changed.
-   **multer**: Inbuilt support for file uploads using `multer`. Example usage is shown in [here](/src/app/api/uploads/route.ts).
-   **cors**: CORS is enabled by default. You can change the CORS options in [here](/src/app.ts).

## Getting Started

1. Clone this repository.
2. This template uses `pnpm` as the package manager. So, install `pnpm` using `npm install -g pnpm`, if you don't have it already.
    - Run `pnpm install` to install the dependencies.
    - If you don't want to use `pnpm`, delete the `pnpm-lock.yaml` file and run `npm install` or `yarn install` to install the dependencies.
3. Run `pnpm dev` to start the server in development mode.
    - The server will be running on `http://localhost:3001` by default.
    - If you want to change the port, create a `.env` file in the root directory and copy the contents of `.env.example` to it. Then, change the `PORT` variable in the `.env` file.
4. Run `pnpm build` to build the project, it will transpile the TypeScript code to JavaScript and put it in the `build` directory.
5. Run `pnpm start` to start the server in production mode.

## Configuration

The configuration is done in the `createRouter` function in [here](/src/lib/index.ts#L23). This function is invoked in the [app.ts](/src/app.ts) file. The `createRouter` function takes two arguments,

| Option               | Type      | Default                           | Description                                 | Required |
| -------------------- | --------- | --------------------------------- | ------------------------------------------- | -------- |
| `app`                | `Express` | `undefined`                       | The Express app instance.                   | Yes      |
| `options`            | `Options` | `{}`                              | The options object.                         | No       |
| `options.direrctory` | `string`  | `path.join(process.cwd(), "app")` | The directory where the routes are located. | No       |

If you want to change the directory where the routes are located, you can do it by changing the `options.directory` option. Here's an example,

```ts
// ... Your existing imports ...
import path from "path";
import express from "express";
import { createRouter } from "./lib";

export function createApp() {
    const app = express();

    // ... Your existing code ...

    createRouter(app, {
        directory: path.join(process.cwd(), "routes"),
    });

    // ... Your existing code ...

    return app;
}
```

Now, all the routes will be loaded from the `routes` directory instead of the `app` directory.

## Routes

The routes are defined in the `app` directory. Here's how you can define a route:

```
app
├── api
│   ├── users
│   │   ├── route.ts
│   │   └── [userId]
│   │       └── route.ts
│   posts
│       ├── route.ts
│       └── [postId]
│           └── route.ts
└── home
    └── page.tsx
```

-   The `app` directory is the root directory for all the routes.
-   The `api` directory is the root directory for all the API routes. Although, you can change this name to anything you want.
-   The `home` directory is the root directory is a route for the `/` path.
-   The `page.tsx` file is the entry point for the `/` path.
    -   We use the `.tsx` extension for the entry point file because we can use JSX in it.
    -   Import `React` from `react` **(must)** and start writing your React code.
    -   A simple example is shown in [here](/src/app/home/page.tsx).
-   The `users` directory is a route for the `/users` path.
-   The `route.ts` file is the entry point for the `/users` path.
    -   We use the `.ts` extension for the entry point file because we don't need to use JSX in it.
    -   See [here](/src/app/api/users/route.ts) for an example.
-   The `[userId]` directory is a route for the `/users/:userId` path.
    -   The `:userId` is a dynamic parameter. You can access it using `req.params.userId`.
    -   See [here](/src/app/api/users/[userId]/route.ts) for an example.
-   Files that are outside of the `api` directory must follow the rules written below,
    -   The file must be named as `page.tsx`. This is the entry point for the route.
    -   The file named `page.tsx` must have a default export named `Page`.
    -   The `Page` component must be a React component.
    -   See [here](/src/app/home/page.tsx) for an example.
-   Files that are inside the `api` directory must follow the rules written below,
    -   The file must be named as `route.ts`. This is the entry point for the route.
    -   The file named `route.ts` must not have a default export.
    -   These files can have named exports (GET, POST, PUT, DELETE, etc.).
    -   See [here](/src/app/api/users/route.ts) for an example.

## Defining Dynamic Routes

-   Dynamic routes are supported both in the `api` directory and outside of it.
-   To define a dynamic route, create a directory with the name of the dynamic parameter inside the directory of the route.
-   For example, to define a dynamic route for `/users/:userId`, create a directory named `[userId]` inside the `users` directory.
-   The name of the directory must be the same as the name of the dynamic parameter.
-   You can access the dynamic parameter using `req.params.userId` inside the `route.ts` file.
-   See [here](/src/app/api/users/[userId]/route.ts) for an example.

## Adding Middleware

You can,

-   Add middleware to the whole application by adding it to the `app.use` function in the [app.ts](/src/app.ts) file.
-   Or add middleware to a specific route by converting the exported function to an array of functions. See [here](/src/app/api/uploads/route.ts) for an example.

    ```ts
    import { Request, Response } from "express";
    import multer from "multer";

    const upload = multer({ dest: "uploads/" });

    export const POST = [
        upload.single("file"),
        (req: Request, res: Response) => {
            res.json({
                file: req.file,
            });
        },
    ];
    ```

-   Thus, the `POST` function is now an array of functions. The first function is the `multer` middleware and the second function is the actual route handler.
-   You can add as many middleware as you want. Just make sure that the last function is the actual route handler.

## React Support

-   `JSX` is only supported in the `page.tsx` files.
-   Only SSR is supported, so you can't use `ReactDOM.render` or `ReactDOM.hydrate`.
-   As no client-side rendering is done, you can't use any hooks that require the DOM to be present (e.g. `useEffect`).
-   **If you know how to fix this, please open a PR. 😉**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Feedback

Feel free to send me feedback on [X](https://x.com/itsdrvgo) or [file an issue](https://github.com/itsdrvgo/post-it/issues/new). Feature requests are always welcome. If you wish to contribute, please take a quick look at the [guidelines](https://github.com/itsdrvgo/post-it/blob/master/CONTRIBUTING.md)!

Join our Discord server [here](https://dsc.gg/drvgo)!

## Connect with me

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/itsdrvgo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/itsdrvgo)
[![Twitch](https://img.shields.io/badge/Twitch-%239146FF.svg?logo=Twitch&logoColor=white)](https://twitch.tv/itsdrvgo)
[![X](https://img.shields.io/badge/X-%23000000.svg?logo=X&logoColor=white)](https://x.com/itsdrvgo)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/@itsdrvgodev)
