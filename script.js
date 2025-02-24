const blocksData = [
	{
		title: "Block title",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, tortor sed commodo rhoncus, nulla mauris euismod neque, ac lacinia nisl nibh in mi.",
	},
	{
		title: "Block title",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, tortor sed commodo rhoncus, nulla mauris euismod neque, ac lacinia nisl nibh in mi.",
	},
	{
		title: "Block title",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, tortor sed commodo rhoncus, nulla mauris euismod neque, ac lacinia nisl nibh in mi.",
	},
];
const classNames = {
	containerClass: "accordion",
	blockClass: "accordion__block",
	xmarkClass: "accordion__xmark",
	textClass: "accordion__text",
	xmarkOpenClass: "accordion__xmark--open",
	textOpenClass: "accordion__text--open",
};
const openElementType = {
	xmark: "xmark",
	text: "text",
};
const suffixOpenClassName = "OpenClass";
let openBlockIndex = 0;
const accordion = document.querySelector("." + classNames.containerClass);

init();

function init() {
	let blocksElementStr = "";
	blocksData.forEach((data, ind) => {
		blocksElementStr += createBlock(data, ind);
	});

	// insertAdjacentHTML is faster than innerHTML
	accordion.insertAdjacentHTML("beforeend", blocksElementStr);

	// use EventListener at xmark button instead of onclick for better performance and scalable
	accordion.addEventListener("click", (event) => {
		const btn = event.target.closest("." + classNames.xmarkClass);
		if (!btn || !accordion.children) return;
		const block = btn.closest("." + classNames.blockClass);
		const index = [...accordion.children].indexOf(block);
		toggleBlock(index);
	});
}

function createBlock(blockData, ind) {
	const isOpen = openBlockIndex === ind;
	return `
		<div class="accordion__block">
			<div class="accordion__header">
				<h3 class="accordion__title">${blockData.title + " " + (ind + 1)}</h3>
				<button 
					class="${classNames.xmarkClass} 
						${isOpen ? classNames.xmarkOpenClass : ""}
					"
				></button>
			</div>
			<p class="${classNames.textClass} 
				${isOpen ? classNames.textOpenClass : ""}
			">
				${blockData.text}
			</p>
		</div>
	`;
}

function toggleBlock(index) {
	if (accordion?.children?.length && accordion.children[index]) {
		const blockElement = accordion.children[index];
		const xmark = blockElement.querySelector("." + classNames.xmarkClass);
		const text = blockElement.querySelector("." + classNames.textClass);
		const isOpen = openBlockIndex === index;
		openBlockIndex = isOpen ? -1 : index;

		if (text && xmark && !isOpen) {
			handleOpenBlock(xmark, openElementType.xmark);
			handleOpenBlock(text, openElementType.text);
		}
		// If we click on the 'X' button of an open block,
		// it will close that block (all 3 blocks will be in closed state)
		else if (text && xmark && isOpen) {
			handleCloseBlock(xmark, openElementType.xmark);
			handleCloseBlock(text, openElementType.text);
		}
	}
}

function handleOpenBlock(element, xmarkOrText = openElementType.xmark) {
	const otherOpen = document.querySelector(
		"." + classNames[xmarkOrText + suffixOpenClassName]
	);
	if (otherOpen) {
		otherOpen.classList.remove(
			classNames[xmarkOrText + suffixOpenClassName]
		);
	}

	element.classList.add(classNames[xmarkOrText + suffixOpenClassName]);
}

function handleCloseBlock(element, xmarkOrText = openElementType.xmark) {
	element.classList.remove(classNames[xmarkOrText + suffixOpenClassName]);
}
