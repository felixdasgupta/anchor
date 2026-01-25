"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSetAtom } from "jotai";
import { LayoutDashboard, History, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logImpulseOpenAtom } from "@/stores/ui";

type Props = { variant?: "default" | "cta" };

const navItems = [
	{ href: "/", label: "Dashboard", Icon: LayoutDashboard },
	{ href: "/history", label: "History", Icon: History },
	{ href: "/settings", label: "Settings", Icon: Settings },
];

export function TopNav({ variant = "default" }: Props) {
	const pathname = usePathname();
	const setLogOpen = useSetAtom(logImpulseOpenAtom);

	if (variant === "cta") {
		return (
			<Button
				className='gap-2 bg-linear-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 cursor-pointer'
				onClick={() => setLogOpen(true)}
			>
				<Zap className='h-4 w-4' />
				Log Spend
			</Button>
		);
	}

	return (
		<nav className='hidden md:flex gap-2'>
			{navItems.map(({ href, label, Icon }) => {
				const active = pathname === href;
				return (
					<Link
						key={href}
						href={href}
						className={[
							"flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
							active
								? "text-neutral-900 bg-neutral-100"
								: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50",
						].join(" ")}
					>
						<Icon className='h-4 w-4' />
						<span className='text-sm'>{label}</span>
					</Link>
				);
			})}
		</nav>
	);
}
