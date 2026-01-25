"use client";

import { useAtom } from "jotai";
import { settingsAtom } from "@/stores/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formatDollars = (value: number) => (value / 100).toFixed(0);
const parseDollars = (value: string) => {
	const parsed = Number.parseFloat(value);
	if (!Number.isFinite(parsed) || parsed < 0) {
		return 0;
	}
	return Math.round(parsed * 100);
};

export function SettingsView() {
	const [settings, setSettings] = useAtom(settingsAtom);

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
							value={formatDollars(settings.discretionaryBudgetCents)}
							onChange={(event) =>
								setSettings((prev) => ({
									...prev,
									discretionaryBudgetCents: parseDollars(event.target.value),
								}))
							}
						/>
						<p className="text-xs text-neutral-500">Monthly baseline for impulse spend.</p>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="weekly">Weekly threshold</Label>
						<Input
							id="weekly"
							type="number"
							value={formatDollars(settings.weeklyLimitCents)}
							onChange={(event) =>
								setSettings((prev) => ({
									...prev,
									weeklyLimitCents: parseDollars(event.target.value),
								}))
							}
						/>
						<p className="text-xs text-neutral-500">Soft cap to keep you on track.</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
