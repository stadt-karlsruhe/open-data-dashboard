# Skip Fields

Optionally, specify a regular expression to skip fields/properties of CSV/JSON data.

!!! example
    ```yaml title="app.config.yml"
    skipFieldsRegEx: string
    ```

An actual config skipping the property `test_prop` would look like this:
!!! example
    ```yaml title="app.config.yml"
    skipFieldsRegEx: ^test_prop$
    ```
