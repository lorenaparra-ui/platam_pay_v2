export interface Repository<Entity> {
    findById(id: string): Promise<Entity | null>;
    save(entity: Entity): Promise<void>;
    delete(id: string): Promise<void>;
}
