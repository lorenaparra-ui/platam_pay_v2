export declare abstract class Entity<T> {
    protected readonly props: T;
    constructor(props: T);
    abstract get id(): string;
    equals(other: Entity<T> | undefined): boolean;
    abstract toPrimitives(): Record<string, unknown>;
}
