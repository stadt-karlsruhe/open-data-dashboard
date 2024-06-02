# Supported Data Types and Formats

`Open Data Dashboard` supports a number of different data types and formats.
Depending on the data type, different [visualizations](visualizations.md) for the data are available.

## CSV

CSV data can be visualized as Table and as Bar Chart.
Internally, it will be converted to JSON using [json-2-csv](https://www.npmjs.com/package/json-2-csv).

- The source must return the data as plain text.
- All lines must have the same exact number of CSV values.

!!! example

    ````csv
    StringColumn,IntegerColumn,FloatColumn,BooleanColumn
    Seal,24,9.1,true
    Bear,2023,5.1,false
    ````

## JSON

JSON data can be visualized as Table and as Bar Chart. Three different JSON formats are supported.
In particular, the JSON formats provided by the [CKAN Data Management System](https://ckan.org/) APIs can be directly used.
See examples of the supported JSON formats below.

!!! example

    ````json
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

!!! example

    ````json
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

!!! example

    ````json
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

## GeoJSON

GeoJSON data can be visualized as Map.

- The source must return valid GeoJSON data in accordance to [geojson.org](https://geojson.org/).

!!! example

    ````json
    {
    "type": "FeatureCollection",
    "features": [
        {
        "type": "Feature",
        "geometry": { "type": "Point", "coordinates": [8.413375, 49.009543] },
        "properties": {
            "NAME": "Akademischer Filmclub - Das Kino an der Uni",
            "GRUPPENNAME": "Kinos"
        }
        },
        {
        "type": "Feature",
        "geometry": { "type": "Point", "coordinates": [8.385310, 49.000467] },
        "properties": { "NAME": "Filmpalast am ZKM", "GRUPPENNAME": "Kinos" }
        },
        {
        "type": "Feature",
        "geometry": { "type": "Point", "coordinates": [8.396923, 49.010530] },
        "properties": { "NAME": "Kinemathek Studio 3", "GRUPPENNAME": "Kinos" }
        },
        {
        "type": "Feature",
        "geometry": { "type": "Point", "coordinates": [8.407869, 49.0032291] },
        "properties": { "NAME": "Schauburg", "GRUPPENNAME": "Kinos" }
        },
        {
        "type": "Feature",
        "geometry": { "type": "Point", "coordinates": [8.394230, 49.010161] },
        "properties": { "NAME": "Universum-City", "GRUPPENNAME": "Kinos" }
        }
    ]
    }
    ````

## HTML and PDF

Any HTML or PDF source accessible by URL can be embedded using the Embedded Viewer.
