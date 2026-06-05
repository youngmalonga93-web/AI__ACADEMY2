type ErrorMessageProps = {
  message: string;
  title?: string;
};

export function ErrorMessage({ message, title = "Error" }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm"
      role="alert"
    >
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-1 leading-6 text-muted-foreground">{message}</p>
    </div>
  );
}
