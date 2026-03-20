# Uptime Monitor gRPC

A simple gRPC-based uptime monitoring service built with **Node.js** and **TypeScript**. This project demonstrates how to implement a gRPC server and client for querying the status of various services using hardcoded data.

## Features

- **gRPC API:** Uses Protocol Buffers to define a clean and efficient interface.
- **Node.js + TypeScript:** Type-safe implementation using `@grpc/grpc-js`.
- **Mock Monitoring:** The server returns hardcoded status strings (e.g., `OK`, `DEGRADED`, `DOWN`) for simulated services.
- **Dynamic Proto Loading:** Uses `@grpc/proto-loader` to load `.proto` files at runtime.

## Project Structure

- `proto/monitor.proto`: The Protocol Buffer service definition.
- `src/server.ts`: gRPC server implementation with hardcoded status data.
- `src/client.ts`: gRPC client for querying multiple service statuses.
- `tsconfig.json`: TypeScript configuration for the project.

## Prerequisites

- [Node.js](https://nodejs.org/) (v22.14.0 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arancksj22/UptimeMonitor_gRPC_GeminiCLI.git
   cd UptimeMonitor_gRPC_GeminiCLI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### 1. Start the Server
Run the gRPC server in your terminal:
```bash
npx ts-node src/server.ts
```
The server will start on `0.0.0.0:50051`.

### 2. Run the Client
In a **new terminal window**, run the client to query service statuses:
```bash
npx ts-node src/client.ts
```

### Example Output
```text
Querying service statuses...
Service: AuthService | Status: OK | Checked at: 2026-03-20T17:59:06.503Z
Service: PaymentGateway | Status: DEGRADED | Checked at: 2026-03-20T17:59:06.506Z
Service: Database | Status: OK | Checked at: 2026-03-20T17:59:06.506Z
Service: InventoryService | Status: DOWN | Checked at: 2026-03-20T17:59:06.507Z
Service: UnknownSvc | Status: UNKNOWN | Checked at: 2026-03-20T17:59:06.507Z
Finished querying all services.
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
