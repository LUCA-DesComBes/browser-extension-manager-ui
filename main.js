let container = document.querySelector(".container");
const buttonIsActive = document.querySelector("#isActive");
const buttonIsInactive = document.querySelector("#isInactive");
const buttonAll = document.querySelector("#all");
const btns = document.querySelectorAll(".btn-truc");

let activeBtn = null;

const inputCheckbox = createElement("input", {
	type: "checkbox",
	name: "toggle",
});

let globalData = [];
let fileredData = [];

function createElement(tag, attributes = {}, textContent = "") {
	const element = document.createElement(tag);
	for (const key in attributes) {
		if (key === "className") element.className = attributes[key];
		else element.setAttribute(key, attributes[key]);
	}
	if (textContent) element.textContent = textContent;
	return element;
}

function createDiv(logo, name, description, isActive) {
	const div = createElement("div", { className: "containerObject" });

	const divFlexRow = createElement("div", { className: "f-r" });
	div.appendChild(divFlexRow);

	const divBtnPlusToggle = createElement("div", { className: "btn-toggle" });
	div.appendChild(divBtnPlusToggle);

	const imgLogo = createElement("img", { src: logo, alt: name });
	divFlexRow.appendChild(imgLogo);

	const divNameDesc = createElement("div", { className: "name-desc-f-c" });
	divFlexRow.appendChild(divNameDesc);

	const h3 = createElement("h3", { className: "heading-three" }, name);
	divNameDesc.appendChild(h3);

	const para = createElement("p", { className: "first-para" }, description);
	divNameDesc.appendChild(para);

	const btnRemove = createElement(
		"button",
		{ className: "btn-remove" },
		"Remove"
	);
	divBtnPlusToggle.appendChild(btnRemove);

	const label = createElement("label", { className: "toggle-switch" });
	divBtnPlusToggle.appendChild(label);

	const inputCheckbox = createElement("input", {
		type: "checkbox",
		name: "toggle",
		id: name,
	});
	label.appendChild(inputCheckbox);

	if (isActive) {
		inputCheckbox.checked = true;
	}

	inputCheckbox.addEventListener("click", (e) => { 
		for (let i = 0; i < globalData.length; i++) {
			if (globalData[i].name === e.currentTarget.id) {
				globalData[i].isActive = e.currentTarget.checked;
			}
		}
	});

	const spanSlider = createElement("span", { className: "slider" });
	label.appendChild(spanSlider);

	return div;
}

// {/* <label class="toggle-switch">
//   <input type="checkbox">
//   <span class="slider"></span>
// </label> */}

for (const btn of btns) {
	btn.addEventListener("click", (e) => {
		if (activeBtn && activeBtn !== e.currentTarget) {
			activeBtn.style.backgroundColor = "#2f364b";
			activeBtn.style.color = "#fbfdfe";
			activeBtn.style.border = "#535868 solid 1px";
			activeBtn.removeEventListener("click", handleClick);
		}

		e.currentTarget.style.backgroundColor = "#F25C54";
		e.currentTarget.style.color = "#091540";
		e.currentTarget.style.border = "none";

		e.currentTarget.addEventListener("click", handleClick);

		activeBtn = e.currentTarget;
	});
}

function handleClick(e) {
	console.log(`Bouton ${e.currentTarget.innerText} activé.`);
}

buttonIsActive.addEventListener("click", () => {
	const newData = [];

	for (let i = 0; i < globalData.length; i++) {
		if (globalData[i].isActive == true) {
			newData.push(globalData[i]);
			console.log(newData);
		}
	}

	fileredData = newData;

	container.remove();

	container = document.createElement("div");
	container.classList.add("container");

	document.body.appendChild(container);

	for (let i = 0; i < fileredData.length; i++) {
		const element = fileredData[i];

		const myCard = createDiv(
			element.logo,
			element.name,
			element.description,
			element.isActive
		);
		inputCheckbox.checked = true;
		container.appendChild(myCard);
	}
});

buttonIsInactive.addEventListener("click", () => {
	const newData = [];

	for (let i = 0; i < globalData.length; i++) {
		if (globalData[i].isActive == false) {
			newData.push(globalData[i]);
			console.log(newData);
		}
	}

	fileredData = newData;

	container.remove();

	container = document.createElement("div");
	container.classList.add("container");

	document.body.appendChild(container);

	for (let i = 0; i < fileredData.length; i++) {
		const element = fileredData[i];

		const myCard = createDiv(
			element.logo,
			element.name,
			element.description,
			element.isActive
		);
		inputCheckbox.checked = false;
		container.appendChild(myCard);
	}
});

buttonAll.addEventListener("click", () => {
	container.remove();

	container = document.createElement("div");
	container.classList.add("container");

	document.body.appendChild(container);

	for (let i = 0; i < globalData.length; i++) {
		const element = globalData[i];

		const myCard = createDiv(
			element.logo,
			element.name,
			element.description,
			element.isActive
		);
		container.appendChild(myCard);
	}
});

fetch("./data.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error("Erreur lors du chargement du fichier");
		}
		return response.json();
	})
	.then((data) => {
		globalData = data;
		fileredData = globalData;

		for (let i = 0; i < fileredData.length; i++) {
			const element = fileredData[i];

			const myCard = createDiv(
				element.logo,
				element.name,
				element.description,
				element.isActive
			);
			container.appendChild(myCard);
		}
	})
	.catch((error) => {
		console.error("Erreur:", error);
	});
