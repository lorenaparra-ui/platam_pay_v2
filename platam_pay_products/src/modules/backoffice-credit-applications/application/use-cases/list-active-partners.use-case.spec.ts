import { ListActivePartnersUseCase } from "./list-active-partners.use-case";
import type { BackofficeCreditApplicationsReadRepositoryPort } from "../../domain/ports/backoffice-credit-applications-read.repository.port";

describe("ListActivePartnersUseCase", () => {
  it("returns active partners from repository", async () => {
    const listActivePartnersMock = jest.fn().mockResolvedValue([
      {
        partnerExternalId: "550e8400-e29b-41d4-a716-446655440000",
        partnerName: "Agro Mayorista S.A.S",
        logoUrl: null,
      },
    ]);

    const repository: BackofficeCreditApplicationsReadRepositoryPort = {
      listCreditApplications: jest.fn(),
      getStatusCounts: jest.fn(),
      listActivePartners: listActivePartnersMock,
    };

    const useCase = new ListActivePartnersUseCase(repository);
    const result = await useCase.run({ search: null });

    expect(listActivePartnersMock).toHaveBeenCalledWith({
      search: null,
    });
    expect(result).toHaveLength(1);
  });
});
