
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
    children: ReactElement
    shouldMatchExactHref?: boolean
}

export function ActiveLink({ shouldMatchExactHref = false, children, ...props }: ActiveLinkProps) {
    const { asPath } = useRouter();

    const isActive =
        (shouldMatchExactHref && asPath === props.href) ||
        !shouldMatchExactHref && asPath.startsWith(String(props.href));

    return <Link {...props}>
        {cloneElement(children, {
            color: isActive ? 'red.light-1' : 'gray.50',
        })}
    </Link>
}