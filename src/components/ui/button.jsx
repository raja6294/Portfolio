import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#111111] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm",
        outline:
          "border border-[#E5E5E5] dark:border-[#252525] bg-[#F8F8F8] dark:bg-[#0A0A0A] text-[#111111] dark:text-white hover:bg-[#EFEFEF] dark:hover:bg-[#141414] hover:border-[#CCCCCC] dark:hover:border-[#404040] shadow-sm",
        secondary:
          "bg-[#F3F4F6] dark:bg-[#151515] text-[#111111] dark:text-white hover:bg-[#E5E7EB] dark:hover:bg-[#1E1E1E]",
        ghost:
          "text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900",
        link:
          "text-[#111111] dark:text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-sm",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
