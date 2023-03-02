import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
interface ProfileProps {
  showProfileData?: boolean;
}
export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Luigi Oliveira</Text>
          <Text color="gray.300" fontSize="small">
            luigijordanio@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Luigi Oliveira"
        src="https://github.com/luigiJordanio.png"
      />
    </Flex>
  );
}
