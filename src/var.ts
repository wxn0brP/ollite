export const main = document.querySelector<HTMLDivElement>("main");
export const prompt = document.querySelector<HTMLInputElement>("#prompt");
export const submit = document.querySelector<HTMLDivElement>("#submit");

export const configs = JSON.parse(localStorage.getItem("config") || "{}");
export const queryParams = new URLSearchParams(window.location.search);

export const state = {
	apiHost: queryParams.get("apiHost"),
	model: queryParams.get("model"),
	blockQuery: false,
	promptTemp: "",
	targetEdit: null as HTMLDivElement,
};
