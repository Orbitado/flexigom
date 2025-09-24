import type { RichTextBlock } from "@/types";

interface RichTextRendererProps {
  content: RichTextBlock[];
  className?: string;
}

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  const renderBlock = (block: RichTextBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {block.children?.map((child) =>
              child.text || ""
            ).join("")}
          </p>
        );

      case "list": {
        const ListComponent = block.format === "unordered" ? "ul" : "ol";
        return (
          <ListComponent key={index} className="mb-4 ml-6 space-y-2 list-disc">
            {block.children?.map((listItem, itemIndex) => {
              if (listItem.type === "list-item") {
                return (
                  <li key={itemIndex} className="leading-relaxed">
                    {listItem.children?.map((child) =>
                      child.text || ""
                    ).join("")}
                  </li>
                );
              }
              return null;
            })}
          </ListComponent>
        );
      }

      case "list-item":
        return (
          <li key={index} className="leading-relaxed">
            {block.children?.map((child) =>
              child.text || ""
            ).join("")}
          </li>
        );

      default:
        return (
          <div key={index} className="mb-2">
            {block.children?.map((child) =>
              child.text || ""
            ).join("")}
          </div>
        );
    }
  };

  return (
    <div className={className}>
      {content.map(renderBlock)}
    </div>
  );
}