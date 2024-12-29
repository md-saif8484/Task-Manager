import { NextResponse } from "next/server";

export async function POST(request)
{
    const response = NextResponse.json({
        message:"logged out",
        success: true
    });

    response.cookies.set("auth_token","",{
        expiresIn: new Date(0)
    });

    return response;
}