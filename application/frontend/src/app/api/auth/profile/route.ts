import { api } from "@/shared/apiClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const response = await api.get(
        '/profile?username=' + session.user.name,
        {
            local: false,
        }

    );
    return response;
}