export class Observer<T> {
    private _subscribers: Set<(value: T) => void> = new Set();

    subscribe = (fn: (value: T) => void): (() => void) => {
        this._subscribers.add(fn);
        return () => this._subscribers.delete(fn);
    };

    emit = (value: T): void => {
        this._subscribers.forEach((fn) => {
            fn(value);
        });
    };
}
