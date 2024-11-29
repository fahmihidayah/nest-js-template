export interface PaginateList<T> {
	count: number;
	page: number;
	totalPage: number;
	data: T;
}

export interface BaseResponse<T> {
	message: string;
	statusCode: number;
	data: T;
}

export interface ResponseParams {
	message?: string | "Success";
	statusCode?: number | 200;
	data: any;
	extractData?: boolean | false;
}

export function formatResponse({ message, data, extractData }: ResponseParams) {
	if (extractData) {
		return {
			message: message,
			statusCode: 200,
			...data,
		};
	}
	return {
		message: message,
		statusCode: 200,
		data: data,
	};
}
