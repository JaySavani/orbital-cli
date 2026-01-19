"use client";

import React from "react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogoSVG } from "../svgs/logo";

export default function DeviceAuthorizationPage() {
  const [userCode, setUserCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data, isPending } = authClient.useSession();

  const router = useRouter();

  if (!isPending && !data?.session && !data?.user) {
    router.push("/sign-in");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Format the code: remove dashes and convert to uppercase
      const formattedCode = userCode.trim().replace(/-/g, "").toUpperCase();

      // Check if the code is valid using GET /device endpoint
      const response = await authClient.device({
        query: { user_code: formattedCode },
      });

      if (response?.error && response?.error?.error === "invalid_request") {
        toast.error("Invalid or expired code. Please try again.");
        return;
      }

      if (response.data) {
        // Redirect to approval page
        router.push(`/approve?user_code=${formattedCode}`);
      }
    } catch (err) {
      console.error(err);
      setError("Invalid or expired code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            ``
            {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"> */}
            <LogoSVG height={56} width={56} />
            {/* </div> */}
            <span className="text-lg font-bold">Orbital CLI</span>
          </div>
          <CardTitle className="text-2xl">Device Authorization</CardTitle>
          <CardDescription>Enter the device code from your CLI</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium">
                Device Code
              </label>
              <Input
                id="code"
                type="text"
                value={userCode}
                onChange={(e) => {
                  setUserCode(e.target.value);
                  setError(null);
                }}
                placeholder="e.g., ABCD-1234"
                maxLength={12}
                className="uppercase font-mono text-center text-lg tracking-widest mt-2"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground text-center">
                Device codes are case-insensitive
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !userCode.trim()}
              className="w-full rounded-lg"
            >
              {isLoading ? "Verifying..." : "Continue"}
            </Button>

            <p className="text-xs text-muted-foreground text-center pt-2">
              Don&apos;t have a code? Run{" "}
              <code className="bg-secondary px-2 py-1 rounded text-foreground">
                orbital login
              </code>{" "}
              in your terminal
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
