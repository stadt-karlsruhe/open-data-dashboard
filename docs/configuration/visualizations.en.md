# Visualizations

Visualizations picture the data for a single resource. The available visualizations differ based on the type of data to be displayed.

## Table

!!! note
    Tables are available for **CSV** and **JSON** data.

Tables are the default visualization for CSV and JSON data. They do not take any additional configuration options and may be omitted in the configuration.

!!! example

    ```yaml title="app.config.yml"
    visualizations:
        table: {}
    ```

## Bar Chart

!!! note
    Bar charts are available for **CSV** and **JSON** data.

In addition to tables, CSV and JSON data can be visualized as bar charts. For that, the axes need to be configured.

!!! example

    ```yaml title="app.config.yml"
    visualizations:
        barChart:
            layout: string # (1)!
            axisPairs: [<axis-pair>] # (2)!
    ```

    1. The [layout/orientation](#layout) of the chart.
    2. A list of [axis pairs](#axis-pairs).

### Layout

Optionally, specify the [layout](https://recharts.org/en-US/api/BarChart#layout) of the bar chart.

* By default, the horizontal layout (`horizontal`) will be used.
* Alternatively, a vertical layout (`vertical`) can be used instead.

!!! example

    ```yaml title="app.config.yml"
    layout: string
    ```

### Axis Pairs

Specify the axis configurations for a [Bar Chart](/features/visualizations#bar-chart) as a list of objects containing `xAxis` and `yAxis` properties.

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

## Map

!!! note
    Maps are available for **GeoJSON** data.

GeoJSON data can be visualized as maps.

!!! example

    ```yaml title="app.config.yml"
    visualizations:
        map:
            groupKey: string # (1)!
    ```

    1. A [group key](#group-key).

### Group Key

Optionally, specify a group key to divide the data into categories.
The categories will be displayed in the map legend with each having a unique marker color.

!!! example

    ```yaml title="app.config.yml"
    groupKey: category
    ```
