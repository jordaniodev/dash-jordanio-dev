import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon, Link, Spinner, Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import LinkNext from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { useUsers } from "../../services/hooks/useUsers";
import { api } from "../../services/mirage/api";
import { clientProvider } from "../../services/queryClient";

interface UserListProps {
  users: DataUserResponse
}

interface DataUserResponse {
  users: {
    created_at: string;
    name: string;
    id: string;
    email: string;
  }[],
  totalCount:number
}

export default function UserList({ users }: UserListProps) {

  const [page, setPage] = useState(1)

  const { data, error, isLoading, isFetching } = useUsers(page, {
    initialData: users
  })

  const dataResponse = data as DataUserResponse;
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const handlePrefecthUser = async (userId: number) => {
    await clientProvider.prefetchQuery(['user', userId], async () => {
      const { data } = await api.get(`users/${userId}`)
      return data;
    }, {
      staleTime: 1000 * 60 * 10
    })
  }
  return (
    <Box>
      <Header />
      <Flex as="main" width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" alignContent="center">
            <Heading size="lg" fontWeight="normal">
              Usuarios {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <LinkNext href='users/create' passHref>
              <Button
                cursor="pointer"
                as="a"
                size="sm"
                fontSize="16"
                bg="red.standard"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </LinkNext>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="red" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataResponse.users.map((user) =>
                  (<Tr key={user.id}>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="red" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">
                          <Link color="red.light-1" onMouseEnter={() => handlePrefecthUser(user.id)}>
                            {user.name}
                          </Link>
                        </Text>
                        <Text fontSize="small" color="gray.300">
                          {user.email}
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{user.created_at}</Td>}
                    <Td>
                      <Button
                        cursor="pointer"
                        as="a"
                        size="sm"
                        fontSize="14"
                        colorScheme="transparent"
                        leftIcon={<Icon as={RiPencilLine} />}
                      >
                        {isWideVersion && 'Editar'}
                      </Button>
                    </Td>
                  </Tr>)
                  )}
                </Tbody>
              </Table>
              <Pagination registrerPerPage={10} totalCountOfRegistrers={dataResponse.totalCount} currentPage={page} onPageChange={(page) => setPage(page)} />
            </>
          )
          }
        </Box>
      </Flex>
    </Box>
  );
}
