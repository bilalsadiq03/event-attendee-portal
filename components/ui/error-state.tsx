export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-red-500 font-medium">
        {message || "Something went wrong"}
      </p>
      <p className="text-muted-foreground mt-2">
        Please refresh the page or try again later.
      </p>
    </div>
  );
}
