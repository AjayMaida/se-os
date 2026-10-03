import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] gap-4">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
