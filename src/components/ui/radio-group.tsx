/* eslint-disable @typescript-eslint/no-explicit-any */
// removed @ts-nocheck to address types properly
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const _RadioGroupPrimitiveRoot = RadioGroupPrimitive.Root;
type RadioGroupRootProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & React.HTMLAttributes<HTMLDivElement>;
const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupRootProps>(({ className, ...props }, ref) => {
  return <_RadioGroupPrimitiveRoot className={cn("grid gap-2", className)} {...(props as unknown as React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>)} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const _RadioGroupPrimitiveItem = RadioGroupPrimitive.Item;
type RadioGroupItemProps = Partial<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>> & React.HTMLAttributes<HTMLElement>;
const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(({ className, ...props }, ref) => {
  return (
    <_RadioGroupPrimitiveItem
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...(props as any)}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </_RadioGroupPrimitiveItem>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
