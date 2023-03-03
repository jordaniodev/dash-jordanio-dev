import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

interface SidebarDrawerProviderProps {
    children: ReactNode
}
export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
    const disclosure = useDisclosure()
    const router = useRouter()

    useEffect(() => {
        disclosure.onClose()
    }, [disclosure, router.asPath])

    return (<SidebarDrawerContext.Provider value={disclosure}>
        {children}
    </SidebarDrawerContext.Provider>)
}

export const UseSidebarDrawer = () => useContext(SidebarDrawerContext)