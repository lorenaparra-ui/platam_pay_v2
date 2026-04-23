#!/bin/sh
set -eu
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1

# Cada cola usada en .env.docker / apps (crear idempotente)
for name in \
  user-events-queue \
  transversal-upload-files \
  transversal-inbound \
  transversal-outbound \
  notifications-inbound
do
  awslocal sqs create-queue --queue-name "$name" || true
  awslocal sqs get-queue-url --queue-name "$name"
done

awslocal sqs list-queues
