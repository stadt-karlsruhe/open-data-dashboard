# Categories

Categories can be used to group resources in the UI to simplify navigating between them. Each resource must belong to a category or subcategory.

## Configurations

Categories and subcategories expose identical configuration options:

| Parameter     | Description                                                                          | Type     |
| ------------- | ------------------------------------------------------------------------------------ | -------- |
| `name`        | The unique category/subcategory name.                                                | Required |
| `description` | The category/subcategory description.                                                | Optional |
| `icon`        | The category/subcategory [icon](appearance.md#icons) name.                           | Optional |
| `resources`   | The resources belonging to a given category/subcategory as an array of resource ids. | Optional |

!!! example
    The following example is a list of all available categories configurations:

    ```yaml title="app.config.yml"
    categories:
    - name: string
      description: string
      icon: string
      resources: [string]
      subcategories: [category]
    ```
