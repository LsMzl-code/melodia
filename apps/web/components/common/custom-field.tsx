"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Image from "next/image";

import { FormFieldsType } from "@/src/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";



interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldsType;
  type?: string;
  required?: boolean;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  selectGroupName?: string | string[];
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  data?: {
    id: string;
    name: string;
    details?: string;
    label?: string;
  }[]
}

/**
 *
 * @param param0
 * @returns
 */
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldsType.INPUT:
      return (
        <div className="flex rounded-md">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              alt={props.iconAlt || "icone"}
              width={24}
              height={40}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="bg-[#2A2B34] border border-foreground/10 "
              type={props.type}
              required={props.required}
            />
          </FormControl>
        </div>
      );
    case FormFieldsType.SELECT:
      return (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger className="bg-[#2A2B34] border border-foreground/10">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
          {props.selectGroupName ? (
            <SelectContent className="bg-[#2A2B34] border border-foreground/10">
              <SelectGroup>
                <SelectLabel>{props.selectGroupName}</SelectLabel>
                {props.data?.map((item) => (
                  <SelectItem value={item.id} key={item.id}>
                    {item.details ? <span>{item.name}: {item.details}</span> : item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          ) : (
            <SelectContent className="bg-[#2A2B34] border border-foreground/10">
              {props.data?.map((item) => (
                <SelectItem value={item.id} key={item.id}>
                  {item.details ? <span>{item.name}: {item.details}</span> : item.name}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      )
    // case FormFieldsType.PHONE_INPUT:
    //    return (
    //       <FormControl>
    //          <PhoneInput
    //             defaultCountry="FR"
    //             placeholder={props.placeholder}
    //             international
    //             // withcountrucallingcode
    //             value={field.value}
    //             onChange={field.onChange}
    //             className="input-phone"
    //          />
    //       </FormControl>
    //    );
    case FormFieldsType.SKELETON:
       return props.renderSkeleton ? props.renderSkeleton(field) : null;
    // case FormFieldsType.SELECT:
    //    return (
    //       <FormControl>
    //          <Select
    //             onValueChange={field.onChange}
    //             defaultValue={field.value}
    //          >
    //             <FormControl>
    //                <SelectTrigger className="shad-select-trigger">
    //                   <SelectValue placeholder={props.placeholder} />
    //                </SelectTrigger>
    //             </FormControl>
    //             <SelectContent className="shad-select-content">
    //                {props.children}
    //             </SelectContent>
    //          </Select>
    //       </FormControl>
    //    );
    // case FormFieldsType.CHECKBOX:
    //    return (
    //       <FormControl>
    //          <div className="flex items-center gap-4">
    //             <Checkbox
    //                id={props.name}
    //                checked={field.value}
    //                onCheckedChange={field.onChange}
    //             />
    //             <Label htmlFor={props.name} className="checkbox-label">
    //                {props.label}
    //             </Label>
    //          </div>
    //       </FormControl>
    //    );
    // case FormFieldsType.TEXTAREA:
    //    return (
    //       <FormControl>
    //          <Textarea
    //             {...field}
    //             placeholder={props.placeholder}
    //             className="shad-textArea"
    //             disabled={props.disabled}
    //          />
    //       </FormControl>
    //    );
    default:
      break;
  }
};

/**
 *
 * @param props
 * @returns
 */
const CustomFormField = (props: CustomProps) => {
  //*** ***//
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldsType.CHECKBOX && label && (
            <FormLabel className="text-xs text-foreground/80">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;