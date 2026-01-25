"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { WeeklyBarChart } from "@/components/dashboard/WeeklyBarChart";
import { MonthlyLineChart } from "@/components/dashboard/MonthlyLineChart";
import { LogImpulseDialog } from "@/components/dashboard/LogImpulseDialog";

export function DashboardView() {
	return (
		<div className='space-y-6'>
			<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<div>
					<h2 className="text-2xl font-semibold text-neutral-900">Dashboard</h2>
					<p className="text-sm text-neutral-600">Track your weekly impulses at a glance.</p>
				</div>
				<LogImpulseDialog />
			</div>

			<KpiRow />

			<Card>
				<CardHeader>
					<CardTitle className='text-lg'>This Week&apos;s Spending</CardTitle>
				</CardHeader>
				<CardContent>
					<WeeklyBarChart />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className='text-lg'>Monthly Trend</CardTitle>
				</CardHeader>
				<CardContent>
					<MonthlyLineChart />
				</CardContent>
			</Card>
		</div>
	);
}
