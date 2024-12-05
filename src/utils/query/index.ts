import { BaseQuery } from "src/utils/query/data";

export function getQuery<Q extends BaseQuery>(query: Q) {
	const where = query.fields?.split(",")?.map((field) => {
		return {
			[field]: {
				contains: query.keyword,
			},
		};
	});
	return where;
}

export function getFindManyArgs<Q extends BaseQuery>(query: Q) {
	const where = getQuery(query);

	const whereInput = {
		OR: where,
	};

	const take = query.pageSize || 10;
	const skip = query.page ? (query.page - 1) * take : 0;

	const findManyArgs = {
		where: whereInput,
		take: +take,
		skip: +skip,

		include: {
			roles: true,
		},
		orderBy: {
			[query.orderColumn]: query.orderBy,
		},
	};

	return findManyArgs;
}
