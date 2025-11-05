import cookie from 'cookie';

export default async function handler(req: { method: string; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): any; new(): any; }; json: { (arg0: { ok: boolean; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  if (req.method !== 'POST') return res.status(405).end();

  // Optional: call Django to blacklist the refresh token if you have endpoint
  // const cookies = cookie.parse(req.headers.cookie || '');
  // const refresh = cookies.refresh_token;
  // await fetch(`${process.env.DJANGO_API_URL}/api/token/blacklist/`, { ... });

  // clear cookie
  res.setHeader('Set-Cookie', cookie.serialize('refresh_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  }));

  return res.status(200).json({ ok: true });
}
