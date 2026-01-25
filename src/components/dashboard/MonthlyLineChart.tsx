"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { purchasesAtom } from "@/stores/purchases";

const monthLabel = (date: Date) =>
	date.toLocaleDateString("en-US", { month: "short" });

export function MonthlyLineChart() {
	const purchases = useAtomValue(purchasesAtom);

	if (purchases.length === 0) {
		return (
			<div className="flex h-60 w-full items-center justify-center rounded-lg border border-dashed text-sm text-neutral-500">
				Log a purchase to see monthly trends.
			</div>
		);
	}

	const data = useMemo(() => {
		const now = new Date();
		return Array.from({ length: 7 }, (_, index) => {
			const offset = index - 3;
			const monthDate = new Date(now.getFullYear(), now.getMonth() + offset, 1);
			const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
			monthEnd.setHours(23, 59, 59, 999);

			const total = purchases.reduce((sum, purchase) => {
				const occurred = new Date(purchase.occurredAt);
				if (occurred >= monthDate && occurred <= monthEnd) {
					return sum + purchase.amountCents;
				}
				return sum;
			}, 0);

			return {
				label: monthLabel(monthDate),
				amount: Math.round(total / 100),
			};
		});
	}, [purchases]);

	return (
		<div className="h-60 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data}>
					<XAxis dataKey="label" axisLine={false} tickLine={false} />
					<YAxis axisLine={false} tickLine={false} />
					<Tooltip formatter={(value) => [`$${value}`, "Spend"]} />
					<Line
						type="monotone"
						dataKey="amount"
						stroke="hsl(var(--primary))"
						strokeWidth={3}
						dot={{ r: 4 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
