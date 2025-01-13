import { generateSignedCsrfToken } from '@/shared/csrfToken';
import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { formId } = await request.json();

  if (!formId) {
    return NextResponse.json({ error: 'Form ID is required' }, { status: 400 });
  }
  const token = await generateSignedCsrfToken(formId);
  return NextResponse.json(token);
}
