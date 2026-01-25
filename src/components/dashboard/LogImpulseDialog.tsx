"use client";

import { useMemo, useState } from "react";
import { useAtom } from "jotai";
import { purchasesAtom } from "@/stores/purchases";
import { logImpulseOpenAtom } from "@/stores/ui";
import type { Purchase } from "@/lib/domain/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Food", "Shopping", "Travel", "Subscriptions", "Other"];
const moods = ["😌 Calm", "🙂 Neutral", "😬 Impulsive", "😅 Regret"];

const emptyForm = {
	amount: "",
	merchant: "",
	category: "",
	note: "",
	mood: "",
	date: "",
};

export function LogImpulseDialog() {
	const [open, setOpen] = useAtom(logImpulseOpenAtom);
	const [form, setForm] = useState(emptyForm);
	const [error, setError] = useState("");
	const [purchases, setPurchases] = useAtom(purchasesAtom);

	const canSubmit = useMemo(() => {
		return form.amount.trim() !== "" && form.merchant.trim() !== "" && form.category.trim() !== "";
	}, [form.amount, form.merchant, form.category]);

	const onSubmit = () => {
		const amount = Number.parseFloat(form.amount);
		if (!Number.isFinite(amount) || amount <= 0) {
			setError("Enter a valid amount greater than zero.");
			return;
		}

		if (!form.merchant.trim()) {
			setError("Add a merchant name.");
			return;
		}

		if (!form.category.trim()) {
			setError("Select a category.");
			return;
		}

		const occurredAt = form.date ? new Date(form.date) : new Date();
		const nextPurchase: Purchase = {
			id: crypto.randomUUID(),
			amountCents: Math.round(amount * 100),
			merchant: form.merchant.trim(),
			category: form.category.trim(),
			occurredAt: occurredAt.toISOString(),
			note: form.note.trim() || undefined,
			mood: form.mood || undefined,
			source: "manual",
		};

		setPurchases([nextPurchase, ...purchases]);
		setForm(emptyForm);
		setError("");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='bg-linear-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'>
					Record an impulse spend
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-white'>
				<DialogHeader>
					<DialogTitle>Log an impulse</DialogTitle>
					<DialogDescription>Add a quick spend to your log.</DialogDescription>
				</DialogHeader>

				<div className='grid gap-4'>
					{error ? <p className='text-sm text-red-600'>{error}</p> : null}
					<div className='grid gap-2'>
						<Label htmlFor='amount'>Amount</Label>
						<Input
							id='amount'
							type='number'
							min='0'
							step='0.01'
							inputMode='decimal'
							placeholder='12.50'
							value={form.amount}
							onChange={(event) => {
								setError("");
								setForm((prev) => ({ ...prev, amount: event.target.value }));
							}}
						/>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='merchant'>Merchant</Label>
						<Input
							id='merchant'
							placeholder='Coffee Shop'
							value={form.merchant}
							onChange={(event) => {
								setError("");
								setForm((prev) => ({ ...prev, merchant: event.target.value }));
							}}
						/>
					</div>
					<div className='grid gap-2'>
						<Label>Category</Label>
						<Select
							value={form.category}
							onValueChange={(value) => {
								setError("");
								setForm((prev) => ({ ...prev, category: value }));
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder='Pick a category' />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='grid gap-2'>
						<Label>How did it feel?</Label>
						<Select
							value={form.mood}
							onValueChange={(value) => {
								setError("");
								setForm((prev) => ({ ...prev, mood: value }));
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select a mood' />
							</SelectTrigger>
							<SelectContent>
								{moods.map((mood) => (
									<SelectItem key={mood} value={mood}>
										{mood}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='date'>Date</Label>
						<Input
							id='date'
							type='date'
							value={form.date}
							onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
						/>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='note'>Note</Label>
						<Textarea
							id='note'
							placeholder='What made this feel impulsive?'
							value={form.note}
							onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button onClick={onSubmit} disabled={!canSubmit}>
						Save entry
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
