import { auth } from '@clerk/nextjs';
import { db } from './db';

const CurrentProfile = async () => {
	const { userId } = auth();

	if (!userId) {
		return null;
	}

	const profile = await db.profile.findUnique({
		where: {
			userID: userId,
		},
	});

	return profile;
};

export default CurrentProfile;
