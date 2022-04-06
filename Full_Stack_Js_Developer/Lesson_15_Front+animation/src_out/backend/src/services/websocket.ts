const WebSocket = require('ws');
export const server = new WebSocket.Server({port: 3000});

server.on('connection', ws => {
    ws.on('message', message => {
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.parse(message));
            }
        });
        // if (JSON.parse(message) === 'exit') {
        //     ws.close();
        // }
    });
    ws.send( JSON.stringify({ type:'messaage', payload:'Radalarm initial message' }) );
});

export function sendMessageWS(message: any) {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    })
}
