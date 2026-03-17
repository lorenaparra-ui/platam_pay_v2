import type { BackofficeCreditApplicationListItem } from "./backoffice-credit-application-list-item.model";
export interface BackofficeCreditApplicationsPage {
    items: BackofficeCreditApplicationListItem[];
    nextCursor: string | null;
    hasMore: boolean;
    pageSize: number;
}
