import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Share2, Download } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await db.guide.findUnique({ where: { slug } });
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: `${guide.title} — Balloon`,
    description: guide.excerpt,
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inTable = false;
  let tableRows: string[][] = [];
  let tableKey = 0;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    elements.push(
      <div key={`table-${tableKey++}`} className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-foreground/10">
              {tableRows[0].map((cell, i) => (
                <th key={i} className="text-left py-2 px-3 font-semibold text-foreground/70">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(2).map((row, i) => (
              <tr key={i} className="border-b border-foreground/5">
                {row.map((cell, j) => (
                  <td key={j} className="py-2 px-3 text-foreground/60">
                    {cell.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("|")) {
      inTable = true;
      tableRows.push(
        line.split("|").filter(Boolean).map((c) => c.trim())
      );
      continue;
    }

    if (inTable) flushTable();

    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-3 text-foreground/90">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-xl font-semibold mt-6 mb-2 text-foreground/80">{line.slice(4)}</h3>);
    } else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, "");
      elements.push(
        <div key={i} className="flex gap-3 ml-2 mb-1">
          <span className="text-coral font-bold shrink-0">{line.match(/^\d+/)![0]}.</span>
          <span className="text-foreground/60">{renderInline(text)}</span>
        </div>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <div key={i} className="flex gap-3 ml-4 mb-1">
          <span className="text-coral mt-1.5 shrink-0">&#8226;</span>
          <span className="text-foreground/60">{renderInline(line.slice(2))}</span>
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-foreground/60 leading-relaxed mb-2">{renderInline(line)}</p>
      );
    }
  }

  if (inTable) flushTable();
  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground/80">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await db.guide.findUnique({ where: { slug } });

  if (!guide) notFound();

  const allGuides = await db.guide.findMany({
    where: { slug: { not: slug } },
    orderBy: { order: "asc" },
    take: 3,
    select: { title: true, slug: true, category: true, excerpt: true },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/guides" className="flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-coral transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All Guides
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-sand transition-colors" title="Share">
              <Share2 className="w-4 h-4 text-foreground/40" />
            </button>
            <button className="p-2 rounded-lg hover:bg-sand transition-colors" title="Download">
              <Download className="w-4 h-4 text-foreground/40" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-semibold uppercase tracking-wider mb-4">
            {guide.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {guide.title}
          </h1>
          <p className="text-lg text-foreground/50">{guide.excerpt}</p>
        </div>

        <div className="prose-balloon">
          {renderMarkdown(guide.content)}
        </div>
      </article>

      {/* Related guides */}
      {allGuides.length > 0 && (
        <section className="border-t border-foreground/5 bg-white py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6">Other guides you might need</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {allGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="p-4 rounded-xl border border-foreground/5 hover:border-coral/20 hover:shadow-md transition-all group"
                >
                  <span className="text-xs font-semibold text-foreground/30 uppercase">{g.category}</span>
                  <h3 className="font-semibold text-sm mt-1 group-hover:text-coral transition-colors line-clamp-2">
                    {g.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
