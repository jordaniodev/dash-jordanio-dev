import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { UseSidebarDrawer } from "../../contexts/SideBarDrawerContext";
import { Logo } from "../Logo";
import { Notifications } from "./Notifications";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
export function Header() {
  const {onOpen} = UseSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      w="100%"
      as="header"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion &&
        <IconButton icon={<Icon as={RiMenuLine} />} 
        fontSize="24"
        variant="unstyled"
        aria-label="Open Navigation"
        onClick={onOpen}
        mr="2"
        />
      }
      <Logo />
      {isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto">
        <Notifications />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
