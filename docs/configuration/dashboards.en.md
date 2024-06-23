# Dashboards

!!! warning
    Dashboards in their current form are a **proof-of-concept (POC) implementation**.
    Certainly, not all edge-cases are covered and the configuration is not particularly beginner-friendly.
    Make sure you are well-familiar with the `Open Data Dashboard` before configuring.

Dashboards can be used to display multiple resources related to a single topic on one page.
Additionally, the [homepage](#homepage) is configured this way.

## Homepage

The homepage is configured as a dashboard with the reserved id `homepage`. It must always be present in the configuration.
The available configuration options are identical to those of a regular dashboard.

## Configurations

| Parameter     | Description                        | Type     |
| ------------- | ---------------------------------- | -------- |
| `id`          | The unique dashboard id.           | Required |
| `name`        | The dashboard name.                | Required |
| `description` | The dashboard description.         | Optional |
| `icon`        | The dashboard [icon](icons.md) name. | Optional |

!!! example
    The following example is a list of all available dashboards configurations:

    ```yaml title="app.config.yml"
    dashboards:
    - id: string
      name: string
      description: string
      icon: string
      contents: [<content-configuration>] # (1)!
    ```

    1. The [contents](#contents) of the dashboard.

## Arranging a dashboard

### Positioning

The positioning of contents on a dashboard is achieved through the use of nested arrays. Internally, it is handled by the [Bootstrap 5 grid system](https://getbootstrap.com/docs/5.0/layout/grid/).

The first level of the contents array defines the rows. The second level of the contents array contains the elements.
In the example below, two rows are created where their contents fill the entire row:

!!! example

    ```yaml title="app.config.yml"
    contents:
        - - <content-configuration>
        - - <content-configuration>
    ```

To position element within the same row but below each other, an optional third level of the array can be used.
In the example below, a single row is created.
There, the first content takes up all vertical space of the row while the second and third contents share the vertical space between them:

!!! example

    ```yaml title="app.config.yml"
    contents:
        - - <content-configuration>
          - - <content-configuration>
            - <content-configuration>
    ```
**Recommendation:** Do not put more than three contents next to each other horizontally.

!!! note
    For complex examples, refer to the configuration in the GitHub repository.

### Sizing

Most content types expose a `size` property which controls the height of an element. Allowed values are `L`, `M`, `S` and `XS`.
By default, `M` will be used.

## Contents

Optionally, specify the contents of a dashboard. If omitted, the dashboard will be empty.

There are six types of content available:

* [`RESOURCE`](#resource)
* [`EXTERNAL`](#external)
* [`LINK_INTERNAL`](#internal-links)
* [`LINK_EXTERNAL`](#external-links)
* [`TEXT`](#text)
* [`TEXT_CAROUSEL`](#text-carousel)

!!! example

    ```yaml title="app.config.yml"
    contents: [<content-configuration>]
    ```

### Resource

Content of type `RESOURCE` allows displaying resources available in the application on a dashboard. See [resources](resources.md) for configuration reference.

!!! example
    The following example is a list of all available configurations for contents of type `RESOURCE`:

    ```yaml title="app.config.yml"
    contents:
    - type: RESOURCE
      resourceId: string # (1)!
      size: string # (2)!
      overrides: <override-configs> # (3)!
    ```

    1. The id of the displayed resource.
    2. The content size. See [sizing](#sizing).
    3. Configure overrides for the original resource. See [overrides](#overrides).

### External

Content of type `EXTERNAL` allows embedding content that otherwise is not available in the application, i.e. websites or PDFs.

!!! example
    The following example is a list of all available configurations for contents of type `EXTERNAL`:

    ```yaml title="app.config.yml"
    contents:
    - type: EXTERNAL
      name: string # (1)!
      source: string # (2)!
      size: string # (3)!
    ```

    1. The content name.
    2. The content source URL.
    3. The content size. See [sizing](#sizing).

### Internal Links

Content of type `LINK_INTERNAL` allows linking to dashboards, categories and resources that are available in the application.

!!! example
    The following example is a list of all available configurations for contents of type `LINK_INTERNAL`:

    ```yaml title="app.config.yml"
    contents:
    - type: LINK_INTERNAL
      uniqueIdentifier: string # (1)!
      kind: string # (2)!
      size: string # (3)!
      overrides: <override-configs> # (4)!
    ```

    1. A unique identifier for the linked content. For resources and dashboards,
    their `id` must be used. For categories, use the `name` instead.
    2. The type of the linked content.
    Allowed values are `dashboard`, `category` and `resource`.
    3. The content size. See [sizing](#sizing).
    4. Configure overrides for the linked content. See [overrides](#overrides).

### External Links

Content of type `LINK_EXTERNAL` allows linking to content which is otherwise not available in the application.

!!! example
    The following example is a list of all available configurations for contents of type `LINK_EXTERNAL`:

    ```yaml title="app.config.yml"
    contents:
    - type: LINK_EXTERNAL
      target: string # (1)!
      text: string # (2)!
      icon: string # (3)!
      color: <override-configs> # (4)!
      backgroundColor: <override-configs> # (5)!
    ```

    1. The link target URL.
    2. The link text.
    3. The link icon. See [icons](icons.md).
    4. The link text color. See [colors](#colors).
    5. The link background color. See [colors](#colors).

### Text

Content of type `TEXT` allows displaying standalone text on a dashboard.

!!! example
    The following example is a list of all available configurations for contents of type `TEXT`:

    ```yaml title="app.config.yml"
    contents:
    - type: TEXT
      size: string # (1)!
      header: string # (2)!
      body: string # (3)!
    ```

    1. The content size. See [sizing](#sizing).
    2. The header.
    3. The body.

### Text Carousel

Content of type `TEXT_CAROUSEL` allows displaying multiple text nodes in a carousel format.

!!! example
    The following example is a list of all available configurations for contents of type `TEXT_CAROUSEL`:

    ```yaml title="app.config.yml"
    contents:
    - type: TEXT_CAROUSEL
      size: string # (1)!
      color: string # (2)!
      backgroundColor: string # (3)!
      slides: [<slide-config>] # (4)!
    ```

    1. The content size. See [sizing](#sizing).
    2. The default text color. See [colors](#colors).
    3. The default background color. See [colors](#colors).

## Contents Configurations

### Overrides

### Colors
