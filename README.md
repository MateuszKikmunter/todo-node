# todo-node
Project to learn some TypeScript/JavaScript backend development.

## Project Details 🔎
This project has been created to improve my knowledge on backend development with TypeScript and Express framework.
It started as a simple idea for a small app but it evolved into something a bit more complex as it handles authentication with JWT, database interactions, server side pagination with data filtering and utilizes Nx to structure the code with libs and monorepo approach.

While creating the app, my goal was to follow good practices and write code which is easy to understand and maintain.

So to achieve it, I splitted the app with Nx into small and feature oriented libs which are independent and reusable.
In that way they're only concerned with a specific functionality what encourages separation of concerns.

Additionally in the Angular app I'm following most of the recommended practices to make the app better, e.g.:
 <ul>
                <li>
                    <a href="https://angular.io/guide/lazy-loading-ngmodules">
                        Lazy Loading
                    </a>
                </li>
                <li>
                    <a href="https://angular.io/guide/feature-modules">
                        Feature, shared and core modules
                    </a>
                </li>
                <li>
                    <a href="https://angular.io/api/common/AsyncPipe">
                        Async pipes are used whenever possible
                    </a>
                </li>
                <li>
                    <a href="https://brianflove.com/2016-12-11/anguar-2-unsubscribe-observables/">
                        Manual subscriptions are cleared when a component is destroyed
                    </a>
                </li>
                <li>
                    <a
                        href="https://medium.com/angular-in-depth/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0">
                        No nested subscriptions - subs are composed with pipeable operators
                    </a>
                </li>
                <li>
                    <a href="https://christianlydemann.com/the-ten-commandments-of-angular-development/#one">
                        Smart and dumb components
                    </a>
                </li>
                <li>
                    <a href="onPush change detection and immutability">
                        OnPush change detection and immutability
                    </a>
                </li>
                <li>
                    <a href="https://coryrylan.com/blog/angular-observable-data-services">
                        State management done with RXJS and one-way dataflow
                    </a>
                </li>
                <li>
                    <a
                        href="https://blog.appverse.io/why-it-is-a-bad-idea-to-use-methods-in-the-html-templates-with-angular-2-30d49f0d3b16?gi=879fe54af715">
                        No methods or complex logic in the templates
                    </a>
                </li>
                <li>
                    <a href="https://ultimatecourses.com/blog/classes-vs-interfaces-in-typescript">
                        Interfaces are used to strongly type entities
                    </a>
                </li>
                <li>
                    <a href="https://compodoc.app/">
                        Compodoc as documentation tool
                    </a>
                </li>
            </ul>

## How to run the project ⚙️

<ul>
  <li>run <code>npm install</code> in the root of the project</li>
  <li>to run frontend app execute <code> nx serve or npm start</code></li>
  <li>to run api project execute <code> npm run start:api:dev</code></li>
</ul>

## Tech stack 💻

<ul>
                <li>Monorepo:
                    <ul>
                        <li>
                            <a href="https://nx.dev/">Nx</a>
                        </li>
                    </ul>
                </li>
                <li>Frontend:
                    <ul>
                        <li>
                            <a href="https://angular.io/">
                                Angular
                            </a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/primeng/">
                                PrimeNG
                            </a>
                        </li>
                    </ul>
                </li>
                <li>Backend:
                    <ul>
                        <li>
                            <a href="https://nodejs.org/en/">
                                NodeJS
                            </a>
                        </li>
                        <li>
                            <a href="https://expressjs.com/">
                                ExpressJS
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/typeorm/typeorm">
                                TypeORM
                            </a>
                        </li>
                        <li>
                            <a href="https://www.sqlite.org/index.html">
                                SQLite
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
