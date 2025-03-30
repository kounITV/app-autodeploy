import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { changelog } from "./data"

export const metadata: Metadata = {
  title: "Changelog",
  description: "Latest updates and improvements to our project",
}

type ChangeType = "feature" | "fix" | "update" | "other"

type Change = {
  description: string
  type: ChangeType
}

export type ChangelogEntry = {
  version: string
  date: string
  changes: Change[]
}

const Tag = ({ type }: { type: ChangeType }) => {
  const colors = {
    feature: "bg-green-100 text-green-800",
    fix: "bg-red-100 text-red-800",
    update: "bg-blue-100 text-blue-800",
    other: "bg-gray-100 text-gray-800",
  }

  return <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${colors[type]}`}>{type}</span>
}

const ChangelogEntryComponent: React.FC<{ entry: ChangelogEntry }> = ({ entry }) => (
  <section
    key={entry.version}
    className="border rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold ">Version {entry.version}</h2>
        <span className="text-sm font-medium text-gray-500  px-3 py-1 rounded-full">
          {entry.date}
        </span>
      </div>
      <ul className="space-y-3">
        {entry.changes.map((change, index) => (
          <ChangeComponent key={index} change={change} />
        ))}
      </ul>
    </div>
  </section>
);
const ChangeComponent: React.FC<{ change: Change }> = ({ change }) => (
  <li className="flex items-start ">
    <ArrowRight className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
    <div>
      <Tag type={change.type} />
      <span className="ml-2">{change.description}</span>
    </div>
  </li>
);
export default function ChangelogPage() {
  return (
    <div className="min-h-screen ">
      <header className="sticky top-0 shadow-sm z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold ">ການປ່ຽນແປງ</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 animate-fade-in">
          {changelog.map((entry) => (
            <ChangelogEntryComponent key={entry.version} entry={entry} />
          ))}
        </div>
      </main>
    </div>
  );
}