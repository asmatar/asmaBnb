import { FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { searchHotelSchema } from "./Formulaire";

type SearchHotelFormValues = z.infer<typeof searchHotelSchema>;
export const LocationFields = ({
  control,
  name,
  optionsFields,
  placeholder,
  disabled = false,
  filteredFunction,
}: {
  control: Control<SearchHotelFormValues>;
  name: keyof SearchHotelFormValues;
  optionsFields: JSX.Element[];
  placeholder: string;
  disabled?: boolean;
  filteredFunction?: (value: string) => void;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <Select
            onValueChange={(name) => {
              field.onChange(name);
              filteredFunction && filteredFunction(name);
            }}
            value={field.value as string}
            disabled={disabled}
          >
            <SelectTrigger className="bg-background/80 shadow-sm backdrop-blur-sm border-none h-11">
              <div className="flex items-center">
                <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder={placeholder} />
              </div>
            </SelectTrigger>
            <SelectContent>{optionsFields}</SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
