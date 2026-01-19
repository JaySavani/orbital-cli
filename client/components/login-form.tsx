"use client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { LogoSVG } from "@/app/svgs/logo";
import { GithubSVG } from "@/app/svgs/github";

export const LoginForm = () => {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"> */}
          <LogoSVG height={56} width={56} />
          {/* </div> */}
          <span className="text-xl font-bold">Orbital CLI</span>
        </div>
      </div>

      <Card className="border-border/40 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in with your GitHub account to access Orbital CLI
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-11 rounded-lg font-medium bg-transparent"
              type="button"
              onClick={() =>
                authClient.signIn.social({
                  provider: "github",
                  callbackURL:
                    process.env.NEXT_PUBLIC_FRONTEND_URL + "/dashboard" ||
                    "http://localhost:3000/dashboard",
                })
              }
            >
              <GithubSVG className="h-6 w-6 mr-1 text-white" />
              Continue with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center items-center text-xs uppercase">
                <span className="bg-background px-2 py-1 text-muted-foreground rounded-2xl flex justify-center items-center">
                  Secure Device Flow Auth
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2">
              By signing in, you agree to our authentication terms. Your GitHub
              credentials are secure and never stored locally.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        New to Orbital CLI?{" "}
        <Link href="/" className="text-blue-500 hover:underline font-medium">
          Learn more
        </Link>
      </div>
    </div>
  );
};
