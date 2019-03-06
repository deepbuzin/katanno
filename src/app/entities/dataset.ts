class Dataset implements DbEntity {
    private _id: string;
    private _name: string;
    private _description: string;
    private _entryIds: Array<string>;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get entryIds(): Array<string> {
        return this._entryIds;
    }

    set entryIds(value: Array<string>) {
        this._entryIds = value;
    }

    deserialize<Dataset>(object: object): Dataset {
        return undefined;
    }

    serialize(): object {
        return {
            _id: this._id,
            name: this._name,
            description: this._description,
            entryIds: this._entryIds
        };
    }

}

