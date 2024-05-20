# **Routez**

Routez is a simple and lightweight Express based package that allows you to create routes using the file-based routing system similar to NextJS. Which means,

```
NO MORE ROUTE IMPORTS! 🎉
```

and

```ts
app.use("/api", require("./routes/api"));
```

If you're interested in NextJS or you've already used it in past, you'll feel right at home. 😁

## Getting Started

1.  Initialize a new Node.js project,

    ```bash
    npm init -y
    # or
    yarn init -y
    # or
    pnpm init -y
    # or
    bun init -y
    ```

2.  Install the package,

    ```bash
    npm install routez
    # or
    yarn add routez
    # or
    pnpm add routez
    # or
    bun add routez
    ```

3.  Create a new file named `server.js` and add the following code,

    ```js
    import path from "path";
    import express from "express";
    import { createRouter } from "routez";

    const port = process.env.PORT || 3001;
    const app = express();
    createRouter(app);

    app.listen(port, () => {
        console.log("Server started on port " + port);
    });
    ```

    > We suggest using TypeScript for better type safety. If you want to use TypeScript, create a new file named `server.ts` instead of `server.js`.

    -   If you've a `src` directory, just add this code and make sure to add the `server.js` file inside the `src` directory.

        ```js
        createRouter(app, {
            directory: path.join(process.cwd(), "src/server"),
        });
        ```

4.  Create a new directory named `app` in the root directory of your project (or inside `src`, if you have one), and create another directory named `api` inside the `app` directory.

5.  Create a new folder named `users` inside the `api` directory and create a new file named `route.js` inside the `users` directory.

    ```js
    export function GET(req, res) {
        res.json({ message: "GET users" });
    }
    ```

6.  Run the server using the following command,

    ```bash
    node server.js
    ```

7.  Open your browser and navigate to `http://localhost:3001/api/users`. You should see the following JSON response,

    ```json
    {
        "message": "GET users"
    }
    ```

8.  That's it! You've successfully created your first route using Routez. 🎉

## Features

-   **File-based Routing (similar to NextJS)**: No more route imports! Just create a new file in the `app` directory and it will be automatically registered as a route.
-   **TypeScript**: Written in TypeScript, so no more type errors!

## Configuration

The configuration is done in the `createRouter` function in [here](/src/index.ts#L21). This function is invoked in the [app.ts](/examples/src/app.ts#L15) file. The `createRouter` function takes two arguments,

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

The routes are defined in the [`examples/src/app`](/examples/src/app/api) directory. Here's how you can define a route:

```
src
└── app
    └── api
        ├── users
        │   ├── route.ts
        │   └── [userId]
        │       └── route.ts
        ├── blogs
        │   └── route.ts
        └── uploads
            └── route.ts
```

-   The `app` directory is the root directory for all the routes.
-   The `api` directory is the root directory for all the API routes. Although, you can change this name to anything you want.
-   The `users` directory is a route for the `/users` path.
-   The `route.ts` file is the entry point for the `/users` path.
    -   See [here](/examples/src/app/api/users/route.ts) for an example.
-   The `[userId]` directory is a route for the `/users/:userId` path.
    -   The `:userId` is a dynamic parameter. You can access it using `req.params.userId`.
    -   See [here](/examples/src/app/api/users/[userId]/route.ts) for an example.
-   Files that are inside the `api` directory must follow the rules written below,
    -   The file must be named as `route.ts/route.js`. This is the entry point for the route.
    -   The file named `route.ts` must not have a default export.
    -   These files can have named exports (GET, POST, PUT, DELETE, etc.).
    -   See [here](/examples/src/app/api/users/route.ts) for an example.

## Defining Dynamic Routes

-   Dynamic routes are supported both in the `api` directory and outside of it.
-   To define a dynamic route, create a directory with the name of the dynamic parameter inside the directory of the route.
-   For example, to define a dynamic route for `/users/:userId`, create a directory named `[userId]` inside the `users` directory.
-   The name of the directory must be the same as the name of the dynamic parameter.
-   You can access the dynamic parameter using `req.params.userId` inside the `route.ts` file.
-   See [here](/examples/src/app/api/users/[userId]/route.ts) for an example.

## Adding Middleware

You can,

-   Add middleware to the whole application by adding it to the `app.use` function in the [app.ts](/examples/src/app.ts) file.
-   Or add middleware to a specific route by converting the exported function to an array of functions. See [here](/examples/src/app/api/uploads/route.ts) for an example.

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Feedback

Feel free to send me feedback on [X](https://x.com/itsdrvgo) or [file an issue](https://github.com/itsdrvgo/routez/issues/new). Feature requests are always welcome. If you wish to contribute, please take a quick look at the [guidelines](https://github.com/itsdrvgo/routez/blob/master/CONTRIBUTING.md)!

Join our Discord server [here](https://dsc.gg/drvgo)!

## Connect with me

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/itsdrvgo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/itsdrvgo)
[![Twitch](https://img.shields.io/badge/Twitch-%239146FF.svg?logo=Twitch&logoColor=white)](https://twitch.tv/itsdrvgo)
[![X](https://img.shields.io/badge/X-%23000000.svg?logo=X&logoColor=white)](https://x.com/itsdrvgo)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/@itsdrvgodev)
