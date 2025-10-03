export type NoteSummary = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  updatedAt: string;
};

export const sampleNotes: NoteSummary[] = [
  {
    id: "operating-systems",
    title: "Operating Systems",
    description: "Process lifecycle, scheduling strategies, and synchronization primitives.",
    tags: ["OS", "Concurrency"],
    updatedAt: "2024-05-10",
  },
  {
    id: "network-basics",
    title: "Networking Fundamentals",
    description: "OSI vs TCP/IP layers, congestion control, and common debugging tools.",
    tags: ["Network"],
    updatedAt: "2024-04-28",
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description: "Trade-offs between trees, heaps, and hash tables plus implementation tips.",
    tags: ["DataStructure"],
    updatedAt: "2024-03-18",
  },
];
