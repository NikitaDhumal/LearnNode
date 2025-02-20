const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////// ********************* ///////////////////
// FILES

// Blocking synchronous way
// const textIn = fs.readFileSync("./txt/example.txt", "utf-8");
// console.log(textIn);

// const textOut = `this is ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/example.txt", textOut);
// console.log("textOut");

//non-blocking asynchronous way
// fs.readFile("./txt/name.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//   });
// });
// console.log("will read this as well");

//SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);

  //overview
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is OVERVIEW page");

    //product
  } else if (pathName === "/product") {
    res.end("This is PRODUCT page");

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("listening to requests on port 3000");
});
