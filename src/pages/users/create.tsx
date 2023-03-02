import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/mirage/api";
import { clientProvider } from "../../services/queryClient";

type CreateUserFormData = {
  id?: string;
  name: string;
  email: string;
  password: string
  password_confirmation: string
}


const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Deve ser um email'),
  password: yup.string().required('Senha obrigatória'),
  password_confirmation: yup.string().oneOf(['', yup.ref('password')], 'As senhas precisam ser iguais'),
})


export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })

    return response.data.user
  }, {
    onSuccess: (response: CreateUserFormData) => {
      console.log(response)
      clientProvider.invalidateQueries(['users', 1])
      clientProvider.prefetchQuery(['user', response.id], () => response)
    }
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values);
    router.push('/users')
  }
  return (
    <Box>
      <Header />
      <Flex as="main" width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} as="form" onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size="large" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              width="100%"
            >
              <Input name="name" label="Nome completo" {...register('name')} error={errors.name} />
              <Input name="email" label="Email"  {...register('email')} error={errors.email} />
            </SimpleGrid>
            <SimpleGrid
              minChildWidth="240px"
              spacing="8"
              width="100%"
            >
              <Input name="password_confirmation" type="password" label="Senha" {...register('password_confirmation')} error={errors.password_confirmation} />
              <Input name="password" type="password" label="Confirmar senha" {...register('password')} error={errors.password} />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button bg="red.standard" type="submit" isLoading={isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
