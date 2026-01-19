"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, Home } from "lucide-react";
import { LogoSVG } from "../svgs/logo";
import Image from "next/image";

export default function DashboardPage() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Spinner />
        <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (!isPending && !data?.session && !data?.user) {
    router.push("/sign-in");
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center"> */}
            <LogoSVG height={56} width={56} />
            {/* </div> */}
            <span className="font-bold text-lg">Orbital CLI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              onClick={() => router.push("/")}
              className="gap-2 rounded-full"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card */}
          <Card className="md:col-span-2 border-border/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                Welcome, {data?.user?.name}!
              </CardTitle>
              <CardDescription>
                You&apos;re successfully authenticated with Orbital CLI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You can now use the Orbital CLI to:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Chat with AI and maintain conversation history
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                  Use tools like Google Search and code execution
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  Generate complete applications autonomously
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Profile Card */}
          <Card className="border-border/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.user?.image && (
                <Image
                  src={data.user.image || "/placeholder.svg"}
                  alt={data.user.name || "User"}
                  height={64}
                  width={64}
                  className="w-16 h-16 rounded-lg"
                />
              )}
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{data?.user?.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium break-all">{data?.user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start */}
        <Card className="border-border/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Get started with Orbital CLI in your terminal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">
                1. Ensure you have Node.js installed
              </p>
              <div className="bg-card border border-border/40 rounded-lg p-4">
                <code className="text-sm font-mono text-muted-foreground">
                  node --version
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">2. Install Orbital CLI</p>
              <div className="bg-card border border-border/40 rounded-lg p-4">
                <code className="text-sm font-mono">npm i orbital-cli</code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">3. Authenticate your device</p>
              <div className="bg-card border border-border/40 rounded-lg p-4">
                <code className="text-sm font-mono">orbital login</code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">
                4. Start using the AI features
              </p>
              <div className="bg-card border border-border/40 rounded-lg p-4">
                <code className="text-sm font-mono">orbital wakeup</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
