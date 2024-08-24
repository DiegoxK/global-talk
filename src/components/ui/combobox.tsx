"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { FormControl } from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import type { FormSchema } from "../../app/(routes)/academy/teacher/lectures/_components/lecture-form";

interface ComboboxProps {
  values?: { label: string; value: string }[];
  field: ControllerRenderProps<FormSchema>;
  fieldName: string;
}

export default function Combobox({ values, field, fieldName }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const label = values?.find((value) => value.value === field.value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            disabled={!values}
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value && values && label
              ? label
              : `Seleccionar ${fieldName}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${fieldName}...`} />
          <CommandList>
            <CommandEmpty>No se encontro ningun {fieldName}.</CommandEmpty>
            <CommandGroup>
              {values?.map((value) => (
                <CommandItem
                  value={value.label}
                  key={value.value}
                  onSelect={() => {
                    setOpen(false);
                    field.onChange(value.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.value === field.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {value.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
