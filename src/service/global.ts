//export const root = "/api";
// export const root = "http://192.168.137.1:5000/api"
import {GetToken} from "./LoginService.ts";

export const root = "http://localhost:5173/api"
// export const;

export const getRequestInit = async (): Promise<RequestInit> => {
	const token = await GetToken();
	return {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

export const emptyPostRequestInit = async (): Promise<RequestInit> => {
	const token = await GetToken();
	return {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		}
	}
}

export const postRequestInit = async (content: string | FormData): Promise<RequestInit> => {
	const token = await GetToken();
	return {
		method: "POST",
		body: content,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type":
				typeof content === "string"
					? "application/json"
					: "multipart/form-data",
		},
	};
};
export const putRequestInit = async (content: string | FormData): Promise<RequestInit> => {
	const token = await GetToken();
	return {
		method: "PUT",
		body: content,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type":
				typeof content === "string"
					? "application/json"
					: "multipart/form-data",
		},
	};
};
