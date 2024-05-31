# Visualizations

Visualizations picture the data for a single resource. The available visualizations differ based on the type of data to be displayed.

## CSV and JSON Data

For CSV and JSON data, the available visualizations are [Table](/features/visualizations#table) and [Bar Chart](/features/visualizations#bar-chart).

* Data will always be displayed in a table.
* Tables do not take any additional configuration options and can be omitted.

!!! example

    ```yaml title="app.config.yml"
    visualizations:
        barChart:
            axisPairs: [<axis-pair>] # (1)!
    ```

    1. A list of [axis pairs](axis-pairs.md).
