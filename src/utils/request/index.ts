import { Request } from "express";

export interface Query {
    page? : number
}

export function getQuery(request : Request) : Query { 
    return {
        page : Number(request.query['page']) ?? 1
    }
}