export default interface BaseResponse<T> {
    message : string;
    statusCode : number;
    data : T
}

export interface ResponseParams  {
    message? : string | "Success";
    statusCode? : number | 200;
    data : any
}

export function formatResponse({message, data } : ResponseParams) {
    return {
        message : message,
        statusCode : 200,
        data : data
    }
}