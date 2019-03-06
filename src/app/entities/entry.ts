class Entry implements DbEntity {
    private _id: string;
    private _filename: string;

    deserialize<Entry>(object: object): Entry {
        return undefined;
    }

    serialize(): object {
        return undefined;
    }

}
