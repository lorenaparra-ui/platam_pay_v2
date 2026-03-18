export interface FinancialInformationCommand {
    totalAssets: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyPurchases?: number;
    currentPurchases?: number;
    requestedLoc: number;
}
