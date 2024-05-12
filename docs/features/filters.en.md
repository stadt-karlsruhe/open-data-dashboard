# Real-Time Filters

!!! note
    This feature is only available for [Bar Chart](visualizations.md#bar-chart) and [Table](visualizations.md#table) visualizations.

`Open Data Dashboard` allows filtering of the visualized data. Upon changing the value of a filter, the displayed data will update instantaneously.

<figure markdown="span">
    ![Real-Time Filters](../assets/filters.png "Real-Time Filters"){ loading=lazy }
    <figcaption>Example Map</figcaption>
</figure>

**Features:**

<!-- TODO: Update features after refactoring in https://h-ka-team-rdqzrlfpomci.atlassian.net/browse/ODDSK-148 -->
- Partial string matching across all columns (ignores case)
- Min-/Max-Boundaries for numeric columns
- Partial string matching for non-numeric columns (ignores case)
