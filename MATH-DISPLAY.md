# 수식 표시

KaTeX 0.19.1과 폰트·라이선스를 vendor/katex에 포함합니다. 외부 CDN 없이 동작합니다.

math-setup.mjs의 명시한 표시 영역만 변환합니다. 입력값·저장값·채점은 원래 텍스트를 사용합니다. 진행 비율은 분수로 바꾸지 않습니다. 수식이 있는 선택지는 네이티브 라디오와 LaTeX 레이블을 사용하며 키보드로 선택할 수 있습니다. SVG 도형 좌표와 각의 호는 원래 수학 모델을 유지합니다.

검증: tests/math-display.test.mjs, evidence/math-layout.json 및 화면 캡처. 과거 게임 완주·학습 기록 검증은 evidence/browser-review-before-latex.json에 보존합니다.
