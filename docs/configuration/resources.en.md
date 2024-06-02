# Resources

A resource is a configuration for a single dataset. The configuration options differ based on the type of data to be displayed.
For more information about supported data types and formats, see [Supported Data](data-types.md).

## Common Configurations

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
        <visualization-config> # (5)!
    ```

    1. Specify the input number format. See [numberFormat](#number-format).
    2. Rename fields/properties. See [renameFields](#rename-fields).
    3. Skip fields/properties. See [skipFields](#skip-fields).
    4. Specify default filters for the dataset. See [defaultFilters](#default-filters).
    5. Visualization-specific configurations. See [Bar Chart](/configuration/visualizations#bar-chart).

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
      numberFormat: string # (1)!
      renameFields:
        <rename-fields-configs> # (2)!
      skipFieldsRegEx: string # (3)!
      visualizations:
        <visualization-config> # (4)!
    ```

    1. Specify the input number format. See [numberFormat](#number-format).
    2. Rename fields/properties. See [renameFields](#rename-fields).
    3. Skip fields/properties. See [skipFields](#skip-fields).
    4. Visualization-specific configurations. See [Map](/configuration/visualizations#map).

## Embedded Resources

!!! example
    For embedded resources, no configuration options beyond the commons are available:

    ```yaml title="app.config.yml"
    resources:
    - id: string
      name: string
      description: string
      source: string
      type: Embedded
    ```

## Configurations for CSV, JSON and GeoJSON Data

### Number Format

Optionally, specify the input format for numbers.

* By default, English number format (`en`) will be assumed.
* Alternatively, German number format (`de`) can be specified.

!!! example

    ```yaml title="app.config.yml"
    numberFormat: string
    ```

### Rename Fields

Optionally, specify configurations to rename fields/properties as on object with key-value pairs of the form
`<initial property name>: <new property name>`.

!!! example

    ```yaml title="app.config.yml"
    renameFields:
        <rename-fields-configs>
    ```

An actual config renaming the property `test_prop` to `test prop` would look like this:
!!! example

    ```yaml title="app.config.yml"
    renameFields:
        test_prop: test prop
    ```

### Skip Fields

Optionally, specify a regular expression to skip fields/properties.

!!! example

    ```yaml title="app.config.yml"
    skipFieldsRegEx: string
    ```

An actual config skipping the property `test_prop` would look like this:
!!! example

    ```yaml title="app.config.yml"
    skipFieldsRegEx: ^test_prop$
    ```

### Default Filters

!!! warning
    Currently, this configuration option is only available for **CSV** and **JSON** data.

Optionally, specify a default filter as an object. This filter will be used if the dataset is loading without additional parameters.

* For partial string matching across all properties, specify an `all-entries` filter.
* For partial string matching for a non-numeric property, specify the filter as a string.
* For numeric properties, use `min` and/or `max` instead.

!!! example

    ```yaml title="app.config.yml"
    defaultFilters:
        <default-filters-configs>
    ```

!!! warning
    In case you are using `defaultFilters` in combination with [`renameFields`](#rename-fields), make sure to always use the **new** property names.

An actual config setting the filters:

* All rows include the string `test`
* Property `stringProp` includes the string `str`
* Property `numberProp` is greater or equal than `5` and less or equal than `100`

... would look like this:

!!! example

    ```yaml title="app.config.yml"
    defaultFilters:
        all-entries: test
        stringProp: str
        numberProp:
            min: 5
            max: 100
    ```
