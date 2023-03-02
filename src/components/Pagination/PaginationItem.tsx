import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  page: number;
  onPageChange: (page:number) => void
}

export function PaginationItem({
  isCurrent = false,
  page,
  onPageChange
}: PaginationItemProps) {
  return isCurrent ? (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="red.light-1"
      disabled
      _disabled={{
        bgColor: "red.dark-3",
        cursor: "default",
      }}
    >
      {page}
    </Button>
  ) : (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bgColor="gray.700"
      onClick={() => onPageChange(page)}
      _hover={{
        bg: "gray.500",
      }}
    >
      {page}
    </Button>
  );
}
