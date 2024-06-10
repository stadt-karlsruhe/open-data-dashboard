# Categories

Categories can be used to group resources in the UI to simplify navigating between them. Each resource must have a category and can optionally have a subcategory.

## Configurations

Categories and subcategories expose identical configuration options:

| Parameter     | Description                                                                                       | Type     |
| ------------- | ------------------------------------------------------------------------------------------------- | -------- |
| `name`        | The unique category/subcategory name.                                                             | Required |
| `description` | The category/subcategory description.                                                             | Optional |
| `icon`        | The category/subcategory [icon](#icons) name.                                                     | Optional |

!!! example
    The following example is a list of all available categories configurations:

    ```yaml title="app.config.yml"
    categories:
    - name: string
      description: string
      icon: string
      subcategories: [category]
    ```

## Icons

The `Open Data Dashboard` is using the [Bootstrap Icons](https://icons.getbootstrap.com/) library. Any available icon can be used.

!!! note
    Use the **icon name**, not the CSS class when specifying an icon.
    For example, to use the [House door fill](https://icons.getbootstrap.com/icons/house-door-fill/) icon, the value of the `icon` property should be `house-door-fill`.
