# Dashboards

Dashboards can be used to display multiple resources related to a single topic on one page. Additionally, the homepage is configured this way.

## Configurations

| Parameter     | Description                        | Type     |
| ------------- | ---------------------------------- | -------- |
| `id`          | The unique dashboard id.           | Required |
| `name`        | The dashboard name.                | Required |
| `description` | The dashboard description.         | Optional |
| `icon`        | The dashboard [icon](#icons) name. | Optional |

!!! example
    The following example is a list of all available dashboards configurations:

    ```yaml title="app.config.yml"
    dashboards:
    - id: string
      name: string
      description: string
      icon: string
      contents: [content] # (1)!
    ```

    1. The [contents](#contents) of the dashboard.

## Contents

Optionally, specify the contents of a dashboard. If omitted, the dashboard will be empty.

The contents can consist of internally available resources and of external content that will be embedded directly.
A single dashboard may contain contents of both types.

!!! example

    ```yaml title="app.config.yml"
    contents:
    - <resource-content> | <external-content>
    - <resource-content> | <external-content>
    - <resource-content> | <external-content>
    ```

!!! note
    The order in which contents are specified is important. It determine the order in which they are displayed on the dashboard.

### Resource Content

### External Content

| Parameter | Description                                             | Type     |
| --------- | ------------------------------------------------------- | -------- |
| `type`    | The content type. For external content, use `EXTERNAL`. | Required |
| `name`    | The content name.                                       | Required |
| `source`  | The content source.                                     | Required |

!!! example

    ```yaml title="app.config.yml"
    contents:
    - type: EXTERNAL
      name: string
      source: string
    ```

## Homepage

The homepage is configured as a dashboard with the reserved id `homepage`. It must always be present in the configuration.

## Icons

The `Open Data Dashboard` is using the [Bootstrap Icons](https://icons.getbootstrap.com/) library. Any available icon can be used.

!!! note
    Use the **icon name**, not the CSS class when specifying an icon.
    For example, to use the [House door fill](https://icons.getbootstrap.com/icons/house-door-fill/) icon, the value of the `icon` property should be `house-door-fill`.
