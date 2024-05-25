# Configuration

## Appearance

The `Open Data Dashboard` provides two themes for its visuals:

* `bootstrap-light`: This is the default Bootstrap [light theme](https://getbootstrap.com/docs/5.3/customize/color-modes/).
* `karlsruhe`: This a theme based on the corporate design of the city of Karlsruhe.

A theme can be chosen by setting the `appearance.theme` option in the configuration file:

``` title="data-source.config.yml"  linenums="1"
--8<-- "data-source.config.yml:1:2"
```

By default, the `bootstrap-light` theme will be used.

## Providing the Configuration File

By default, the configuration file included in the GitHub repository will be used:

``` title="data-source.config.yml"  linenums="1"
--8<-- "data-source.config.yml:1:10"
```

Alternatively, you can provide a path to a custom configuration file using the `CONFIGURATION_PATH` environment variable.
