import { Button, Flex, Stack } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import * as yup from 'yup';
import { Input } from "../components/Form/Input";
import { Logo } from "../components/Logo";

type SignInFormData = {
  email: string;
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Deve ser um email'),
  password: yup.string().required('Senha obrigatória'),
})
export default function SingIn() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    router.push('/dashboard')
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        p={8}
        borderRadius={8}
        background="gray.800"
        onSubmit={handleSubmit(handleSignIn)}
        flexDirection="column"
      >
        <Stack spacing={4}>
          <Flex flex="1" justify="center">
            <Logo />
          </Flex>
          <Input type="email" label="Email" {...register("email")} error={errors.email} />
          <Input type="password" label="password" {...register("password")} error={errors.password} />
        </Stack>

        <Button type="submit" mt="6" bg="red.standard" size="lg" isLoading={isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
