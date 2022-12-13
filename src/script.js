(() => {
	let step = 2, len = 3, numOnly, counter, lastMain, ndMain, nextMain, size, ans = [];
	const I = 'ById', N = 'sByName', T = 'sByTagName';
	const getSetting = (input) => parseInt(input.value) <= 0 ? input.value = 1 : (parseInt(input.value) || 1);
	const getE = (method, ...ids) => ids.map(id => document[`getElement${method}`](id));
	const strNum = Array(10).fill().reduce((p, n, i) => p ? p + i : '01');
	const strFix = strNum + Array(26).fill().reduce((p, n, i) => p ? p + String.fromCharCode(97 + i) : 'ab');
	const randStr = (str = numOnly ? strNum : strFix) => str[Math.floor(Math.random() * str.length)];
	const random = (str = '') => (Array(len).fill().forEach(() => str += randStr()), str);
	const creE = ({ dad = null, tag = 'div', cln = '', css = {}, act = () => void 0, html = '' } = {}) => {
		const node = document.createElement(tag);
		[node.className, node.onclick, node.innerHTML] = [cln, act, html];
		for (const key in css) node.style[key] = css[key];
		return dad ? dad.appendChild(node) : node;
	};
	onload = () => {
		const [DMain] = getE(N, 'DMain');
		IStep.value = step, IStep.oninput = () => (step = getSetting(IStep), reset());
		ILen.value = len, ILen.oninput = () => (len = getSetting(ILen), reset());
		(INumOnly.oninput = () => numOnly = INumOnly.checked)();
		const reset = () => (counter = - step, size = Math.round(100 / (len < 3 ? 3 : len)));
		reset(), (nextMain = DMain[0])._display = () => 0, counter = - step - 1;
		let con = [];
		const idInput = (n) => (con[n === 10 ? 'pop' : 'push'](n), con.length === len && (con.join('') === ans[0] && (ans.shift(), next()), con = []), ICon.innerHTML = con.join('') + '_');
		for (const td of IKBox.getElementsByTagName('td')) td.innerHTML === '退格' ? td.onclick = () => idInput(10) : td.onclick = () => idInput(parseInt(td.innerText));
		const next = (n) => {
			if (n) { if (n._flag) return; else n._flag = true; }
			counter++;
			const newMain = creE({ cln: 'HMain bodylike', dad: document.body });
			creE({ tag: 'span', cln: 'HHMt', html: '成绩：' + (ICount.innerHTML = counter >= 0 ? counter : 0), dad: creE({ dad: newMain, cln: 'HHead' }) });
			newMain._display = ((node) => () => (node.innerHTML = ans[ans.push(random()) - 1], node.style.fontSize = size + 'vw'))(creE({ cln: 'HText', dad: newMain }));
			counter >= 0 ? (counter > 0 && (IKBox.style.display = 'block'), ITip.innerHTML = counter) : creE({ tag: 'button', cln: 'HBtn HBottom', html: '下一个', act() { next(this) }, dad: newMain });
			lastMain && (lastMain.style.right = '100vw');
			nextMain && (nextMain.style.right = '0', nextMain._display());
			ndMain && document.body.removeChild(ndMain);
			[ndMain, lastMain, nextMain] = [lastMain, nextMain, newMain];
		};
		IStart.onclick = () => next(IStart), next();
	};
})();