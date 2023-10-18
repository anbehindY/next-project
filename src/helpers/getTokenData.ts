import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}