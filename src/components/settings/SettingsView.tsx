"use client";

import { useEffect, useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { settingsAtom } from "@/stores/settings";
import { purchasesAtom } from "@/stores/purchases";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

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
	const setPurchases = useSetAtom(purchasesAtom);
	const [saved, setSaved] = useState(false);
	const initial = useRef(true);

	useEffect(() => {
		if (initial.current) {
			initial.current = false;
			return;
		}
		setSaved(true);
		const timeout = setTimeout(() => setSaved(false), 1500);
		return () => clearTimeout(timeout);
	}, [settings]);

	const resetAll = () => {
		setSettings({ discretionaryBudgetCents: 0, weeklyLimitCents: 0 });
		setPurchases([]);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-semibold text-neutral-900">Settings</h2>
				<p className="text-sm text-neutral-600">Baseline preferences.</p>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg">Spending limits</CardTitle>
						{saved ? <span className="text-xs text-emerald-600">Saved</span> : null}
					</div>
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

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Reset</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-neutral-600">
						Clears stored purchases and settings on this device.
					</p>
					<ConfirmDialog
						trigger={
							<Button className="mt-4" variant="destructive">
								Reset local data
							</Button>
						}
						title="Reset local data?"
						description="This removes all purchases and settings stored on this device."
						confirmLabel="Confirm reset"
						onConfirm={resetAll}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
