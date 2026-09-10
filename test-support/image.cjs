module.exports = {process(source, file) {
  return {code: "module.exports = " + JSON.stringify(file)};
}};
