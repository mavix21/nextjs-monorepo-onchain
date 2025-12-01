import { Card, CardContent } from "@myapp/ui/components/card";

import { SignupForm } from "./ui/signup-form";

export function SignupPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
