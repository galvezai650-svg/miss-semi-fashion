interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li>
          <a
            href="/"
            className="transition-colors hover:text-foreground hover:underline"
          >
            Inicio
          </a>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              <span className="text-muted-foreground/60">&gt;</span>
              {isLast || !item.href ? (
                <span className="font-medium text-foreground">{item.label}</span>
              ) : (
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground hover:underline"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
