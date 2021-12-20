//here we convert pdf to png images

const { fromPath } = require("pdf2pic");
const { mkdirsSync } = require("fs-extra");
const rimraf = require("rimraf");

module.exports = () => {
  const pdfFile = "./files/REGULAR SMALL.pdf";
  // const pdfFile = "./files/20 OZ.pdf";
  // const pdfFile = "./files/REGULAR SMALL.png";

  const outputDirectory = "./output";

  rimraf.sync(outputDirectory);

  mkdirsSync(outputDirectory);

  const baseOptions = {
    width: 2550,
    height: 3300,
    density: 330,
    savePath: outputDirectory,
  };

  const convert = fromPath(pdfFile, baseOptions);

  return convert.bulk(-1);
};
