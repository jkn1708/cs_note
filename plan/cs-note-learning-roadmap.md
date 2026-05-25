# CS Note 학습 노트 확장 계획

## 목표

`cs_note`는 AI와 함께 공부한 내용을 Markdown + Mermaid 형식으로 정리하고, 나중에 태그/주제별로 빠르게 다시 찾아보는 개인 학습 노트 앱으로 발전시킨다.

현재 프로젝트는 Next.js App Router와 static export 구조를 사용하고 있으므로, 초기 단계에서는 서버 런타임 없이 정적 데이터와 클라이언트 상호작용을 중심으로 기능을 확장한다.

## 사용 시나리오

1. 배우고 싶은 CS 토픽을 정한다.
2. AI를 통해 개념, 흐름, 예시, Mermaid 다이어그램 초안을 만든다.
3. `새 노트 작성하기` 화면에서 Markdown + Mermaid 형식으로 내용을 정리한다.
4. 노트마다 태그를 붙인다.
5. 나중에 태그 검색이나 태그 통계 페이지에서 관련 노트만 다시 본다.

## 현재 구조 기준

- 노트 메타데이터: `src/mock/notes-metadata.json`
- 노트 본문: `src/mock/notes-content.json`
- 노트 조합 로직: `src/mock/sample-notes.ts`
- 전체 목록: `src/app/list/page.tsx`
- 상세 페이지: `src/app/notes/[noteId]/page.tsx`
- 작성/편집 페이지: `src/app/editnote/page.tsx`, `src/app/editnote/[noteId]/page.tsx`

현재 데이터 수가 적을 때는 mock JSON 기반으로 충분하다. 노트가 100개 정도까지 늘어나는 것은 큰 무리가 없지만, 본문이 길어질수록 목록/검색 화면에서는 메타데이터만 사용하도록 분리를 유지해야 한다.

## 기능 계획

### 1단계: 태그 기반 탐색 강화

목표는 노트가 100개 정도로 늘어났을 때도 원하는 주제를 빠르게 찾는 것이다.

- `/list` 페이지에 태그 필터 추가
- 태그 클릭 시 해당 태그를 가진 노트만 표시
- 검색어 입력 시 제목, 설명, 태그 기준으로 필터링
- 필터 결과 개수 표시
- 선택된 태그를 쉽게 해제할 수 있는 UI 제공

예상 구현 단위:

- `src/mock/sample-notes.ts`에 태그 집계 유틸 추가
- `getAllTags()`
- `getNotesByTag(tag)`
- `searchNotes(query, tag?)`
- 목록 필터 UI 컴포넌트 추가

### 1.5단계: 카테고리/메인 태그/세부 태그 구조로 확장

노트가 100개 이상으로 늘어나면 단일 태그가 너무 많아져서 목록 화면의 필터가 복잡해질 수 있다. 따라서 노트 분류를 `category`, `mainTag`, `tags` 3단계로 나눈다.

분류 기준:

- `category`: 큰 학습 영역. 노트당 1개만 가진다. 예: `Frontend`, `Language`, `CS`, `Database`
- `mainTag`: 해당 노트의 핵심 주제. 노트당 1개만 가진다. 예: `JavaScript`, `React`, `Network`
- `tags`: 세부 키워드. 노트당 1개 이상 가진다. 예: `ExecutionContext`, `CallStack`, `Hoisting`

목표:

- 필터 UI에는 `category`를 우선 표시
- `category`에 hover/focus 시 해당 카테고리에 속한 `mainTag` 목록까지만 표시
- `category`를 클릭하면 해당 카테고리의 모든 노트 표시
- `mainTag`를 클릭하면 해당 메인 태그의 노트만 표시
- 실제 필터링은 `category`와 `mainTag`까지만 지원
- 세부 `tags`는 검색과 노트 카드/상세 화면의 보조 정보로 사용
- 노트 카드에서는 `category`, `mainTag`를 우선 노출하고, 세부 `tags`는 보조 정보로 표현

예상 데이터 구조:

```json
{
  "id": "execution-context",
  "title": "실행 컨텍스트와 콜스택",
  "description": "자바스크립트 엔진이 코드를 실행하기 위해 필요한 환경 정보와 실행 순서를 관리하는 메커니즘을 상세히 알아봅니다.",
  "category": "Language",
  "mainTag": "JavaScript",
  "tags": ["JS-Engine", "CallStack", "ExecutionContext"],
  "updatedAt": "2024-02-19",
  "readingTime": "약 12분"
}
```

기존 `tags` 배열을 바로 제거하기보다, 마이그레이션 단계에서는 다음 둘 중 하나를 선택한다.

1. `category`, `mainTag`를 새로 추가하고 기존 `tags`는 세부 태그로 유지
2. 기존 `tags`의 첫 번째 값을 `mainTag`로 승격하고 나머지를 세부 `tags`로 정리

초기에는 1번이 안전하다. 기존 목록/상세 화면이 깨질 가능성이 적고, 데이터 변환을 단계적으로 할 수 있다. 이후 작성 화면에서 `category` 1개, `mainTag` 1개, 세부 `tags` 1개 이상을 필수 입력으로 받는다.

필터 동작:

