export type NoteSummary = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  updatedAt: string;
};

export type NoteDetail = NoteSummary & {
  readingTime: string;
  content: Array<{
    heading: string;
    body: string;
  }>;
};

export const sampleNotes: NoteSummary[] = [
  {
    id: "operating-systems",
    title: "Operating Systems",
    description:
      "Process lifecycle, scheduling strategies, and synchronization primitives.",
    tags: ["OS", "Concurrency"],
    updatedAt: "2024-05-10",
  },
  {
    id: "network-basics",
    title: "Networking Fundamentals",
    description:
      "OSI vs TCP/IP layers, congestion control, and common debugging tools.",
    tags: ["Network"],
    updatedAt: "2024-04-28",
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description:
      "Trade-offs between trees, heaps, and hash tables plus implementation tips.",
    tags: ["DataStructure"],
    updatedAt: "2024-03-18",
  },
];

export const sampleNoteDetails: Record<string, NoteDetail> = {
  "operating-systems": {
    id: "operating-systems",
    title: "Operating Systems",
    description:
      "Process lifecycle, scheduling strategies, and synchronization primitives.",
    tags: ["OS", "Concurrency"],
    updatedAt: "2024-05-10",
    readingTime: "약 6분",
    content: [
      {
        heading: "프로세스와 스레드",
        body: "프로세스는 독립적인 메모리 공간과 자원을 특징으로 하며, 스레드는 프로세스의 실행 단위를 분할해 동시성을 구현합니다. 문맥 전환 비용을 줄이기 위해 스레드를 적절히 활용하는 전략이 중요합니다.",
      },
      {
        heading: "CPU 스케줄링",
        body: "Round Robin, Priority, Multi-Level Queue 등 다양한 스케줄링 알고리즘은 응답성과 처리량 사이의 균형을 맞추기 위해 존재합니다. 실제 시스템에서는 Time Slice 길이와 Priority 조정이 핵심 튜닝 포인트입니다.",
      },
      {
        heading: "동기화 기법",
        body: "뮤텍스와 세마포어, 모니터와 같은 동기화 기법은 공유 자원에 대한 안전한 접근을 보장합니다. 데드락 회피를 위해서는 순환 대기를 깨거나 자원 순서를 강제하는 방식이 자주 사용됩니다.",
      },
    ],
  },
  "network-basics": {
    id: "network-basics",
    title: "Networking Fundamentals",
    description:
      "OSI vs TCP/IP layers, congestion control, and common debugging tools.",
    tags: ["Network"],
    updatedAt: "2024-04-28",
    readingTime: "약 5분",
    content: [
      {
        heading: "계층 모델 이해",
        body: "OSI 7계층과 TCP/IP 4계층 모델은 문제를 분리해 설계할 수 있도록 돕습니다. 애플리케이션 계층의 HTTP 요청이 전송 계층의 TCP 세그먼트로 캡슐화되는 흐름을 그림으로 정리하면 구조가 한 눈에 들어옵니다.",
      },
      {
        heading: "흐름 및 혼잡 제어",
        body: "TCP의 슬라이딩 윈도우와 혼잡 윈도우는 패킷 손실을 줄이고 네트워크의 안정성을 유지하는 핵심 메커니즘입니다. Wireshark를 활용해 실제 패킷 흐름을 캡처해 보면 학습 효과가 큽니다.",
      },
      {
        heading: "디버깅 도구",
        body: "ping, traceroute, netstat 같은 기본 도구는 여전히 유용합니다. 최근에는 mtr, tcpdump, curl조합 등 관찰에 특화된 도구를 같이 분석하는 습관이 도움이 됩니다.",
      },
    ],
  },
  "data-structures": {
    id: "data-structures",
    title: "Data Structures",
    description:
      "Trade-offs between trees, heaps, and hash tables plus implementation tips.",
    tags: ["DataStructure"],
    updatedAt: "2024-03-18",
    readingTime: "약 4분",
    content: [
      {
        heading: "시간 복잡도 비교",
        body: "배열, 연결 리스트, 해시 테이블의 삽입/탐색/삭제 비용을 표로 정리하면 각 자료구조의 강약점을 빠르게 파악할 수 있습니다. 사용 시나리오에 따라 어떤 자료구조를 선택할지 기준을 세워두세요.",
      },
      {
        heading: "트리 기반 구조",
        body: "이진 탐색 트리, AVL, Red-Black Tree 등 균형 트리는 탐색 성능을 일정하게 보장합니다. 인터뷰 준비 시에는 회전 연산과 균형 유지 조건을 도식화해보는 것이 좋습니다.",
      },
      {
        heading: "힙과 우선순위 큐",
        body: "힙은 완전 이진 트리로, 배열 기반 구현이 일반적입니다. 스케줄링, 다익스트라 알고리즘 등에서 어떻게 활용되는지 실제 사례와 함께 정리하면 응용력을 높일 수 있습니다.",
      },
    ],
  },
};

export function getSampleNote(noteId: string): NoteDetail | undefined {
  return sampleNoteDetails[noteId];
}
