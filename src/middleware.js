import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
//   return NextResponse.redirect(new URL('/home', request.url))
    if(request.nextUrl.pathname=="/api/login" || request.nextUrl.pathname=="/api/user")
    {
        return;
    }
    const authToken = request.cookies.get("auth_token")?.value;
    console.log("middleware--->",authToken);
    const acessPath = request.nextUrl.pathname == "/log-in" || request.nextUrl.pathname == "/signup";
    
    if(acessPath)
    {
        if(authToken){
            return NextResponse.redirect(new URL("/profile/user",request.url));
        }
    }
    else{
        if(!authToken)
        {
            if(request.nextUrl.pathname.startsWith("/api")) 
            {
                return NextResponse.json({
                    message:"Access denied",
                    success:false
                },{
                    status:401
                });
            }
            return NextResponse.redirect(new URL("/log-in",request.url));
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/log-in",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*"
  ],
}