export interface Response<T> {
    code: number,
    data: T,
    success: boolean
}

export interface Pagination<T> {
    count: number,
    next: number | null,
    previous: number | null
    results: Array<T>
}
