import { Prisma } from "@prisma/client";
import { Query } from "src/utils/request";
import { PaginateList } from "src/utils/response";

export interface CreateService<F, D> {
	create(form: F): Promise<D>;
}

export interface RetrieveService<D, K> {
	findByQuery(query: Query): Promise<PaginateList<Array<D>>>;
	findOne(id: K): Promise<D | null>;
}

export interface UpdateService<K, F, D> {
	update(id: K, form: F): Promise<D>;
}

export interface RemoveService<K, D> {
	remove(id: K): Promise<D>;
}

export interface CountService {
	countByQuery(query: Query): Promise<number>;
	count(): Promise<number>;
}
