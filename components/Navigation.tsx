import { createClient } from "../prismicio";
import { Content, asText, asLink, isFilled } from "@prismicio/client";
import Link from "next/link";
import { useState } from "react";

interface NavigationProps {
  pages: Content.PageDocument[];
}

export default function Navigation({ pages }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

const topLevel = pages.filter(
  (page) => !isFilled.contentRelationship(page.data.parent)
);
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
              <div style={{
                position: "absolute",
                background: "white",
                border: "1px solid #ccc",
                padding: "8px",
                zIndex: 100,
              }}>
                {children.map((child) => (
                  <div key={child.id}>
                    <Link href={`/${child.uid}`}>
                      {asText(child.data.title)}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}