import { NextResponse } from "next/server";

const middleware = () => {
  const isCustomerPage = pageName?.startsWith("/[customerSlug]");

   if (!isCustomerPage) {
     return NextResponse.next();
  }
  
  // other operation

  return NextResponse.next();
};

export default middleware;