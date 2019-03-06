export interface DbEntity {
    serialize(): object;
    deserialize(object: any): DbEntity;
}
