import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-[#E5E5E5] dark:border-[#252525] bg-[#F3F4F6] dark:bg-[#151515] px-4 py-3 text-sm text-[#111111] dark:text-white placeholder:text-[#888888] dark:placeholder:text-[#555555] focus-visible:outline-none focus-visible:border-[#111111] dark:focus-visible:border-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
