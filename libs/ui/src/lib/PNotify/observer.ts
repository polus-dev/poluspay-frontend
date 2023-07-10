export class Observer<T> {
    private _value: T;
    private _subscribers: Set<(value: T) => void> = new Set();

    constructor(initialValue: T) {
        this._value = initialValue;
    }

    subscribe = (fn: (value: T) => void): (() => void) => {
        this._subscribers.add(fn);
        return () => this._subscribers.delete(fn);
    };

    emit = (value: T): void => {
        this._value = value;
        this._subscribers.forEach((fn) => {
            fn(this._value);
        });
    };
}
