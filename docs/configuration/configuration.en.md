# Configuration

## Appearance

The `Open Data Dashboard` provides two themes for its visuals:

* `bootstrap-light`: This is the default Bootstrap [light theme](https://getbootstrap.com/docs/5.3/customize/color-modes/).
* `karlsruhe`: This a theme based on the corporate design of the city of Karlsruhe.

A theme can be chosen by setting the `appearance.theme` option in the configuration file:

``` title="config/data-source.app.config.yml"  linenums="1"
--8<-- "config/data-source.app.config.yml:1:2"
```

By default, the `bootstrap-light` theme will be used.

## Providing the Configuration File

By default, the configuration files included in the GitHub repository (`config/` directory) will be loaded.

Alternatively, you can provide a path to a custom configuration directory using the `DEFAULT_CONFIGURATION_DIR` environment variable.

!!! note
    All configuration file names must end with either `app.config.yml` or `app.config.yaml`.
