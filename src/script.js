onload = () => {
	const I = 'ById', N = 'sByName', T = 'sByTagName';
	const getSetting = (input) => parseInt(input.value) <= 0 ? input.value = 1 : (parseInt(IStep.value) || 1);
	const getE = (method, ...ids) => ids.map(id => document[`getElement${method}`](id));
	const [IStep, ILen, INumOnly, IStart] = getE(I, 'IStep', 'ILen', 'INumOnly', 'IStart');
	const [DMain] = getE(N, 'DMain');
	let step = 1, len = 3, numOnly;
	IStep.value = step, IStep.oninput = () => step = getSetting(IStep);
	ILen.value = len, ILen.oninput = () => len = getSetting(ILen);
	(INumOnly.oninput = () => numOnly = INumOnly.checked)();
	const strNum = Array(10).fill().reduce((p, n, i) => p ? p + i : '01');
	const strFix = strNum + Array(26).fill().reduce((p, n, i) => p ? p + String.fromCharCode(97 + i) : 'ab');
	const randStr = (str = numOnly ? strNum : strFix) => str[Math.floor(Math.random() * str.length)];
	const random = (str = '') => (Array(len).fill().forEach(() => str += randStr()), str);
	let counter = - step - 1, lastMain, ndMain, nextMain = DMain[0], size = Math.round(100 / len);
	(IStart.onclick = () => {
		const newMain = document.createElement('div');
		newMain.className = 'HMain';
		// newMain.innerHTML = `
		// 	<div class="HHead">
		// 		<span class="HHMt">成绩：${++counter > 0 ? counter : 0}</span>
		// 	</div>
		// 	<div class="HText" style="font-size: ${size}vw;">${random()}</div>
		// ` + (counter > 0 ? `
		// 	<input class="HBtn" />
		// ` : `
		// 	<button class="HBtn">下一个</button>
		// `);
		document.body.appendChild(newMain);
		lastMain && (lastMain.style.right = '100vw');
		nextMain && (nextMain.style.right = '0');
		ndMain && document.removeChild(ndMain);
		[ndMain, lastMain, nextMain] = [lastMain, nextMain, newMain];
	})();
}