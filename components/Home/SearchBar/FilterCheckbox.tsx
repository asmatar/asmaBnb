import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { SearchHotelFormValues } from "./Formulaire";

export const FilterCheckbox = ({
  form,
  name,
  label,
  icon,
}: {
  form: UseFormReturn<SearchHotelFormValues>;
  name: keyof SearchHotelFormValues;
  label: string;
  icon: React.ReactNode;
}) => {
  const t = useTranslations("Formulaire");
  return (
    <TooltipProvider>
      <Tooltip>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean | undefined}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                  }}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
              </FormControl>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="text-muted-foreground">{icon}</div>
                  <FormLabel className="cursor-pointer text-sm">
                    {label}
                  </FormLabel>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>
                  {t("filterBy")} {label}
                </p>
              </TooltipContent>
            </FormItem>
          )}
        />
      </Tooltip>
    </TooltipProvider>
  );
};
