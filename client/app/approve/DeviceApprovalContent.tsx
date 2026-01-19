"use client";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { LogoSVG } from "../svgs/logo";

export default function DeviceApprovalContent() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const userCode = searchParams.get("user_code");
  const [isProcessing, setIsProcessing] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<
    "pending" | "approved" | "denied" | null
  >(null);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Spinner />
        <p className="mt-4 text-muted-foreground">Verifying your session...</p>
      </div>
    );
  }

  if (!data?.session && !data?.user) {
    router.push("/sign-in");
    return null;
  }

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await authClient.device.approve({
        userCode: userCode!,
      });
      setApprovalStatus("approved");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error(error);
      setApprovalStatus("denied");
      setIsProcessing(false);
    }
  };

  const handleDeny = async () => {
    setIsProcessing(true);
    try {
      await authClient.device.deny({
        userCode: userCode!,
      });
      setApprovalStatus("denied");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error(error);
      setApprovalStatus("denied");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"> */}
            <LogoSVG height={56} width={56} />
            {/* </div> */}
            <span className="text-lg font-bold">Orbital CLI</span>
          </div>
          <CardTitle className="text-2xl">Device Authorization</CardTitle>
          <CardDescription>
            Your CLI is requesting access to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {approvalStatus === "approved" ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Device Approved</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your device has been successfully authorized. Redirecting...
                </p>
              </div>
            </div>
          ) : approvalStatus === "denied" ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Access Denied</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The device authorization has been denied.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Device Code</p>
                <p className="text-sm text-foreground mt-2">
                  <span className="text-4xl font-mono font-semibold text-blue-500">
                    {userCode}
                  </span>
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-sm text-muted-foreground">
                  A CLI device is requesting permission to access your Orbital
                  account. Review the code above and confirm whether to approve
                  or deny this request.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="flex-1 rounded-lg"
                >
                  {isProcessing ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDeny}
                  disabled={isProcessing}
                  variant="outline"
                  className="flex-1 rounded-lg bg-transparent"
                >
                  {isProcessing ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2" />
                      Denying...
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Deny
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center pt-2">
                Only approve if you initiated this login request
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
