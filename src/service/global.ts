//export const root = "/api";
//export const root = "http://121.37.158.48:5000/api"
export const root = "http://localhost:5173/api"
// export const;

export const getRequestInit = (): RequestInit => {
	const token = localStorage.getItem("token");
	return {
		method: "GET",
		headers: {
			Authentication: `Bearer ${token}`,
		},
	};
};

export const emptyPostRequestInit = (): RequestInit => {
	// const token = localStorage.getItem("token");
	return {
		method: "POST",
		headers: {
			// Authentication: `Bearer ${token}`,
		}
	}
}

export const postRequestInit = (content: string | FormData): RequestInit => {
	// const token = localStorage.getItem("token");
	return {
		method: "POST",
		body: content,
		headers: {
			// Authentication: `Bearer ${token}`,
			"Content-Type":
				typeof content === "string"
					? "application/json"
					: "multipart/form-data",
		},
	};
};
