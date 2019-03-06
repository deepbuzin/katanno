export interface DbEntity {
    serialize(): any;
    deserialize(object: any): DbEntity;
}
