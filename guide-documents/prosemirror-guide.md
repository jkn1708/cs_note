# ProseMirror 개념 가이드

**ProseMirror**는 웹에서 리치 텍스트 에디터를 구축하기 위한 강력한 툴킷입니다. Tiptap은 이 ProseMirror 위에 구축된 래퍼(Wrapper) 라이브러리입니다.

## 핵심 구조 (Architecture)
ProseMirror는 MVC(Model-View-Controller) 패턴과 유사한 구조를 가지고 있습니다.

### 1. Model (문서 구조)
- **Document**: ProseMirror의 문서는 단순한 HTML 문자열이 아닙니다. 트리 구조를 가진 불변(Immutable) 데이터 객체입니다.
- **Node**: 문서를 구성하는 기본 단위입니다. (예: 문단, 헤딩, 이미지 등)
- **Schema**: 문서에 어떤 노드와 마크(스타일)가 올 수 있는지, 그들의 관계는 어떠한지를 정의하는 규칙입니다.
    - 예를 들어, "`<ul>` 안에는 `<li>`만 올 수 있다" 같은 규칙을 정의합니다.

### 2. State (현재 상태)
- **EditorState**: 에디터의 현재 상태를 나타내는 단일 객체입니다. 다음 요소들을 포함합니다:
    - `doc`: 현재 문서 (Model)
    - `selection`: 현재 커서 위치 또는 드래그된 영역
    - `plugins`: 활성화된 플러그인들의 상태
- 불변성(Immutability): 상태가 변경될 때마다 기존 객체를 수정하는 것이 아니라, 새로운 State 객체를 생성합니다. 이는 Redux와 비슷한 개념으로, 실행 취소(Undo) 기능을 구현하기 매우 쉽게 만듭니다.

### 3. View (화면 표시)
- **EditorView**: 현재 `EditorState`를 브라우저 DOM으로 렌더링하고, 사용자의 입력 이벤트를 처리합니다.
- 사용자가 키보드를 누르거나 마우스를 클릭하면 View가 이를 감지하여 적절한 Action을 발생시킵니다.

### 4. Transform & Transaction (변경 처리)
문서를 변경하는 과정은 다음과 같습니다:
1. **Transaction 생성**: "엔터 키 입력" 같은 사용자 행동이 발생하면, 현재 State를 기반으로 변경 내용을 담은 트랜잭션을 만듭니다.
2. **State 갱신**: 이 트랜잭션을 현재 State에 적용(dispatch)하면 새로운 State가 생성됩니다.
3. **View 업데이트**: 새로운 State가 만들어지면 View가 이를 감지하여 화면을 다시 그립니다.

---

## Tiptap과의 관계
Tiptap은 ProseMirror의 강력하지만 복잡한 API를 사용하기 쉽게 감싸놓은 프레임워크입니다.

| ProseMirror (Low-level) | Tiptap (High-level) |
| :--- | :--- |
| Schema 직접 정의 | `Extension`으로 자동 처리 |
| Transaction 직접 생성 및 Dispatch | `editor.commands...run()` 체이닝 |
| Plugin 시스템 직접 제어 | `Extension` 내부에 캡슐화 |
| View 직접 생성 | `useEditor`, `<EditorContent />` 컴포넌트 제공 |

**즉, 우리가 Tiptap을 쓸 때도 내부적으로는 ProseMirror의 Document, State, Transaction이 끊임없이 작동하고 있습니다.** Tiptap의 `extensions` 설정은 결국 ProseMirror의 Schema와 Plugin을 생성하는 과정입니다.
