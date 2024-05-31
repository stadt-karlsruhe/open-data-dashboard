# Default Filters

Optionally, specify a default filter for CSV/JSON data as an object. This filter will be used if the dataset is loading without additional parameters.

* For partial string matching across all properties, specify an `all-entries` filter.
* For partial string matching for a non-numeric property, specify the filter as a string.
* For numeric properties, use `min` and/or `max` instead.

!!! example
    ```yaml title="app.config.yml"
    defaultFilters:
        <default-filters-configs>
    ```

!!! note
    In case you are using `defaultFilters` in combination with [`renameFields`](rename-fields.md) make sure to always use the **new** property names.

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
