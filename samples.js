/*

const grpc = require('@grpc/grpc-js')

// common
// Unary client; Client stream
// might be not a good case as you may close the client in a callback,
// so that other methods will stop, I believe
const client = new MyService('localhost:5000', grpc.credentials.createInsecure())


// Unary client
client.myUnaryClientMethod({ value: 'value'}, (err, resp) => {
    if (err) {
        console.error(err)
    } else {
        console.log(resp)
    }
    client.close();
})


// Stream client - client
const streamClient = client.myClientStreamMethod((err, resp) => {
    if (err) {
        console.error(err)
    } else {
        console.log(resp)
    }
    client.close();
})
// do as many
streamClient.write({ value: 'value' })
// finally send the last one
streamClient.end({ value: 'value' })



// Stream client - server (?)
const streamClientServer = client.myServerStreamMethod({ value: 'value' })
streamClient.on('error', console.error)
streamClient.on('data', console.log)
streamClient.on('end', () => client.close())


// BiDi
const bidiStream = client.myBidiStream()
bidiStream.on('error', console.error)
bidiStream.on('data', console.log)
bidiStream.on('end', () => client.close())

bidiStream.write({ value: 'value' })
bidiStream.end({ value: 'value' })


// Example server
const { Server } = require('grpc-server-js')
const server = new Server();

server.addService(MyService.service, {
    myUnaryClientMethod (call, callback) {
        callback(null, call.request)
    },
    myClientStreamMethod (stream, callback) {
        stream.once('data', data => callback(null, data))
    },
    myServerStreamMethod (stream) {
        stream.write(stream.request)
        stream.end()
    },
    myBidiStream (stream) {
        stream.on('data', data => stream.write(data))
        stream.on('end', () => stream.end())
    }
})

*/