const rimraf = require("rimraf");
const fromFileToImages = require("./from-file-to-images");
const tesseract = require("node-tesseract-ocr");
const fs = require("fs");
const dir = "./output";

rimraf.sync("./output");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

// const images = ["./output/from-file-to-images/untitled.1.png", "./output/from-file-to-images/untitled.2.png"]
const images = [];

Promise.all([fromFileToImages()]).then(() => {
  fs.readdir(dir, (err, files) => {
    for (var i = 0; i < files.length; i++) {
      images.push("./output/" + files[i]);
    }
    tesseract
      .recognize(images, config)
      .then((text) => {
        // console.log("Result:", text);
        fs.writeFileSync("./output/outputPDFText.txt", text);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
