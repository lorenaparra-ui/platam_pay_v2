export abstract class Entity<T> {
  constructor(protected readonly props: T) {}

  abstract get id(): string;

  equals(other: Entity<T> | undefined): boolean {
    if (other === undefined) {
      return false;
    }
    return this.id === other.id;
  }

  abstract toPrimitives(): Record<string, unknown>;
}