- `/list?category=Language`
- `/list?category=Language&mainTag=JavaScript`
- 검색어가 있으면 제목, 설명, `category`, `mainTag`, 세부 `tags`를 함께 검색
- `category` 필터가 선택된 상태에서 검색어를 입력하면 해당 카테고리 안에서만 검색
- `mainTag` 필터가 선택된 상태에서 검색어를 입력하면 해당 메인 태그 안에서만 검색
- hover/focus로 보이는 목록은 세부 `tags`가 아니라 `mainTag` 목록까지만 표시

예상 구현 단위:

- `NoteSummary` 타입에 `category`, `mainTag` 추가
- mock 메타데이터를 `category`, `mainTag`, `tags` 구조로 정리
- `getCategorySummaries()` 유틸 추가
- `getMainTagSummaries(category?)` 유틸 추가
- 기존 `getAllTags()`는 세부 태그 검색/표시용으로 유지
- `NoteListExplorer`의 selectedTag를 selectedCategory, selectedMainTag로 변경
- 카테고리 버튼 hover/focus 시 메인 태그 목록을 보여주는 UI 추가
- 작성 화면에서 `category`, `mainTag`, `tags` 입력을 분리

### 2단계: 태그 통계 페이지 추가

목표는 내가 어떤 주제를 얼마나 정리했는지 한눈에 보는 것이다.

- `/tags` 페이지 추가
- 태그별 노트 개수 표시
- 많이 정리한 태그 순으로 정렬
- 태그 클릭 시 `/list?tag=JavaScript` 같은 형태로 이동
- 전체 노트 수, 전체 태그 수, 최근 업데이트 노트 수 표시

예상 화면 구성:

- 상단: 전체 요약
- 본문: 태그별 카드 또는 표
- 각 태그 항목: 태그명, 노트 개수, 최근 업데이트 날짜

### 3단계: 노트 작성 흐름 개선

목표는 AI가 생성한 Markdown + Mermaid 내용을 쉽게 붙여넣고 정리하는 것이다.

- 작성 화면에서 Markdown 입력과 Preview 전환 개선
- Mermaid 코드블록 렌더링 안정화
- 태그 입력 UX 개선
- 쉼표 입력 방식 유지 또는 태그 칩 UI로 전환
- 저장 전 필수값 검증
- 제목, 설명, 태그, 본문이 비어 있을 때 안내

추가로 고려할 것:

- AI가 만든 원문을 붙여넣는 `초안 붙여넣기` 영역
- Markdown template 제공
- Mermaid 예시 삽입 버튼

### 4단계: 데이터 구조 정리

100개 이상의 노트로 늘어날 것을 고려해 데이터 구조를 조금 더 명확히 한다.

현재 구조:

```txt
notes-metadata.json
notes-content.json
sample-notes.ts
```

단기적으로는 이 구조를 유지한다. 다만 본문이 커지면 다음 구조를 고려한다.

```txt
src/content/notes/
  execution-context.md
  hoisting.md
  this.md

src/mock/notes-metadata.json
```

이렇게 하면 목록/태그/검색 페이지는 메타데이터만 사용하고, 상세/편집 화면에서만 본문을 가져오는 방향으로 확장할 수 있다.

### 5단계: 저장 방식 확장

초기에는 mock JSON과 static export를 유지한다. 실제 작성한 노트를 브라우저에 저장하고 싶다면 다음 순서로 확장한다.

1. `localStorage` 기반 임시 저장
2. import/export 기능 추가
3. JSON 파일 다운로드/업로드
4. Firebase Firestore 연동
5. 로그인 및 개인 노트 저장

지금 목표가 클라이언트 리소스를 최대한 활용하는 것이므로, Firebase는 바로 붙이기보다 노트 작성/검색 UX가 안정된 뒤 도입한다.

## 추천 라우트 구조

```txt
/
/list
/list?tag=JavaScript
/list?q=closure
/tags
/tags/JavaScript
/notes/[noteId]
/editnote
/editnote/[noteId]
```

초기 구현에서는 `/tags/[tag]`를 별도 페이지로 만들기보다 `/list?tag=...`로 처리하는 편이 단순하다. 태그별 설명이나 학습 진행률 같은 정보가 생기면 `/tags/[tag]` 페이지를 추가한다.

## 우선순위

1. 태그 집계 유틸 작성
2. `/tags` 페이지 추가
3. `/list` 페이지에 태그 필터와 검색 추가
4. 작성 화면 태그 입력 개선
5. 본문 데이터 분리 전략 검토

## 체크포인트

- 노트가 100개일 때 목록 페이지가 느려지지 않는가?
- 태그별 노트 개수를 쉽게 볼 수 있는가?
- 검색어와 태그 필터를 함께 사용할 수 있는가?
- 상세 페이지에서는 Mermaid가 안정적으로 렌더링되는가?
- 작성 화면에서 AI가 만든 Markdown을 거의 수정 없이 넣을 수 있는가?

## 현재 판단

현재 프로젝트는 이 목표에 잘 맞는 출발점이다. 정적 export 구조라 배포가 단순하고, 편집기와 Mermaid 렌더링처럼 상호작용이 필요한 부분은 클라이언트에서 처리할 수 있다.

다음으로는 서버 기능을 늘리기보다, 태그 검색과 태그 통계처럼 학습 노트를 다시 찾는 경험을 먼저 강화하는 것이 좋다.
