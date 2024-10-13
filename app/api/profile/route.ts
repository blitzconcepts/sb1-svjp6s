import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const shortUrl = nanoid(8);
    const qrCode = `https://example.com/${shortUrl}`; // Replace with your actual domain

    const profile = await prisma.businessProfile.create({
      data: {
        ...data,
        shortUrl,
        qrCode,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Error creating profile' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const profile = await prisma.businessProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
  }
}