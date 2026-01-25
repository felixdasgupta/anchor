"use client";

import { useAtomValue } from "jotai";
import { settingsAtom } from "@/stores/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formatDollars = (value: number) => (value / 100).toFixed(0);

export function SettingsView() {
	const settings = useAtomValue(settingsAtom);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-semibold text-neutral-900">Settings</h2>
				<p className="text-sm text-neutral-600">Baseline preferences.</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Spending limits</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="baseline">Discretionary baseline</Label>
						<Input
							id="baseline"
							type="number"
							disabled
							value={formatDollars(settings.discretionaryBudgetCents)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="weekly">Weekly threshold</Label>
						<Input
							id="weekly"
							type="number"
							disabled
							value={formatDollars(settings.weeklyLimitCents)}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
