export const expiresInfo = (expiresAt: string) => {
    const eventTime = new Date(expiresAt).getTime() / 1000;
    const currentTime = Date.now() / 1000;
    const diffTime = eventTime - currentTime;

    return { isExpired: diffTime <= 0, diffTime };
};
