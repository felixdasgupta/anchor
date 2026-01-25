"use client";

import { useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { purchasesAtom } from "@/stores/purchases";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formatCents = (value: number) =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value / 100);

export function HistoryView() {
	const purchases = useAtomValue(purchasesAtom);
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		const sorted = [...purchases].sort(
			(a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
		);

		if (!normalized) {
			return sorted;
		}

		return sorted.filter((purchase) => {
			return (
				purchase.merchant.toLowerCase().includes(normalized) ||
				purchase.category.toLowerCase().includes(normalized)
			);
		});
	}, [purchases, query]);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-semibold text-neutral-900">History</h2>
				<p className="text-sm text-neutral-600">Recent impulse entries.</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Latest purchases</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Input
							placeholder="Filter by merchant or category"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
						/>
					</div>
					{filtered.length === 0 ? (
						<p className="text-sm text-neutral-500">No entries yet.</p>
					) : (
						<ul className="space-y-3">
							{filtered.slice(0, 12).map((purchase) => (
								<li
									key={purchase.id}
									className="flex items-center justify-between rounded-lg border px-3 py-2"
								>
									<div>
										<p className="text-sm font-medium text-neutral-900">
											{purchase.merchant}
										</p>
										<p className="text-xs text-neutral-500">
											{purchase.category} ·{" "}
											{new Date(purchase.occurredAt).toLocaleDateString()}
										</p>
									</div>
									<span className="text-sm font-semibold text-neutral-900">
										{formatCents(purchase.amountCents)}
									</span>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
