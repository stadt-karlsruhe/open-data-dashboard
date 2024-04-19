declare module '*.yaml' {
    interface Person {
        name: string;
        age: number;
    }

    interface Data {
        person: Person;
        test: number;
    }

    const value: Data;
    export default value;
}

declare module '*.yml' {
    interface Person {
        name: string;
        age: number;
    }

    interface Data {
        person: Person;
        test: number;
    }

    const value: Data;
    export default value;
}
