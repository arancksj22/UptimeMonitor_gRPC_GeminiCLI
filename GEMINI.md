# Uptime Monitor gRPC

A simple gRPC-based Uptime Monitor service implemented with Node.js and TypeScript. This project demonstrates a basic gRPC client-server interaction where the server provides hardcoded status information for various services.

## Project Overview
- **Service Definition:** Defined in `proto/monitor.proto` using Protocol Buffers (proto3).
- **Server:** Implemented in `src/server.ts`, serving status requests from a hardcoded dataset.
- **Client:** Implemented in `src/client.ts`, querying the server for multiple service statuses.
- **Technologies:** Node.js, TypeScript, gRPC (@grpc/grpc-js), Proto Loader (@grpc/proto-loader), ts-node.

## Building and Running

### Prerequisites
- Node.js (v22.14.0 or compatible)
- npm

### Installation
```bash
npm install
```

### Running the Server
```bash
npx ts-node src/server.ts
```
The server will start listening on `0.0.0.0:50051`.

### Running the Client
In a separate terminal:
```bash
npx ts-node src/client.ts
```

### Building (Optional)
To transpile TypeScript to JavaScript:
```bash
npx tsc
```
The compiled files will be in the `dist/` directory.

## Development Conventions
- **Language:** TypeScript for type safety.
- **Protobuf:** Always update `proto/monitor.proto` for any interface changes.
- **Status Data:** The server uses a hardcoded `STATUS_DATA` object for simplicity. For production, this would typically integrate with a monitoring database or real-time health checks.
- **Coding Style:** Follows standard TypeScript and Node.js practices with CommonJS modules as configured in `tsconfig.json`.
