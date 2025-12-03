interface SettingsContentProps {
  dismissButton?: React.ReactNode;
}

export function SettingsContent({ dismissButton }: SettingsContentProps) {
  return (
    <div className="relative px-4 py-8">
      {dismissButton}
      <div className="mx-auto max-w-2xl py-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <h2 className="text-muted-foreground mt-2 text-lg">
          Manage your account settings and preferences
        </h2>

        <section className="mt-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">Profile settings will appear here</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">
                Notification preferences will appear here
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Privacy</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">Privacy settings will appear here</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Appearance</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">
                Theme and display options will appear here
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
