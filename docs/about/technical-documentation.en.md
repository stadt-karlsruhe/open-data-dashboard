# Technical Documentation

## Architecture

Below component diagram gives a quick view over the most important aspects of the `Open Data Dashboard`'s inner workings.

<figure markdown="span">
    ![Architecture](../diagrams/out/app_architecture.svg "Architecture"){ loading=lazy }
</figure>

## Separation between Server and Client

In Next.js, the separation between server and client actions isn't trivial.
When not explicitly configured, a single component can be processed both by the server and by the client depending on the executed tasks and other factors.
See [Server and Client Components](https://nextjs.org/learn/react-foundations/server-and-client-components).

Therefore, the separation seen in above diagram is not one hundred percent accurate.
Instead, it aims to break down the separation of concerns as present under most circumstances.

## Configuration

By design, the `Open Data Dashboard` aims to be as flexible as possible,
meaning it is up to the administrator which data is displayed and how it is visualized.
To achieve this, a [custom YAML configuration format](../configuration/index.md) is used
based on which the `Open Data Dashboard` then dynamically builds its contents.

Configuration files are stored on and accessed from the filesystem and can therefore be updated while the application is running.

## Data

The data processing is the second most important group of server-side components.
Data is fetched from a variable number of external sources, as defined in the configuration.
Next, the data is transformed (again, based on the configuration), typed and validated to later safely display it in the application.
The type-narrowing is a best-effort implementation, as without type hints a clean separation between data types is not always possible.

## Caching

To keep the performance high, caching is utilized.
Beside the [native Next.js caching](https://nextjs.org/docs/app/building-your-application/caching),
the `Open Data Dashboard` uses an [LRU Cache](https://www.npmjs.com/package/lru-cache) for particularly expensive operations.
Some of them are:

* Loading the configuration (access to filesystem and validation)
* Processing the data (fetching, preprocessing and validation)

## Frontend

What the user sees in the end is [mostly](#separation-between-server-and-client) provided by the client-side components.
This includes dashboards, visualizations and filters but also general-purpose features like search and internationalization.

## Technology Stack

The `Open Data Dashboard` is a [Next.js](https://nextjs.org/) application implemented entirely in [TypeScript](https://www.typescriptlang.org/).
[Bootstrap 5](https://getbootstrap.com/docs/5.2/getting-started/introduction/) is utilized as CSS framework in combination with [Bootstrap Icons](https://icons.getbootstrap.com/).

For a best-possible maintainability, frameworks and libraries are used where feasible.
Below table gives an overview over some of the most important libraries and their purpose.

| Library                                                 | Purpose                                                    |
| ------------------------------------------------------- | ---------------------------------------------------------- |
| [React Leaflet](https://react-leaflet.js.org/)          | Map visualizations                                         |
| [lru-cache](https://www.npmjs.com/package/lru-cache)    | LRU cache as described in [Caching](#caching)              |
| [next-intl](https://next-intl-docs.vercel.app/)         | Internationalization                                       |
| [MiniSearch](https://github.com/lucaong/react-minisearch) | Client-side full-text search |
| [React Bootstrap](https://react-bootstrap.netlify.app/) | Replaces Bootstrap JavaScript with native React components |
| [React Data Table Component](https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--docs) | Table visualizations |
| [Recharts](https://recharts.org/en-US/) | Bar chart visualizations |
| [yaml](https://www.npmjs.com/package/yaml) | YAML configuration parsing |
