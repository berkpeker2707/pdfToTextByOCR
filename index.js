//here we convert images to txt file using ocr

const rimraf = require("rimraf");
const fromFileToImages = require("./from-file-to-images");
const tesseract = require("node-tesseract-ocr");
const fs = require("fs");
// const textract = require("textract");
const dir = "./output";
// import { Ocr } from 'node-ts-ocr';
// const { Ocr } = require("node-ts-ocr");
// const path = require("path");
// const temp = require("temp");

// import * as path from 'path';
// import * as temp from 'temp';

// const pdfFile = "./files/REGULAR SMALL.pdf";
// const pdfFile = "./files/specimen1.pdf";

rimraf.sync("./output");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

// const images = ["./output/from-file-to-images/untitled.1.png", "./output/from-file-to-images/untitled.2.png"]
// const images = ["./output/from-file-to-images/untitled.1.png", "./output/from-file-to-images/untitled.2.png"]
// const images = ["./output/from-file-to-images/20 OZ.png"];
const images = [];

Promise.all([fromFileToImages()]).then(() => {
  fs.readdir(dir, (err, files) => {
    for (var i = 0; i < files.length; i++) {
      images.push("./output/" + files[i]);
    }

    // // does the work without OCR
    // textract.fromFileWithPath(pdfFile, config, function (error, text) {
    //   fs.writeFileSync("./output/outputPDFTextSECOND.txt", text);
    // });

    tesseract
      .recognize(images, config)
      .then((text) => {
        // console.log("Result:", text);
        fs.writeFileSync("./output/outputPDFText.txt", text);
      })
      .then(function () {
        console.log("DONE WHOLE PROCESS");
        for (var i = 0; i < images.length; i++) {
          // images.push("./output/" + files[i]);
          // const path = './file.txt'
          fs.unlink(images[i], (err) => {
            if (err) {
              console.error(err);
              return;
            }
            //file removed
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
