export type Purchase = {
	id: string;
	userId?: string;
	amountCents: number;
	merchant: string;
	category: string;
	occurredAt: string;
	note?: string;
	mood?: string;
	source?: string;
	plaidTransactionId?: string;
};

export type Settings = {
	userId?: string;
	discretionaryBudgetCents: number;
	weeklyLimitCents: number;
};
