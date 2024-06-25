# Appearance

## Themes

Optionally, specify a theme to customize the appearance of the application. By default, the `bootstrap-light` theme will be used.

!!! example
    ```yaml title="app.config.yml"
    appearance:
        theme: string
    ```

Available Themes:

* `bootstrap-light`: This is the default Bootstrap [light theme](https://getbootstrap.com/docs/5.3/customize/color-modes/).
* `karlsruhe`: This a theme based on the corporate design of the city of Karlsruhe.

## Icons

Some configuration options allow specifying a custom icon.
The `Open Data Dashboard` uses the [Bootstrap Icons](https://icons.getbootstrap.com/) library. Any icon available there can be used.

!!! note
    Use the **icon name**, not the CSS class when specifying an icon.
    For example, to use the [House door fill](https://icons.getbootstrap.com/icons/house-door-fill/) icon, the value of the `icon` property should be `house-door-fill`.

## Colors

Some configuration options allow specifying a custom [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) or [background color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color).
Any [legal CSS color values](https://www.w3schools.com/cssref/css_colors_legal.php) can be used. Additionally, Bootstrap CSS color variables are allowed.
For a full list of available Bootstrap color variables refer to the [documentation](https://getbootstrap.com/docs/5.2/customize/css-variables/#root-variables).
