"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, Settings } from "lucide-react";

const items = [
	{ href: "/", label: "Dashboard", Icon: LayoutDashboard },
	{ href: "/history", label: "History", Icon: History },
	{ href: "/settings", label: "Settings", Icon: Settings },
];

export function MobileNav() {
	const pathname = usePathname();

	return (
		<nav className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-3'>
			<div className='flex justify-around'>
				{items.map(({ href, label, Icon }) => {
					const active = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className={`flex flex-col items-center gap-1 ${active ? "text-neutral-900" : "text-neutral-600"}`}
						>
							<Icon className='h-5 w-5' />
							<span className='text-xs'>{label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
