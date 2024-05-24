export const filterAllEntries = {
    'all-entries': 'sea',
};

export const filterAllEntriesInvalid = {
    'all-entries': { min: '2' },
};

export const filterString = {
    StringColumn: 'Seal',
};

export const filterInteger = {
    IntegerColumn: {
        max: '25',
    },
};

export const filterFloat = {
    FloatColumn: {
        min: '6',
    },
};

export const filterMixed = {
    StringColumn: 'Seal',
    IntegerColumn: {
        min: '1',
        max: '25',
    },
    'all-entries': 'sea',
};
