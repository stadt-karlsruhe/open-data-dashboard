# Application Configuration

The application configuration file(s) are a crucial part of the `Open Data Dashboard`. They contain information about what data to display and how.

* By default, the configuration files from the GitHub repository will be used.
They are located in the `/config` directory and are tailor-made for the needs of the city of Karlsruhe.
* Configuration file names must end either with `app.config.yml` or `app.config.yaml`.

!!! example
    The following example is a list of all available configurations for the application:

    ```yaml title="app.config.yml"
    appearance:
        theme: string # (1)!
    resources: [resource] # (2)!
    ```

    1. The application [theme](theme.md).
    2. A list of configured [resources](resources.md).

## Providing your own Configuration

By default, the application will look for configuration files in the `/config` directory and all of its subdirectories.
You can specify a different configuration location by setting the `CONFIGURATION_DIR` environment variable.
