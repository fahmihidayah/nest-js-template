export type BaseQuery = {
    keyword?: string;
    fields?: string;
    page?: number;
    pageSize?: number;
    orderColumn?: string;
    orderBy?: "asc" | "desc";

}