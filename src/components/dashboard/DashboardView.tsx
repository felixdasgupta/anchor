"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardView() {
	return (
		<div className='space-y-6'>
			{/* KPI row placeholder */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				{["This Week", "Weekly Limit", "This Month", "Projected/Month"].map((t) => (
					<Card key={t}>
						<CardHeader className='pb-2'>
							<CardTitle className='text-sm text-neutral-600'>{t}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-3xl text-neutral-900'>$—</div>
							<div className='text-xs text-neutral-500 mt-1'>placeholder</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Charts placeholders */}
			<Card>
				<CardHeader>
					<CardTitle className='text-lg'>This Week&apos;s Spending</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='h-60 rounded-lg bg-neutral-100' />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className='text-lg'>Monthly Trend</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='h-60 rounded-lg bg-neutral-100' />
				</CardContent>
			</Card>
		</div>
	);
}
