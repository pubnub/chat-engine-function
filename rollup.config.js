const convertImportToRequire = () => ({
  name: 'convert-import-to-require',
  renderChunk (code, chunk, options) {
    return {
      code: code.replace(
        /import (\w+) from \'(([\w\/])+)\';/g,
        "const $1 = require('$2');"
      ),
      map: null
    }
  }
});

export default [
    {
		external: ['kvstore', 'pubnub', 'xhr', 'crypto', 'codec/base64','codec/query_string', 'vault'],
		input: 'src/server.js',
		output: {
			file: 'app/functions/server.js',
			format: 'es',
		},
		plugins: [
			convertImportToRequire()
		]
	}
];