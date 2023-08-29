import { NextResponse } from 'next/server';
import { uuid } from 'uuidv4';
import CurrentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';

export async function POST(req: Request) {
	try {
		const { name, imageUrl } = await req.json();
		const profile = await CurrentProfile();

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 500 });
		}

		const server = db.server.create({
			data: {
				profileId: profile.id,
				name: name,
				imageUrl: imageUrl,
				inviteCode: uuid(),
				channels: {
					create: [
						{
							profileId: profile.id,
							name: 'general',
						},
					],
				},
				members: {
					create: {
						profileId: profile.id,
						role: MemberRole.ADMIN,
					},
				},
			},
		});

		return NextResponse.json(server);
	} catch (error) {
		console.log('🚀 ~ file: route.ts:9 ~ POST ~ error:', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
