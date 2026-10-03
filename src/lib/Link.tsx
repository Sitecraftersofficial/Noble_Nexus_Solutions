/**
 * Link — drop-in replacement for the router's <Link>.
 * Renders an <a data-link href>; the global click handler in App.tsx
 * intercepts it and does pushState navigation.
 */
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  hash?: string;
  className?: string;
  children: ReactNode;
};

export function Link({ to, hash, children, ...rest }: LinkProps) {
  return (
    <a data-link href={hash ? `${to}#${hash}` : to} {...rest}>
      {children}
    </a>
  );
}
