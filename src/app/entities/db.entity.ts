interface DbEntity {
    serialize(): object;
    deserialize<T extends DbEntity>(object: object): T;
}
