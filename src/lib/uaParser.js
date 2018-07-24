const broswer = {
	chrome: 'Chrome',
	safari: 'Safari',
	firefox: 'Firefox',
	android: 'Android Browser',
	msafari: 'Mobile Safari'
};

const os = {
	windows: 'Windows',
	macos: 'Mac OS',
	android: 'Android',
	ubuntu: 'Ubuntu',
	linux: 'Linux'
};

const regexes = {
	browser: {
		[broswer.chrome]: /Chrome\/(?<version>[\d\.]+)/,
		[broswer.safari]: /Version\/(?<version>[\d\.]+)\s+Safari/,
		[broswer.firefox]: /\s+Firefox\/(?<version>[\d\.]+)/,
		[broswer.android]: /Android\s+[\d\.]+;.*Version\/(?<version>[\d\.]+)\s+Mobile/,
		[broswer.msafari]: /iPhone;.*CPU\s+iPhone\s+OS\s+[\d_]+.*Version\/(?<version>[\d\.]+)/
	},
	os: {
		[os.windows]: /Windows\s+NT\s+(?<version>[\d\.]+);/,
		[os.macos]: /Macintosh;\s+Intel\s+Mac\s+OS\s+X\s+(?<version>[\d\._]+)/,
		[os.linux]: /\d+/,
		[os.ubuntu]: /\d+/,
		[os.android]: /Linux;\s+U;\s+Android\s+(?<version>[\d\.]+);/,
		[os.iphone]: /iPhone;\s+U;\s+CPU\s+iPhone\s+OS\s+(?<version>[\d\._]+)/
	}
};

const parser = ua => {
	const { browser, os } = regexes;
	const b = Object.keys(browser);
	const o = Object.keys(os);
	const r = { broswer: {}, os: {} };
	for (let i = 0, j = b.length; i < j; i++) {
		const bName = b[i];
		const reg = browser[bName];
		if (reg.test(ua)) {
			const ret = reg.exec(ua);
			r.broswer = {
				name: bName,
				version: ret.groups.version.replace(/_/g, '.')
			};
			break;
		}
	}
	for (let i = 0, j = b.length; i < j; i++) {
		const oName = o[i];
		const reg = os[oName];
		if (reg.test(ua)) {
			const ret = reg.exec(ua);
			r.os = {
				name: oName,
				version: ret.groups.version.replace(/_/g, '.')
			};
			break;
		}
	}
	return r;
};

export default ua => {
	const ret = parser(ua);
	return ret;
};
