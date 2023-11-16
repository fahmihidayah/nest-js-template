import { Prisma } from "@prisma/client";
import { Query } from "src/utils/request";

export interface CreateService<F, D> {
    create(form : F) : Promise<D> 
}

export interface RetrieveService<D, K> {
    findByQuery(query : Query) : Promise<Array<D>>
    findOne(id : K) : Promise<D | null>
}

export interface UpdateService<K, F, D> {
    update(id : K, form : F) : Promise<D>
}

export interface DeleteService<K, D> {
    delete(id : K) : Promise<D>
}

