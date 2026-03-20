import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

// Path to the Protocol Buffer definition file
const PROTO_PATH = path.join(__dirname, '../proto/monitor.proto');

// Load the .proto file with settings matching the server for consistency
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
 * Main function to initialize the gRPC client and query multiple service statuses.
 */
function main() {
  // Create a new client instance connecting to the server's address
  // Note: We use insecure credentials here for demo purposes.
  const client = new monitorProto.MonitorService(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  // List of services we want to query
  const servicesToQuery = [
    'AuthService', 
    'PaymentGateway', 
    'Database', 
    'InventoryService', 
    'UnknownSvc' // Intentional check for a service not in our mock data
  ];

  console.log('[CLIENT] Querying service statuses...');
  
  let completedCount = 0;

  // Iterate over our list and make asynchronous gRPC calls
  servicesToQuery.forEach((serviceName) => {
    // Call the GetStatus RPC method
    client.getStatus({ service_name: serviceName }, (err: any, response: any) => {
      if (err) {
        // Handle potential gRPC errors (e.g., connection issues, timeout)
        console.error(`[CLIENT] Error for ${serviceName}: ${err.message}`);
      } else {
        // Output the successful response from the server
        console.log(`[CLIENT] Service: ${serviceName.padEnd(16)} | Status: ${response.status.padEnd(10)} | Checked at: ${response.last_check}`);
      }
      
      // Track completed calls to decide when to exit the process
      completedCount++;
      if (completedCount === servicesToQuery.length) {
        console.log('[CLIENT] Finished querying all services.');
        // Clean exit after all responses (or errors) have been processed
        process.exit(0);
      }
    });
  });
}

// Entry point for the client script
main();
