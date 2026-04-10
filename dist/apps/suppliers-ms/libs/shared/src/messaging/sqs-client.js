"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_sqs_client = create_sqs_client;
const client_sqs_1 = require("@aws-sdk/client-sqs");
function create_sqs_client(options) {
    const config = {
        region: options.region,
        ...(options.endpoint ? { endpoint: options.endpoint } : {}),
        ...(options.credentials ? { credentials: options.credentials } : {}),
    };
    return new client_sqs_1.SQSClient(config);
}
//# sourceMappingURL=sqs-client.js.map