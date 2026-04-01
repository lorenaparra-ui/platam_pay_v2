"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePublisher = exports.BaseSqsPublisher = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const sqs_publish_failed_error_1 = require("./sqs-publish-failed.error");
class BaseSqsPublisher {
    constructor(sqs_client) {
        this.sqs_client = sqs_client;
    }
    enrich_send_input(input) {
        return input;
    }
    async send_message(input) {
        const to_send = this.enrich_send_input(input);
        try {
            await this.sqs_client.send(new client_sqs_1.SendMessageCommand(to_send));
        }
        catch (cause) {
            const text = cause instanceof Error ? cause.message : String(cause);
            throw new sqs_publish_failed_error_1.SqsPublishFailedError(`Fallo SendMessage en SQS: ${text}`, cause);
        }
    }
}
exports.BaseSqsPublisher = BaseSqsPublisher;
exports.BasePublisher = BaseSqsPublisher;
//# sourceMappingURL=base.publisher.js.map