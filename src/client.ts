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

function main() {
  const client = new monitorProto.MonitorService(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  const servicesToQuery = ['AuthService', 'PaymentGateway', 'Database', 'InventoryService', 'UnknownSvc'];

  console.log('Querying service statuses...');
  
  let completed = 0;
  servicesToQuery.forEach((serviceName) => {
    client.getStatus({ service_name: serviceName }, (err: any, response: any) => {
      if (err) {
        console.error(`Error for ${serviceName}: ${err.message}`);
      } else {
        console.log(`Service: ${serviceName} | Status: ${response.status} | Checked at: ${response.last_check}`);
      }
      
      completed++;
      if (completed === servicesToQuery.length) {
        console.log('Finished querying all services.');
        process.exit(0);
      }
    });
  });
}

main();
