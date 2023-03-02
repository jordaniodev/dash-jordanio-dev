
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { UseSidebarDrawer } from "../../contexts/SideBarDrawerContext";
import { SideBarNav } from "./SideBarNav";

export function SideBar() {
  const {isOpen, onClose} = UseSidebarDrawer();
  const isDrawerSideBar = useBreakpointValue({
    base: true,
    lg: false
  })

  if(isDrawerSideBar){
    return(
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton />
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>
          <SideBarNav />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    )
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SideBarNav />
    </Box>
  );
}
