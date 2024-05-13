export const jsonSkipFields = [
    {
        StringColumn: 'Seal',
        BooleanColumn: true,
    },
    {
        StringColumn: 'Bear',
        BooleanColumn: false,
    },
];

export const jsonRenameFields = [
    {
        Name: 'Seal',
        IntegerColumn: 24,
        FloatColumn: 9.1,
        Boolean: true,
    },
    {
        Name: 'Bear',
        IntegerColumn: 2023,
        FloatColumn: 5.1,
        Boolean: false,
    },
];

export const jsonSkipAndRenameFields = [
    {
        Name: 'Seal',
        Boolean: true,
    },
    {
        Name: 'Bear',
        Boolean: false,
    },
];


