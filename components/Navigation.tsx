import { Content, asText, isFilled } from "@prismicio/client";
import Link from "next/link";
import { useState } from "react";

interface NavigationProps {
  pages: Content.PageDocument[];
}

function DropdownMenu({
  pages,
  parentId,
  getChildren,
  level = 0,
}: {
  pages: Content.PageDocument[];
  parentId: string;
  getChildren: (id: string) => Content.PageDocument[];
  level?: number;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const children = getChildren(parentId);

  return (
    <div style={{
      position: "absolute",
      left: level === 0 ? 0 : "100%",
      top: level === 0 ? "100%" : 0,
      background: "white",
      border: "1px solid #ccc",
      padding: "8px",
      zIndex: 100 + level * 100,
      whiteSpace: "nowrap",
    }}>
      {children.map((child) => {
        const grandchildren = getChildren(child.id);
        const hasGrandchildren = grandchildren.length > 0;

        return (
          <div key={child.id} style={{ position: "relative" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenItem(openItem === child.id ? null : child.id);
              }}
            >
              {hasGrandchildren ? (
                asText(child.data.title)
              ) : (
                <Link href={`/${child.uid}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {asText(child.data.title)}
                </Link>
              )}
              {hasGrandchildren && " ▾"}
            </button>

            {hasGrandchildren && openItem === child.id && (
              <DropdownMenu
                pages={pages}
                parentId={child.id}
                getChildren={getChildren}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Navigation({ pages }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const ORDER = [
    "home",
    "fundatia",
    "educatie",
    "proiecte",
    "centre-comunitare",
    "centrul-de-cercetare-stiintifica",
    "media",
    "implica-te",
    "contact",
  ];

  const topLevel = pages
    .filter((page) => !isFilled.contentRelationship(page.data.parent))
    .sort((a, b) => {
      const indexA = ORDER.indexOf(a.uid ?? "");
      const indexB = ORDER.indexOf(b.uid ?? "");
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    })
    .filter((page) => ORDER.includes(page.uid ?? ""));

  const getChildren = (parentId: string) =>
    pages.filter(
      (page) =>
        isFilled.contentRelationship(page.data.parent) &&
        page.data.parent.id === parentId
    );

  return (
    <nav>
      {topLevel.map((page) => {
        const children = getChildren(page.id);
        const hasChildren = children.length > 0;

        return (
          <div key={page.id} style={{ position: "relative", display: "inline-block" }}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === page.id ? null : page.id)
              }
            >
              {asText(page.data.title)}
              {hasChildren && " ▾"}
            </button>

            {hasChildren && openDropdown === page.id && (
              <DropdownMenu
                pages={pages}
                parentId={page.id}
                getChildren={getChildren}
                level={0}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}