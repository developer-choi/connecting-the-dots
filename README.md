# [커넥팅더닷츠] 프론트엔드 과제

## 1. 실행 방법 (Storybook)

```bash
yarn install
yarn storybook
```

## 2. 컴포넌트 구조 설계 및 구현 내용

과제 요구사항인 **Dialog** 컴포넌트를 구현하였으며, **Select** 컴포넌트는 미구현 상태입니다.

Material UI 원본 소스코드를 분석하여 설계했습니다.

### 과제의 신뢰도
이번 과제에서 제가 신경 쓴 부분은 다음과 같습니다.

1. 요구하신 기능이 잘 동작하는지
2. 추후 재사용이 간편한지 (Modal, FocusTrap, Portal 컴포넌트를 재사용해서 Dialog, Drawer 컴포넌트 제작)

이 2가지를 MUI 원본 코드에서 AI로 코드를 추려내서 겉으로는 잘 동작하고, 잘 재사용 되고있는지를 확인 한 상태입니다.

원래라면 이어서 아래의 작업도 해야했습니다.
3. 어떤 철학으로 MUI에서 컴포넌트를 이렇게 분리했는지
4. MUI에서 구현된 코드 한줄 한줄 분석하기 (예시 > FocusTrap을 구현하는 방법)

하지만, 시간안에 해내지를 못했습니다.

따라서 아래 README.md 내용은 모두 AI로 작성되었습니다.

### Dialog 컴포넌트 구조
`Modal`은 단순히 하나의 팝업을 띄우는 것이 아니라, 다양한 오버레이 UI(Dialog, Drawer 등)의 기반이 되는 **Core 컴포넌트**로 설계했습니다.

*   **`Portal`**: 부모 컴포넌트의 DOM 계층 구조에 영향을 받지 않도록 `document.body` 등 외부 노드에 렌더링합니다.
*   **`FocusTrap`**: 모달이 열렸을 때 포커스가 내부에서만 순환하도록 가두어 키보드 접근성을 보장합니다.
*   **`Modal`**: Backdrop 처리, `Escape` 키 이벤트, `Portal` 및 `FocusTrap` 통합을 담당하는 하위 수준(Low-level) 컴포넌트입니다.
*   **`Dialog`**: `Modal`을 기반으로 실제 컨텐츠(Title, Content, Actions)를 구성하는 상위 수준(High-level) UI 컴포넌트입니다.

### 평가 기준에 따른 구현 상세

**1. 컴포넌트 구조와 설계, 상태 관리의 명확성 및 확장성**
*   **Headless 패턴 지향**: 스타일과 로직을 분리하여 `Modal` 로직을 `Dialog`뿐만 아니라 `Drawer` 등 다른 형태의 오버레이 컴포넌트에서도 재사용할 수 있도록 확장성을 확보했습니다.
*   **제어 컴포넌트(Controlled)**: `open` props를 통해 외부에서 상태를 제어하는 방식으로 구현하여 Storybook 및 부모 컴포넌트에서의 제어를 명확히 했습니다.

**2. 웹 표준과 접근성 (Accessibility)**
*   **Focus Management**: `FocusTrap`을 직접 구현하여 모달 오픈 시 포커스 이동 및 `Shift + Tab` / `Tab` 네비게이션을 지원합니다.
*   **ARIA 속성**: 스크린 리더가 모달임을 인지할 수 있도록 `role="dialog"`, `aria-modal="true"` 등의 속성을 적절히 적용했습니다.
*   **Keyboard Interaction**: `Escape` 키를 눌렀을 때 모달이 닫히도록 이벤트 리스너를 등록하여 사용자 경험을 높였습니다.

**3. 재사용 가능한 패턴**
*   기능(Focus, Portal, Modal)과 디자인(Dialog UI)을 분리함으로써, 추후 디자인 요구사항이 변경되거나 다른 형태의 모달이 필요할 때 유연하게 대처할 수 있습니다.
