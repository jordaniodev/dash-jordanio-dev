import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form/dist/types";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...props }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        {...props}
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        ref={ref}
        size="lg"
      />

      {!!error &&
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      }
    </FormControl>
  )
}

export const Input = forwardRef(InputBase);