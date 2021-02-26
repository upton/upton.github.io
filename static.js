const http = require("http");
const Path = require("path");
const fs = require("fs");
var url = require('url');
var server = http.createServer(function (req, res) {
    const fileName = Path.resolve(__dirname, "." + url.parse(req.url).pathname);
    const extName = Path.extname(fileName).substr(1);

    if (fs.existsSync(fileName)) {
        var mimeTypeMap = {
            html: 'text/html;charset=utf-8',
            htm: 'text/html;charset=utf-8',
            xml: "text/xml;charset=utf-8",
            css: "text/css;charset=utf-8",
            txt: "text/plain;charset=utf-8",
            js: "text/javascript",
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            gif: "image/gif",
            ico: "image/x-icon"
        }

        if (mimeTypeMap[extName]) {
            res.setHeader('Content-Type', mimeTypeMap[extName]);
        }

        var stream = fs.createReadStream(fileName);
        stream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
});
server.listen(8090);