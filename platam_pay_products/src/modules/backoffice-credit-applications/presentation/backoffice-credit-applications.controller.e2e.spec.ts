import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { BackofficeCreditApplicationsController } from "./backoffice-credit-applications.controller";
import { ListCreditApplicationsUseCase } from "../application/use-cases/list-credit-applications.use-case";
import { GetStatusCountsUseCase } from "../application/use-cases/get-status-counts.use-case";
import { ListActivePartnersUseCase } from "../application/use-cases/list-active-partners.use-case";
import { ConfigService } from "@nestjs/config";
import { BackofficeAuthGuard } from "./guards/backoffice-auth.guard";

describe("BackofficeCreditApplicationsController (e2e)", () => {
  let app: INestApplication;

  const listUseCaseMock = {
    run: jest.fn().mockResolvedValue({
      items: [],
      hasMore: false,
      nextCursor: null,
      pageSize: 20,
    }),
  };

  const countsUseCaseMock = {
    run: jest.fn().mockResolvedValue([{ statusCode: "in_study", total: 4 }]),
  };

  const partnersUseCaseMock = {
    run: jest.fn().mockResolvedValue([
      {
        partnerExternalId: "550e8400-e29b-41d4-a716-446655440000",
        partnerName: "Agro Mayorista S.A.S",
        logoUrl: null,
      },
    ]),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BackofficeCreditApplicationsController],
      providers: [
        { provide: ListCreditApplicationsUseCase, useValue: listUseCaseMock },
        { provide: GetStatusCountsUseCase, useValue: countsUseCaseMock },
        { provide: ListActivePartnersUseCase, useValue: partnersUseCaseMock },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === "config.backoffice.queueWarningDays") return 3;
              if (key === "config.backoffice.queueCriticalDays") return 5;
              return undefined;
            },
          },
        },
      ],
    })
      .overrideGuard(BackofficeAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("GET /backoffice/credit-applications returns paginated payload", async () => {
    const httpServer = app.getHttpServer() as Parameters<typeof request>[0];
    const response = await request(httpServer)
      .get("/backoffice/credit-applications")
      .expect(200);

    expect(response.body).toEqual({
      items: [],
      pagination: {
        has_more: false,
        page_size: 20,
        next_cursor: null,
      },
    });
  });

  it("GET /backoffice/credit-applications/status-counts returns counts", async () => {
    const httpServer = app.getHttpServer() as Parameters<typeof request>[0];
    const response = await request(httpServer)
      .get("/backoffice/credit-applications/status-counts")
      .expect(200);
    const body = response.body as { total: number; counts: unknown[] };

    expect(body.total).toBe(4);
    expect(body.counts).toBeInstanceOf(Array);
  });

  it("GET /backoffice/partners/active returns partner list", async () => {
    const httpServer = app.getHttpServer() as Parameters<typeof request>[0];
    const response = await request(httpServer)
      .get("/backoffice/partners/active")
      .expect(200);
    const body = response.body as {
      items: Array<{ partner_name: string }>;
    };

    expect(body.items).toHaveLength(1);
    expect(body.items[0]?.partner_name).toBe("Agro Mayorista S.A.S");
  });
});
