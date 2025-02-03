import { apiClient } from "@/shared/apiClient"
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const response = await apiClient(
        '/profile?username=' + session.user.name,

    );
    console.log("response",response);
    return response;
}