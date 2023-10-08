export type DateUnion = 'day' | 'week' | 'month';

export function getBeginningOfDate(type: DateUnion): Date {
    const currentDate = new Date();

    if (type === 'day')
        return new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );

    if (type === 'week')
        return new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay()
        );

    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
}
