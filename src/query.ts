import { createMessage } from "./create";
import { extractHistory, setHistory } from "./utils";
import { configs, main, prompt, state } from "./var";

export async function query() {
	if (state.blockQuery) {
		const text = prompt.value.trim();
		if (!text) return;
		state.targetEdit.querySelector("p").innerText = text;
		prompt.value = state.promptTemp;
		setHistory();
		state.blockQuery = false;
		state.targetEdit.querySelector<HTMLDivElement>(".edit").innerText = "E!";
		setTimeout(() => {
			state.targetEdit.querySelector<HTMLDivElement>(".edit").innerText = "E";
		}, 1000);
		return;
	}

	const promptText = prompt.value;
	prompt.value = "";

	createMessage(promptText, true);
	const div = createMessage("", false);
	const p = div.querySelector("p");

	const messages = extractHistory().map((text, i) => ({
		role: i % 2 === 0 ? "user" : "assistant",
		content: text,
	}));

	const response = await fetch(`${state.apiHost}/api/chat`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...configs,
			model: state.model,
			messages,
			stream: true,
		}),
	});

	const reader = response.body.getReader();
	const decoder = new TextDecoder("utf-8");
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, {
			stream: true,
		});
		const lines = buffer.split("\n");

		for (let i = 0; i < lines.length - 1; i++) {
			const line = lines[i].trim();
			if (line) {
				const data = JSON.parse(line);
				if (data.message && data.message.content) {
					p.innerText += data.message.content;
				}
			}
		}
		buffer = lines[lines.length - 1];

		if (main.scrollHeight - main.scrollTop - main.clientHeight < 30)
			main.scrollTop = main.scrollHeight;
	}

	if (buffer.trim()) {
		const data = JSON.parse(buffer);
		if (data.message && data.message.content) {
			p.innerText += data.message.content;
		}
	}

	setHistory();
	main.scrollTop = main.scrollHeight;
}
