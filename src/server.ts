import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

// Path to the Protocol Buffer definition file
const PROTO_PATH = path.join(__dirname, '../proto/monitor.proto');

// Load the .proto file and configure options for dynamic code generation
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the 'monitor' package from the package definition
const monitorProto: any = grpc.loadPackageDefinition(packageDefinition).monitor;

/**
 * Hardcoded mock status data for demonstration purposes.
 * In a real application, this might come from a database, 
 * health check script, or an external monitoring service.
 */
const STATUS_DATA: { [key: string]: string } = {
  'AuthService': 'OK',
  'PaymentGateway': 'DEGRADED',
  'Database': 'OK',
  'InventoryService': 'DOWN',
};

/**
 * gRPC handler function for the 'GetStatus' RPC call.
 * @param call - The gRPC call object containing the request data.
 * @param callback - The gRPC callback to send the response back to the client.
 */
function getStatus(call: any, callback: any) {
  const serviceName = call.request.service_name;
  console.log(`[SERVER] Received request for service: ${serviceName}`);
  
  // Lookup the status in our hardcoded object, defaulting to 'UNKNOWN'
  const status = STATUS_DATA[serviceName] || 'UNKNOWN';
  
  // Construct and send the response
  const response = {
    status: status,
    last_check: new Date().toISOString(),
  };
  
  callback(null, response);
}

/**
 * Main function to initialize and start the gRPC server.
 */
function main() {
  const server = new grpc.Server();
  
  // Map the MonitorService definition from the proto to our implementation
  server.addService(monitorProto.MonitorService.service, { getStatus: getStatus });
  
  const address = '0.0.0.0:50051';
  
  // Bind the server to the address and start listening asynchronously
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(`Failed to bind server: ${err.message}`);
      return;
    }
    console.log(`[SERVER] Running at http://${address}`);
  });
}

// Entry point for the server script
main();
