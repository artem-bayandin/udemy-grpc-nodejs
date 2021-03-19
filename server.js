const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

// load package
const packageDefinition = protoLoader.loadSync('todo.proto', {})
// load package def into grpc
const grpcObject = grpc.loadPackageDefinition(packageDefinition)

const todoPackage = grpcObject.todoPackage

// grpc server
const server = new grpc.Server();

// assign service to implementation
server.addService(todoPackage.Todo.service, {
    'createTodo': createTodo,
    'readTodos': readTodos,
    'readTodosStream': readTodosStream
})

server.bindAsync('localhost:40000', grpc.ServerCredentials.createInsecure(), (err, port) => {
    server.start()
    console.log(`server has started on port '${port}' with err '${err}'`)
})

const todos = []

function createTodo (call, callback) {
    console.log(call)
    const newTodo = {
        ...call.request,
        id: todos.length + 1
    }
    todos.push(newTodo)
    callback(null, newTodo)
}

function readTodos (call, callback) {
    callback(null, { 'items': todos })
}

function readTodosStream(call, callback) {
    todos.forEach(item => call.write(item))
    call.end()   
}