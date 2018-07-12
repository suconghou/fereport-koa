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

const parser = ua => {};

export default ua => {
	const ret = parser(ua);
	console.info(ret);
	return {
		// os,
		// broswer
	};
};
