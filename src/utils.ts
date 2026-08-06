import { main, queryParams } from "./var";

export function extractHistory() {
	return Array.from(main.querySelectorAll("div"))
		.map(div => div.querySelector("p").innerText)
		.filter(text => text.trim());
}

export function setHistory() {
	const history = extractHistory();
	queryParams.set("history", history.join("|||"));
	window.history.pushState({}, "", `?${queryParams.toString()}`);
}
