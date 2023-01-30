const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Homepage</title>
            </head>
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="firstname">
                    <input type="text" name="lastname">
                    <button type="submit">submit</button>
                </form>
            </body>
            </html>
        `);
        return res.end();
    }
    
    if(url === "/message" && method === "POST") {
        const body = [];

        req.on('data', (chunk) => {
            console.log(`Chunk: ${chunk.toString()}`);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const processedData = parsedBody.split("&").map(v => v.split("=")[1]);
            const data = {};
            
            data["Firstname"] = processedData[0];
            data["Lastname"] = processedData[1];

            fs.writeFileSync('output.txt', JSON.stringify(data));
        });

        res.setHeader('Location', '/homepage');
        res.statusCode = 302;
        return res.end();
    }

    if(url === "/homepage") {
        res.write(`
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <title>Homepage</title>
                </head>
                <body>
                    <h1>You are in homepage</h1>
                </body>
            </html>
        `)
    }
    
    res.end();
}

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}