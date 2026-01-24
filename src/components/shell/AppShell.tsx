import { TopNav } from "./TopNav";
import { MobileNav } from "./MobileNav";
import { AnchorIcon } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-dvh bg-neutral-50'>
			<header className='bg-white border-b border-neutral-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
					<div className='flex items-center gap-8'>
						<span className='flex items-center justify-center gap-2'>
							<AnchorIcon className='h-6 w-6' />
							<h1 className='text-xl text-neutral-900 font-bold'>Anchor</h1>
						</span>
						<TopNav />
					</div>
					{/* CTA lives in client nav to open dialog */}
					<TopNav variant='cta' />
				</div>
			</header>

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8'>{children}</main>

			<MobileNav />
		</div>
	);
}
