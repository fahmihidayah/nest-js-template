import { Request } from "express";
import { CountService } from "src/base/service";


export class Query {
    public extraQueries : Map<String, String> = new Map<String, String>()

    constructor(
        public page: number = 1,
        public take: number = 10,
        public orderBy: string = "id",
        public orderByDirection: string = "asc",
        public _start: number = 0,
        public _end: number = 10,
        public isAdmin: boolean = false,
        public _sort: string = "id",
        public _order: string = "asc",
        public id: number[] = []) {
    }
}

export function getQuery(request : Request) : Query {
    const query : Query = new Query(
        Number(request.query.page ?? "1"),
        Number(request.query.take ?? "10"),
        String(request.query.orderBy ?? "id"),
        String(request.query.orderByDirection ?? "asc"),
        Number(request.query._start ?? "0"),
        Number(request.query._end ?? "5"),
        request.headers['format'] === 'admin',
        String(request.query._sort ?? "id"),
        String(request.query._order ?? "asc"),
    )
    return query
}

export async function createQueryAction<T>(query: Query, repository: CountService): Promise<QueryAction> {
    if (!query.isAdmin) {
        const skip: number = (query.page - 1) * query.take;
        const count: number = await repository.countByQuery(query)
        const total: number = Math.ceil(count / query.take)
        return {
            skip: skip,
            take: query.take,
            totalPage: total,
            count: count,
            sort : query.orderBy,
            order : query.orderByDirection
        }
    }
    else {
        const count: number = await repository.countByQuery(query)
        const skip = query._start
        const take = query._end - query._start
        const total: number = Math.ceil(count / query.take)
        return {
            skip: skip,
            take: take,
            totalPage: total,
            count: count,
            sort : query._sort,
            order : query._order
        }
    }
}

export interface QueryAction {
    skip: number;
    take: number;
    totalPage: number;
    count: number;
    sort : string;
    order : string;
}
