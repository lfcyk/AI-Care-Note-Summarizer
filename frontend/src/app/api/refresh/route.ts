import cookie from 'cookie';

export default async function handler(req: { method: string; headers: { cookie: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): any; new(): any; }; json: { (arg0: { error?: string; access?: any; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  if (req.method !== 'POST') return res.status(405).end();

  const cookies = cookie.parse(req.headers.cookie || '');
  const refresh = cookies.refresh_token;

  if (!refresh) return res.status(401).json({ error: 'No refresh token' });

  try {
    const djangoRes = await fetch(`${process.env.DJANGO_API_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    const data = await djangoRes.json();
    if (!djangoRes.ok) return res.status(djangoRes.status).json(data);

    // data may contain access and possibly a new refresh if rotation is True
    const { access, refresh: newRefresh } = data;

    if (newRefresh) {
      // rotate cookie
      res.setHeader('Set-Cookie', cookie.serialize('refresh_token', newRefresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, 
      }));
    }

    return res.status(200).json({ access });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Refresh failed' });
  }
}