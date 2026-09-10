const ts = require('../hw6/node_modules/typescript');
module.exports = {process(source, file) {
  return {code: ts.transpileModule(source, {fileName: file, compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    target: ts.ScriptTarget.ES2020
  }}).outputText};
}};
