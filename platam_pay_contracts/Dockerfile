FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./platam_pay_contracts/package*.json ./
COPY ./libs/database ../libs/database
RUN npm install --prefix ../libs/database
RUN npm run build --prefix ../libs/database
RUN npm install
RUN rm -rf ./node_modules/@libs/database && \
    mkdir -p ./node_modules/@libs && \
    cp -R ../libs/database ./node_modules/@libs/database

COPY ./platam_pay_contracts/nest-cli.json ./nest-cli.json
COPY ./platam_pay_contracts/tsconfig.json ./tsconfig.json
COPY ./platam_pay_contracts/tsconfig.build.json ./tsconfig.build.json
COPY ./platam_pay_contracts/src ./src
COPY ./platam_pay_contracts/README.md ./README.md
COPY ./platam_pay_contracts/.env.example ./.env.example

RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/main"]
