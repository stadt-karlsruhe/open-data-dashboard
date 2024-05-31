# Axis Pairs

Specify the axis configurations configurations for a [Bar Chart](/features/visualizations#bar-chart) as a list of objects containing `xAxis` and `yAxis`.

!!! example

    ```yaml title="app.config.yml"
    axisPairs: [<axis-pair>]
    ```

!!! note
    Make sure the properties for `yAxis` **always** return numeric values.

An actual config setting the axis configurations would look like this:
!!! example

    ```yaml title="app.config.yml"
    axisPairs:
    - xAxis: test_prop_str
      yAxis: test_prop_int
    - xAxis: test_prop_str
      yAxis: test_prop_float
    ```
