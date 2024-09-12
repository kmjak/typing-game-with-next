import { NextResponse } from 'next/server';
import { serialize } from 'cookie';


export async function DELETE() {
  try {
    const cookie = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });

    const response = NextResponse.json({ message: 'ログイン成功' });
    response.headers.set('Set-Cookie', cookie);
    return response;
  } catch (error) {
    console.error('Error during request processing:', error);
    return NextResponse.json({ message: 'リクエスト処理中にエラーが発生しました' });
  }
}