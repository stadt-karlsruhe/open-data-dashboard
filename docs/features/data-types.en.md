# Data Types and Formats

`Open Data Dashboard` supports a number of different data types and formats.
Depending on the data type, different [visualizations](visualizations.md) for the data are available.

## CSV

CSV data will get converted to JSON using [json-2-csv](https://www.npmjs.com/package/json-2-csv).

**Prerequisites:**

- The source must return the data as plain text.
- All lines must have the same exact number of CSV values.

````csv title="Example Data" linenums="1"
StringColumn,IntegerColumn,FloatColumn,BooleanColumn
Seal,24,9.1,True
Bear,2023,5.1,False
````

**Visualizations:**

- [Bar Chart](visualizations.md#bar-chart)
- [Table](visualizations.md#table)

## JSON

`Open Data Dashboard` supports three different JSON formats.
In particular, the JSON formats provided by the [CKAN Data Management System](https://ckan.org/) APIs can be directly used.

**Prerequisites:**

- The source must return the data in one of the three supported JSON formats. See examples below.

````json title="Example Data (Format 1)" linenums="1"
[
  {
    "StringColumn": "Seal",
    "IntegerColumn": 24,
    "FloatColumn": 9.1,
    "BooleanColumn": true
  },
  {
    "StringColumn": "Bear",
    "IntegerColumn": 2023,
    "FloatColumn": 5.1,
    "BooleanColumn": false
  }
]
````

````json title="Example Data (Format 2)" linenums="1"
{
  "fields": [
    {
      "type": "text",
      "id": "StringColumn"
    },
    {
      "type": "int",
      "id": "IntegerColumn"
    },
    {
      "type": "float",
      "id": "FloatColumn"
    },
    {
      "type": "boolean",
      "id": "BooleanColumn"
    }
  ],
  "records": [
    ["Seal", 24, 9.1, true],
    ["Bear", 2023, 5.1, false]
  ]
}
````

````json title="Example Data (Format 3)" linenums="1"
{
  "success": true,
  "result": {
    "fields": [
      {
        "type": "text",
        "id": "StringColumn"
      },
      {
        "type": "int",
        "id": "IntegerColumn"
      },
      {
        "type": "float",
        "id": "FloatColumn"
      },
      {
        "type": "boolean",
        "id": "BooleanColumn"
      }
    ],
    "records": [
      {
        "StringColumn": "Seal",
        "IntegerColumn": 24,
        "FloatColumn": 9.1,
        "BooleanColumn": true
      },
      {
        "StringColumn": "Bear",
        "IntegerColumn": 2023,
        "FloatColumn": 5.1,
        "BooleanColumn": false
      }
    ]
  }
}
````

**Visualizations:**

- [Bar Chart](visualizations.md#bar-chart)
- [Table](visualizations.md#table)

## GeoJSON

**Prerequisites:**

- The source must return valid GeoJSON data.

````json title="Example Data"
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [8.413375, 49.009543] },
      "properties": {
        "NAME": "Akademischer Filmclub - Das Kino an der Uni",
        "GRUPPENNAME_DE": "Kinos"
      }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [8.385310, 49.000467] },
      "properties": { "NAME": "Filmpalast am ZKM", "GRUPPENNAME_DE": "Kinos" }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [8.396923, 49.010530] },
      "properties": { "NAME": "Kinemathek Studio 3", "GRUPPENNAME_DE": "Kinos" }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [8.407869, 49.0032291] },
      "properties": { "NAME": "Schauburg", "GRUPPENNAME_DE": "Kinos" }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [8.394230, 49.010161] },
      "properties": { "NAME": "Universum-City", "GRUPPENNAME_DE": "Kinos" }
    }
  ]
}
````

**Visualizations:**

- [Map](visualizations.md#map)

## HTML and PDF

Any HTML or PDF source accessible by URL can be embedded into the `Open Data Dashboard`.

**Visualizations:**

- [Embedded Viewer](visualizations.md#embedded-viewer)
