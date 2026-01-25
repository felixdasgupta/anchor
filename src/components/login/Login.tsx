import Image from "next/image";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

type LoginProps = {
	user?: {
		name?: string | null;
	};
};

export default function Login({ user }: LoginProps) {
	return (
		<div className='app-container'>
			<div className='main-card-wrapper'>
				<Image
					src='https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png'
					alt='Auth0 Logo'
					className='auth0-logo'
					width={160}
					height={48}
					priority
				/>
				<h1 className='main-title'>Next.js + Auth0</h1>

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
