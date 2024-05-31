# Rename Fields

Optionally, specify configurations to rename fields/properties of CSV/JSON data as on object with key-value pairs of the form
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
