import { GetStatusCountsUseCase } from "./get-status-counts.use-case";
import type { BackofficeCreditApplicationsReadRepositoryPort } from "../../domain/ports/backoffice-credit-applications-read.repository.port";

describe("GetStatusCountsUseCase", () => {
  it("returns counts from repository", async () => {
    const getStatusCountsMock = jest
      .fn()
      .mockResolvedValue([{ statusCode: "in_study", total: 4 }]);

    const repository: BackofficeCreditApplicationsReadRepositoryPort = {
      listCreditApplications: jest.fn(),
      getStatusCounts: getStatusCountsMock,
      listActivePartners: jest.fn(),
    };

    const useCase = new GetStatusCountsUseCase(repository);
    const result = await useCase.run({
      partnerExternalId: null,
      search: "carlos",
    });

    expect(getStatusCountsMock).toHaveBeenCalledWith({
      partnerExternalId: null,
      search: "carlos",
    });
    expect(result[0]?.total).toBe(4);
  });
});
