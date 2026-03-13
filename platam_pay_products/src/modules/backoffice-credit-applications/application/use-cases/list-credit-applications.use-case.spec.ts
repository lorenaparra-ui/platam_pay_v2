import { ListCreditApplicationsUseCase } from "./list-credit-applications.use-case";
import type { BackofficeCreditApplicationsReadRepositoryPort } from "../../domain/ports/backoffice-credit-applications-read.repository.port";

describe("ListCreditApplicationsUseCase", () => {
  it("delegates listing to repository", async () => {
    const listCreditApplicationsMock = jest.fn().mockResolvedValue({
      items: [],
      hasMore: false,
      nextCursor: null,
      pageSize: 20,
    });

    const repository: BackofficeCreditApplicationsReadRepositoryPort = {
      listCreditApplications: listCreditApplicationsMock,
      getStatusCounts: jest.fn(),
      listActivePartners: jest.fn(),
    };

    const useCase = new ListCreditApplicationsUseCase(repository);
    const result = await useCase.run({
      limit: 20,
      cursor: null,
      statusCodes: [],
      partnerExternalId: null,
      search: null,
      sortBy: "most_recent",
      warningQueueDays: 3,
      criticalQueueDays: 5,
    });

    expect(listCreditApplicationsMock).toHaveBeenCalledTimes(1);
    expect(result.pageSize).toBe(20);
  });
});
