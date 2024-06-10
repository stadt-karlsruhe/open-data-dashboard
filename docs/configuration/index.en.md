# Application Configuration

## Configuring the Application

The application configuration file(s) are a crucial part of the `Open Data Dashboard`. They contain information about what data to display and how.

* By default, the configuration files from the GitHub repository will be used.
They are located in the `/config` directory and are tailor-made for the needs of the city of Karlsruhe.
* Own configuration files can be provided. See the section on [providing your own configuration](#providing-your-own-configuration).

!!! example
    The following example is a list of all available configurations for the application:

    ```yaml title="app.config.yml"
    appearance:
        theme: string # (1)!
    resources: [<resource>] # (2)!
    categories: [<category>] # (3)!
    dashboards: [<dashboard>] # (4)!
    ```

    1. The application [theme](theme.md).
    2. A list of configured [resources](resources.md).
    3. A list of configured [categories](categories.md).
    4. A list of configured [dashboards](dashboards.md).

!!! note
    The homepage is configured as a [dashboard](dashboards.md) with the reserved id `homepage`.

## Working on the Configuration

When modifying the application configuration, make sure to read through this documentation and take a look at the configuration present in the GitHub repository.

If you have a development environment available, you can validate changes to the default configuration files by executing `npm run test:config-validation`.
For more information on developing the `Open Data Dashboard` take a look at [Development](../development/index.md).

Otherwise, you can check the validity of the configuration by taking a look at the `Config Validation` GitHub Action in the repository.

## Providing your own Configuration

By default, the application will look for configuration files in the `/config` directory and all of its subdirectories.
You can specify a different configuration location by setting the `CONFIGURATION_DIR` environment variable.

Make sure the all configuration file names end either with `app.config.yml` or `app.config.yaml`.
