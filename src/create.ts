import { main } from "./var";

export function createMessage(text = "", isUser = false) {
	const div = document.createElement("div");
	main.appendChild(div);
	if (isUser) div.classList.add("user");
	else div.classList.add("bot");

	const p = document.createElement("p");
	p.innerText = text;
	div.appendChild(p);

	const article = document.createElement("article");
	div.appendChild(article);

	const copy = document.createElement("button");
	copy.innerText = "C";
	copy.classList.add("copy");
	article.appendChild(copy);

	const del = document.createElement("button");
	del.innerText = "D";
	del.classList.add("delete");
	article.appendChild(del);

	const edit = document.createElement("button");
	edit.innerText = "E";
	edit.classList.add("edit");
	article.appendChild(edit);

	return div;
}
