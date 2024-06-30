# Application Architecture

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
To achieve this, a custom configuration format is used based on which the `Open Data Dashboard` then dynamically builds its contents.

## Data

The data processing is the second most important group of server-side components.
Data is fetched from a variable number of external sources, as defined in the configuration.
Next, the data is transformed (again, based on the configuration), typed and validated to later safely display it in the application.
The type-narrowing is a best-effort implementation, as without type hints a clean separation between data types is not always possible.

## Caching
