export interface ICrud<Type,Key>{

    save(entity:Type):Promise<Type>;
    delete(id:Key);
    list():Promise<Type[]>;
    update(entity:Type);
    exists(id:Key);

}