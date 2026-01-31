"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { purchasesAtom } from "@/stores/purchases";
import { settingsAtom } from "@/stores/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatCents = (value: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value / 100);

const sumBetween = (values: { occurredAt: string; amountCents: number }[], start: Date, end: Date) =>
	values.reduce((total, purchase) => {
		const occurred = new Date(purchase.occurredAt);
		if (occurred >= start && occurred <= end) {
			return total + purchase.amountCents;
		}
		return total;
	}, 0);

export function KpiRow() {
	const purchases = useAtomValue(purchasesAtom);
	const settings = useAtomValue(settingsAtom);

	const { weeklyTotal, monthTotal, projectedMonth } = useMemo(() => {
		const now = new Date();
		const weekStart = new Date(now);
		weekStart.setDate(now.getDate() - 6);
		weekStart.setHours(0, 0, 0, 0);

		const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
		const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
		monthEnd.setHours(23, 59, 59, 999);

		const weekly = sumBetween(purchases, weekStart, now);
		const month = sumBetween(purchases, monthStart, now);

		const daysInMonth = monthEnd.getDate();
		const currentDay = now.getDate();
		const projected = currentDay ? Math.round((month / currentDay) * daysInMonth) : 0;

		return { weeklyTotal: weekly, monthTotal: month, projectedMonth: projected };
	}, [purchases]);

	const items = [
		{
			label: "This Week",
			value: formatCents(weeklyTotal),
			helper: "Last 7 days",
		},
		{
			label: "Weekly Limit",
			value: formatCents(settings.weeklyLimitCents),
			helper: "Target cap",
		},
		{
			label: "This Month",
			value: formatCents(monthTotal),
			helper: "Month to date",
		},
		{
			label: "Projected/Month",
			value: formatCents(projectedMonth),
			helper: "Pace check",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
			{items.map((item) => (
				<Card key={item.label}>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm text-neutral-600">{item.label}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl text-neutral-900">{item.value}</div>
						<div className="text-xs text-neutral-500 mt-1">{item.helper}</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
