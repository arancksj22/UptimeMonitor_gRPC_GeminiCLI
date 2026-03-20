import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const PROTO_PATH = path.join(__dirname, '../proto/monitor.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const monitorProto: any = grpc.loadPackageDefinition(packageDefinition).monitor;

const STATUS_DATA: { [key: string]: string } = {
  'AuthService': 'OK',
  'PaymentGateway': 'DEGRADED',
  'Database': 'OK',
  'InventoryService': 'DOWN',
};

function getStatus(call: any, callback: any) {
  const serviceName = call.request.service_name;
  console.log(`Received request for service: ${serviceName}`);
  
  const status = STATUS_DATA[serviceName] || 'UNKNOWN';
  const response = {
    status: status,
    last_check: new Date().toISOString(),
  };
  
  callback(null, response);
}

function main() {
  const server = new grpc.Server();
  server.addService(monitorProto.MonitorService.service, { getStatus: getStatus });
  
  const address = '0.0.0.0:50051';
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(`Failed to bind server: ${err.message}`);
      return;
    }
    console.log(`Server running at http://${address}`);
  });
}

main();
