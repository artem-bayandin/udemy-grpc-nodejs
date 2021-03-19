const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

// load package
const packageDefinition = protoLoader.loadSync('todo.proto', {})
// load package def into grpc
const grpcObject = grpc.loadPackageDefinition(packageDefinition)

const todoPackage = grpcObject.todoPackage

// grpc client
const client = new todoPackage.Todo('localhost:40000', grpc.credentials.createInsecure())

// call methods
client.createTodo({
    'id': -1,
    'text': process.argv[2]
}, (err, resp) => {
    if (err) {
        console.error(`Err: ${err}`)
    } else {
        console.log(`Resp: ${JSON.stringify(resp)}`)
    }

    // call re-read here
    client.readTodos({}, (err, resp) => {
        if (err) {
            console.error(`Err: ${err}`)
        } else {
            // console.log(`Read: ${JSON.stringify(resp)}`)
            resp.items.forEach(item => console.log(item.text))
        }
    })
})

const todosStreamCall = client.readTodosStream();
todosStreamCall.on('data', data => {
    console.log(`Todo received: ${JSON.stringify(data)}`)
})
todosStreamCall.on('error', err => console.log(err))
todosStreamCall.on('end', () => console.log('reading is done!'))