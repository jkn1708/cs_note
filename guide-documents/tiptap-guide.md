# Tiptap 에디터 가이드

이 문서는 프로젝트에서 사용 중인 Tiptap 라이브러리의 핵심 개념과 현재 구현된 에디터 구조에 대해 설명합니다.

## Tiptap이란?
**Tiptap**은 [ProseMirror](https://prosemirror.net/)를 기반으로 구축된 "헤드리스(Headless)" 에디터 프레임워크입니다.
- **헤드리스**: 기본 UI를 제공하지 않습니다. 개발자가 원하는 디자인과 마크업으로 에디터를 완전히 커스터마이징할 수 있습니다.
- **확장성**: 블록, 스타일, 기능 등이 "확장(Extension)" 단위로 모듈화되어 있습니다.

---

## 프로젝트 내 구현 분석 (`src/components/editor/Editor.tsx`)

### 1. `useEditor` 훅
에디터 인스턴스를 생성하고 관리하는 핵심 훅입니다.

```tsx
const editor = useEditor({
  extensions: [StarterKit],
  // 중요: SSR 이슈 방지를 위해 false로 설정
  immediatelyRender: false,
});
```

- **`extensions`**: 사용할 기능들을 배열로 전달합니다. 현재는 `StarterKit` 하나만 사용 중입니다.
- **`immediatelyRender: false`**: Next.js의 SSR 환경에서 서버와 클라이언트의 렌더링 결과 불일치(Hydration Error)를 방지하기 위해 필수적인 설정입니다.

### 2. StarterKit
[`@tiptap/starter-kit`](https://tiptap.dev/api/extensions/starter-kit)는 가장 자주 사용되는 확장들의 모음입니다.
이 패키지 하나로 다음 기능들이 포함됩니다:
- **텍스트 스타일**: 굵게(Bold), 기울임(Italic), 취소선(Strike)
- **블록 요소**: 제목(Heading), 글머리 기호(BulletList), 번호 매기기(OrderedList), 인용구(Blockquote), 코드 블록(CodeBlock)
- **히스토리**: 실행 취소(Undo), 다시 실행(Redo)

### 3. 커스텀 툴바 구현 (Toolbar)
Tiptap은 UI를 제공하지 않으므로, 버튼을 직접 만들어 에디터와 연결해야 합니다.
프로젝트에서는 `toolbarGroups` 배열을 정의하여 버튼들을 렌더링하고 있습니다.

#### 버튼 동작 원리 (Chaining)
Tiptap 명령어는 메서드 체이닝 방식을 사용합니다.

```tsx
// 예: 굵게 토글하기
editor.chain().focus().toggleBold().run()
```
1. `chain()`: 여러 명령을 연속해서 실행할 체인을 시작합니다.
2. `focus()`: 버튼 클릭 시 포커스가 버튼으로 이동하는 것을 막고, 에디터 내부로 포커스를 되돌립니다.
3. `toggleBold()`: 실제 수행할 명령입니다.
4. `run()`: 체인에 쌓인 명령들을 실행합니다.

#### 상태 확인 (isActive)
현재 커서 위치의 스타일 상태를 확인하여 버튼의 활성화 여부(파란불)를 결정합니다.

```tsx
// 예: 현재 굵게 스타일이 적용되어 있는지 확인
const isActive = editor.isActive("bold");
```
- Heading 처럼 속성이 있는 경우: `editor.isActive("heading", { level: 1 })`

---

## 사용 방법 예시

### 새로운 기능 추가하기 (예: 밑줄 Underline)

1. **패키지 설치**:
   ```bash
   npm install @tiptap/extension-underline
   ```

2. **확장 등록 (`Editor.tsx`)**:
   ```tsx
   import Underline from '@tiptap/extension-underline'

   const editor = useEditor({
     extensions: [
       StarterKit,
       Underline, // 추가
     ],
     // ...
   })
   ```

3. **툴바 버튼 추가**:
   ```tsx
   {
     label: "U",
     ariaLabel: "밑줄",
     type: "toggle",
     run: () => editor.chain().focus().toggleUnderline().run(),
     isActive: () => editor.isActive("underline"),
   }
   ```
