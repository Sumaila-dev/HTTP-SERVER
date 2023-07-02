const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [{
        id: 0,
        name: 'Kofi',
    },
    {
        id: 1,
        name: 'kwame',
    },
    {
        id: 2,
        name: 'Kwesi',
    }
]


server.on('request', (req, res) => {
    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            console.log('Request', friend);
            friends.push(JSON.parse(friend));
        })
    } else if (items[1] === 'friends') {
        // res.writeHead(200, {
        //     'Content-Type': 'application/json',
        // });
        res.statusCode = 200;
        res.setHeader('COntent-Type', 'application/json');
        if (items.length == 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));

        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<li>Hello Kojo!</li>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
});