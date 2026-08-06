import { main, prompt, queryParams, state, submit } from "./var";
import { createMessage } from "./create";
import { setHistory } from "./utils";
import { query } from "./query";

if (!state.apiHost)
	state.apiHost = location.protocol + "//" + location.hostname + ":11434";

if (queryParams.get("history")) {
	const history = queryParams.get("history").split("|||");
	history.forEach((text, i) => createMessage(text, i % 2 === 0));
	main.scrollTop = main.scrollHeight;
}

let copyTimeout = 0;

if (!state.model) {
	const response = await fetch(`${state.apiHost}/api/tags`);
	const data = await response.json();
	const select = document.createElement("select");

	select.innerHTML = '<option value="">Select a model</option>';
	select.innerHTML += data.models
		.map(model => `<option value="${model.name}">${model.model}</option>`)
		.join("");

	select.addEventListener("change", e => {
		state.model = (e.target as HTMLSelectElement).value;
		if (!state.model) return;
		select.remove();
		queryParams.set("model", state.model);
		window.history.pushState({}, "", `?${queryParams.toString()}`);
	});

	main.appendChild(select);
}

submit.addEventListener("click", query);
prompt.addEventListener("keydown", e => {
	if (e.key === "Enter" && e.shiftKey) {
		e.preventDefault();
		query();
	}
});

main.addEventListener("dblclick", e => {
	const target = e.target as HTMLDivElement;
	if (target.tagName === "DIV" || target.tagName === "P") {
		if (Date.now() - copyTimeout < 5000) return;
		copyTimeout = Date.now();

		const text = target.querySelector("p").innerText;
		navigator.clipboard.writeText(text);
		target.querySelector<HTMLDivElement>(".copy").innerText = "C!";
		setTimeout(() => {
			target.querySelector<HTMLDivElement>(".copy").innerText = "C";
		}, 1000);
	}
});

document.addEventListener("click", e => {
	const target = e.target as HTMLElement;
	const tClass = target.classList;
	const div = target.closest("div");

	if (tClass.contains("copy")) {
		const text = div.querySelector("p").innerText;
		navigator.clipboard.writeText(text);
		target.innerText = "C!";
		setTimeout(() => {
			target.innerText = "C";
		}, 1000);
	}

	if (tClass.contains("delete")) {
		if (!confirm("Delete message?")) return;
		div.remove();
		setHistory();
	}

	if (tClass.contains("edit")) {
		state.promptTemp = prompt.value;
		prompt.value = div.querySelector("p").innerText;
		state.targetEdit = div;
		state.blockQuery = true;
	}
});
