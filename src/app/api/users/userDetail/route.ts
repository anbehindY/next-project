import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import getTokenData from "@/helpers/getTokenData";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getTokenData(req);
    const user = await User.findOne({_id: userId}).select('-password');
    return NextResponse.json({
      message: 'User exists',
      data: user,
    })
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500}); 
  }
}
