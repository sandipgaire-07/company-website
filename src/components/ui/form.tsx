import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>
) => <Controller {...props} />;

const FormItem = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  )
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>((props, ref) => <Label ref={ref} {...props} />);
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&:has([aria-invalid=true])_input]:border-red-500 [&:has([aria-invalid=true])_input]:focus:border-red-500 [&:has([aria-invalid=true])_input]:focus:ring-red-500/20 [&:has([aria-invalid=true])_textarea]:border-red-500 [&:has([aria-invalid=true])_textarea]:focus:border-red-500 [&:has([aria-invalid=true])_textarea]:focus:ring-red-500/20",
      className
    )}
    {...props}
  />
));
FormControl.displayName = "FormControl";

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { getFieldState, formState } = useFormContext();
  const name = React.useContext(FormFieldContext);
  const error = name
    ? getFieldState(name as FieldPath<FieldValues>, formState).error
    : undefined;

  if (!error?.message && !props.children) return null;

  return (
    <p className={cn("text-sm font-medium text-red-600", className)} {...props}>
      {error?.message ?? props.children}
    </p>
  );
}

const FormFieldContext = React.createContext<string | undefined>(undefined);

function FormFieldItem({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <FormFieldContext.Provider value={name}>
      {children}
    </FormFieldContext.Provider>
  );
}

export {
  Form,
  FormControl,
  FormField,
  FormFieldContext,
  FormFieldItem,
  FormItem,
  FormLabel,
  FormMessage,
};
