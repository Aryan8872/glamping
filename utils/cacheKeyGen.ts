export const cacheKeyGen = ({ key, params }: { key: string, params?: any }) => {
    return (
        params ? `${key}-${JSON.stringify(params)}` : key
    )
}