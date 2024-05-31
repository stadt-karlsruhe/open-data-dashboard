# Resources

A resource is a configuration for a single dataset. The configuration options differ based on the type of data to be displayed.

## Common Options

| Parameter     | Description                                                                  | Type     |
| ------------- | ---------------------------------------------------------------------------- | -------- |
| `id`          | The unique resource id.                                                      | Required |
| `name`        | The resource name.                                                           | Required |
| `description` | The resource description.                                                    | Optional |
| `source`      | The data source URL.                                                         | Required |
| `type`        | The data type. Available values are `CSV`, `JSON`, `GeoJSON` and `Embedded`. | Required |

## CSV and JSON Data

!!! example
    The following example is a list of all available configurations for CSV and JSON data:

    ```yaml title="app.config.yml"
    resources:
    - id: string
      name: string
      description: string
      source: string
      type: CSV | JSON
      numberFormat: string # (1)!
      renameFields:
        <rename-fields-configs> # (2)!
      skipFieldsRegEx: string # (3)!
      defaultFilters:
        <default-filters-configs> # (4)!
      visualizations:
        <visualization-configs-json>
    ```

    1. Specify the input number format. See [numberFormat](number-format.md).
    2. Rename fields/properties. See [renameFields](rename-fields.md).
    3. Skip fields/properties. See [skipFields](skip-fields.md).
    4. Specify default filters for the dataset. See [defaultFilters](default-filters.md).

## GeoJSON Data

!!! example
    The following example is a list of all available configurations for GeoJSON data:

    ```yaml title="app.config.yml"
    resources:
    - id: string
      name: string
      description: string
      source: string
      type: GeoJSON
      visualizations:
        <visualization-configs-geojson>
    ```

    1. The application [theme](theme.md).
    2. A list of configured [resources](resources.md).

## Embedded Data

!!! example
    For embedded data, no configuration options beyond the commons are available:

    ```yaml title="app.config.yml"
    resources:
    - id: string
      name: string
      description: string
      source: string
      type: Embedded
    ```
