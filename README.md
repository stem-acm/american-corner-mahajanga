# AcmPublic

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Staff access

Manually visit `/auth` and sign in with an existing ACM backend username and password.
Successful login opens `/dashboard`. These routes have no links in the public site.
The dashboard verifies the token with the backend before opening, including after a
refresh. Sign out clears the tab's session. No credentials or accounts are created
by this frontend.

`npm start` proxies `/api/**` to `http://localhost:5002`. Override the backend address
with `API_PROXY_TARGET` when starting the development server. Docker Compose uses
`http://host.docker.internal:5002` to reach the backend through the host.

For production, configure the web server to proxy `/api/` to the existing backend
and serve `index.html` for Angular routes such as `/auth` and `/dashboard`.
The Angular development proxy is not part of a production build. The backend must
remain responsible for authorization; an unlinked URL alone does not restrict access.
