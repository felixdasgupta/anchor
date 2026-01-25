import Image from "next/image";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { AnchorIcon } from "lucide-react";

type LoginProps = {
	user?: {
		name?: string | null;
	};
};

export default function Login({ user }: LoginProps) {
	return (
		<div className='app-container'>
			<div className='main-card-wrapper'>
				<AnchorIcon className='h-6 w-6' />
				<h1 className='main-title text-xl text-neutral-900 font-bold'>Anchor</h1>
				<div className='action-card'>
					{user ? (
						<div className='logged-in-section'>
							<p className='logged-in-message'>Successfully logged in!</p>
							<Profile />
							<LogoutButton />
						</div>
					) : (
						<>
							<p className='action-text'>Welcome! Please log in to access your protected content.</p>
							<LoginButton />
						</>
					)}
				</div>
			</div>
		</div>
	);
}
