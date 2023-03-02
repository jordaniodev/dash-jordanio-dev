import { useQuery } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react';
import { api } from '../mirage/api';


type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type GetUserResponse = {
    users: User[]
    totalCount : number;
}

export async function getUsers(page: number): Promise<GetUserResponse> {
    const { data , headers } = await api.get('/users',{
        params:{
            page
        }
    })
    const users = data.users.map(user => {
        return {
            ...user,
            created_at: new Date(user.created_at).toLocaleDateString('pt-br', { dateStyle: 'full' })
        }
    })

    const totalCount = Number(headers['x-total-count'])

    return {
        users,
        totalCount
    };
}
export function useUsers(page: number, options: UseQueryOptions){
    return useQuery(['users',page], () => getUsers(page), {
        staleTime: 1000 * 5,
        ...options
    })
}