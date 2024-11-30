
import { getCurrentSession } from "@/lib/session";

export const AvatarAuth = async () => {
	const { user } = await getCurrentSession();

	return user === null ? (
		<a href="/login/google" className="text-foreground hover:text-highlight">
			[Sign in]
		</a>
	) : (
		<a href="/logout" className="text-foreground hover:text-highlight">
			[Sign out {user.crsid}]
		</a>
	);
};
