import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { authClient } from "@/lib/auth-client";

export const LoginForm = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login to Continue</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant={"outline"}
                className="w-full"
                type="button"
                onClick={() =>
                  authClient.signIn.social({
                    provider: "github",
                    callbackURL: "http://localhost:3000",
                  })
                }
              >
                <GithubIcon className="size-4" />
                Continue With GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
