interface ProfileContentProps {
  dismissButton?: React.ReactNode;
}

export function ProfileContent({ dismissButton }: ProfileContentProps) {
  return (
    <div className="relative h-full px-4 py-8">
      {dismissButton}
      <div className="mx-auto max-w-2xl py-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <h2 className="text-muted-foreground mt-2 text-lg">
          Your account information
        </h2>

        <section className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-muted size-20 rounded-full" />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-muted-foreground text-sm">@johndoe</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">Bio and personal info will appear here</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Activity</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">Recent activity will appear here</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
