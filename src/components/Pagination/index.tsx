import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegistrers: number;
    registrerPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number, lastPage: number) {
    return [...new Array(to - from)]
        .map((_, index) => from + index + 1)
        .filter(page => page > 0)
        .filter(page => page < lastPage)
}

export function Pagination({
    totalCountOfRegistrers,
    registrerPerPage = 10,
    currentPage = 1,
    onPageChange,
}: PaginationProps) {

    const lastPage = Math.floor(totalCountOfRegistrers / registrerPerPage);

    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1, lastPage) : []

    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage), lastPage)
        : []


    return (
        <Stack
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
            direction={["column", "row"]}
        >
            <Box>
                <strong>0 - {registrerPerPage} de {totalCountOfRegistrers}</strong>
            </Box>
            <Stack direction="row" spacing="2">
                <>
                    {currentPage > (1 + siblingsCount) && (
                        <>
                            <PaginationItem onPageChange={onPageChange} page={1} />
                            {currentPage > (2 + siblingsCount) && <Text color="gray.300" width="8" textAlign="center">...</Text>}
                        </>
                    )}
                    {previousPages.map((page, index) => {
                        return (<PaginationItem onPageChange={onPageChange} page={page} key={index} />)
                    })}
                    <PaginationItem onPageChange={onPageChange} page={currentPage} isCurrent />
                    {nextPages.map((page, index) => {
                        return (<PaginationItem onPageChange={onPageChange} page={page} key={index} />)
                    })}
                    {currentPage + siblingsCount <= lastPage && (
                        <>
                            {(currentPage + 1 + siblingsCount) < lastPage && <Text color="gray.300" width="8" textAlign="center">...</Text>}
                            <PaginationItem onPageChange={onPageChange} page={lastPage} />
                        </>
                    )}
                </>
            </Stack>
        </Stack>
    );
}
