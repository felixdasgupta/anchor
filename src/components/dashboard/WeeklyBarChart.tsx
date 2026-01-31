"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { purchasesAtom } from "@/stores/purchases";

const dayLabel = (date: Date) =>
	date.toLocaleDateString("en-US", { weekday: "short" });

export function WeeklyBarChart() {
	const purchases = useAtomValue(purchasesAtom);

	if (purchases.length === 0) {
		return (
			<div className="flex h-60 w-full items-center justify-center rounded-lg border border-dashed text-sm text-neutral-500">
				Log a purchase to see weekly spending.
			</div>
		);
	}

	const data = useMemo(() => {
		const now = new Date();
		const days = Array.from({ length: 7 }, (_, index) => {
			const day = new Date(now);
			day.setDate(now.getDate() - (6 - index));
			day.setHours(0, 0, 0, 0);
			return day;
		});

		return days.map((day) => {
			const nextDay = new Date(day);
			nextDay.setDate(day.getDate() + 1);
			const total = purchases.reduce((sum, purchase) => {
				const occurred = new Date(purchase.occurredAt);
				if (occurred >= day && occurred < nextDay) {
					return sum + purchase.amountCents;
				}
				return sum;
			}, 0);

			return {
				label: dayLabel(day),
				amount: Math.round(total / 100),
			};
		});
	}, [purchases]);

	return (
		<div className="h-60 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data}>
					<XAxis dataKey="label" axisLine={false} tickLine={false} />
					<YAxis axisLine={false} tickLine={false} />
					<Tooltip formatter={(value) => [`$${value}`, "Spend"]} />
					<Bar dataKey="amount" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
