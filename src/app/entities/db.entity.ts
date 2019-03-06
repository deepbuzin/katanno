export interface DbEntity {
    serialize(): object;
    deserialize<T extends DbEntity>(object: any): T;
}
