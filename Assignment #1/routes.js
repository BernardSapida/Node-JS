const fs = require('fs');
const handleRequest = (req, res) => {
    let url = req.url;
    let method = req.method;

    res.setHeader('Content-Type', 'text/html');

    if(url === "/") {
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Node Assignment</title>
                </head>
                <body>
                    <h1>You are in Homepage!</h1>
                    <p>Fill up the form: </p>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" placeholder="username">
                        <button type='submit'>Submit</button>
                    </form>
                </body>
            </html>
        `);
        
        return res.end();
    }

    if(url === "/users") {
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Node Assignment</title>
                </head>
                <body>
                    <ul>
                        <li>Bernard Sapida</li>
                        <li>Shania Gwyneth Nuga</li>
                        <li>Ralph Azarcon</li>
                        <li>Clark Mendoza</li>
                        <li>Angely Dy</li>
                    </ul>
                </body>
            </html>
        `);
        return res.end();
    }

    if(url === "/create-user" && method === "POST") {
        let body = [];

        req.on("data", (chunk) => body.push(chunk));

        req.on("end", () => {
            let result = Buffer.concat(body).toString();

            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Node Assignment</title>
                    </head>
                    <body>
                        <h1>Form submitted!</h1>
                        <p>username: ${result}</p>
                    </body>
                </html>
            `)
            return res.end();
        });
    }
}

module.exports = {
    handler: handleRequest
}