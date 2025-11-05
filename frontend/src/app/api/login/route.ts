import cookie from 'cookie';

export default async function handler(req: { method: string; body: { username: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): any; new(): any; }; json: { (arg0: { access?: any; error?: string; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: any) => void; }) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  try {
    // Replace with your Django token URL
    const djangoRes = await fetch(`${process.env.DJANGO_API_URL}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await djangoRes.json();
    if (!djangoRes.ok) {
      return res.status(djangoRes.status).json(data);
    }

    const { access, refresh } = data;

    // Set refresh token in HttpOnly cookie
    res.setHeader('Set-Cookie', cookie.serialize('refresh_token', refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // or 'strict' depending on your needs
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // seconds: match refresh lifetime
    }));

    // Send access token to client (you can opt to set it as cookie too)
    return res.status(200).json({ access });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
}
