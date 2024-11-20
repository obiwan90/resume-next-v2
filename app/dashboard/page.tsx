import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {/* 仅登录用户可见的内容 */}
        </div>
    );
} 