import { NextResponse } from 'next/server'
 
export function middleware(request) {
    let token = request.cookies.get('Token')

//   if (request.nextUrl.pathname.startsWith('/')) {
//     if (token?.value===undefined) {
//         return NextResponse.rewrite(new URL('/Signin', request.url))
//       }
//   }
 
//   if (request.nextUrl.pathname.startsWith('/Addjobs')) {
//     if (token?.value===undefined) {
//         return NextResponse.rewrite(new URL('/Signin', request.url))
//       }
//   }
//   if (request.nextUrl.pathname.startsWith('/Addblogs')) {
//     if (token?.value===undefined) {
//         return NextResponse.rewrite(new URL('/Signin', request.url))
//       }
//   }
//   if (request.nextUrl.pathname.startsWith('/Manageemployee')) {
//     if (token?.value===undefined) {
//         return NextResponse.rewrite(new URL('/Signin', request.url))
//       }
//   }

  return NextResponse.next()
}