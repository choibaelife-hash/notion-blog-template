// ── Blog post data ─────────────────────────────────────────────────────────────
// All notice posts → /blog/notice/[slug]
// All journal posts → /blog/journal/[slug]

export type Badge = "Classes Open" | "Score Stories" | "Class Review" | "Award";

export type NoticePost = {
  slug: string;
  badge: Badge;
  date: string;
  title: string;
  gradeTag?: string;
  tags: string[];
  callout: string;
  // Class announcement fields
  classInfo?: { label: string; value: string }[];
  curriculum?: { week: string; topic: string; detail: string }[];
  // Story / review / award fields
  scoreHighlight?: { before: string; after: string; period: string };
  sections?: { title?: string; paragraphs: string[] }[];
  related: { title: string; opens: string }[];
};

export type JournalSection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  checklist?: string[];
  table?: { phase: string; focus: string; goal: string }[];
};

export type JournalPost = {
  slug: string;
  badge: string;
  date: string;
  readTime: string;
  title: string;
  lead: string;
  sections: JournalSection[];
  relatedClasses: { title: string; opens: string }[];
  nextPost: { title: string; date: string; slug: string };
};

// ── Notice posts ───────────────────────────────────────────────────────────────
export const NOTICE_POSTS: NoticePost[] = [
  {
    slug: "ap-biology-summer",
    badge: "Classes Open",
    date: "May 5, 2025",
    title: "AP Biology 여름 특강 오픈",
    gradeTag: "Grade 9–11",
    tags: ["AP Biology", "Summer", "Group", "Individual", "Science"],
    callout:
      "AP Bio에서 5점을 받으려면 단순 암기가 아닌 '개념의 연결'이 핵심입니다. 모든 수업은 실험 해석과 FRQ 작성 중심으로 진행됩니다.",
    classInfo: [
      { label: "대상",      value: "Grade 9–11" },
      { label: "수업 유형", value: "그룹반 (최대 3명) / 개인 레슨" },
      { label: "시작일",    value: "June 2025" },
      { label: "수업 언어", value: "English & Korean" },
      { label: "진행 방식", value: "온라인 (Zoom)" },
    ],
    curriculum: [
      { week: "Week 1–2", topic: "세포 생물학 (Cell Biology)",       detail: "막 수송, 세포 분열, 에너지 대사" },
      { week: "Week 3–4", topic: "유전학 (Genetics & Heredity)",     detail: "멘델 유전, 분자 유전, 돌연변이" },
      { week: "Week 5–6", topic: "진화 & 생태 (Ecology)",            detail: "자연선택, 집단 유전학, 생태계" },
      { week: "Week 7–8", topic: "FRQ 실전 집중 훈련",               detail: "실험 설계 + 데이터 분석 + 에세이" },
    ],
    related: [
      { title: "AP Chemistry 가을 학기", opens: "Sep 1" },
      { title: "AP English Literature 여름 특강", opens: "Jun 1" },
    ],
  },
  {
    slug: "ap-world-history-spring",
    badge: "Classes Open",
    date: "Feb 1, 2025",
    title: "AP World History 봄 학기 오픈",
    gradeTag: "Grade 9–11",
    tags: ["AP World History", "Spring", "Group", "History"],
    callout:
      "역사는 외우는 게 아니라 '연결하는 것'입니다. 시대별 맥락과 비교 분석을 통해 SAQ, LEQ, DBQ 모든 에세이 형식을 마스터합니다.",
    classInfo: [
      { label: "대상",      value: "Grade 9–11" },
      { label: "수업 유형", value: "그룹반 (최대 4명)" },
      { label: "시작일",    value: "March 2025" },
      { label: "수업 언어", value: "English & Korean" },
      { label: "진행 방식", value: "온라인 (Zoom)" },
    ],
    curriculum: [
      { week: "1–3주차",  topic: "고대~중세 (600 BCE–1450 CE)",  detail: "실크로드, 이슬람 제국, 몽골 제국" },
      { week: "4–6주차",  topic: "근대 초기 (1450–1750)",        detail: "대항해 시대, 신세계 교류, 오스만 제국" },
      { week: "7–9주차",  topic: "산업화~현대 (1750–현재)",       detail: "산업혁명, 제국주의, 냉전" },
      { week: "10–12주차",topic: "DBQ / LEQ 에세이 집중",         detail: "문서 분석 + 논증 구조 + 실전 모의" },
    ],
    related: [
      { title: "AP US History 여름 특강", opens: "Jun 15" },
      { title: "AP English Language 봄 학기", opens: "Mar 5" },
    ],
  },
  {
    slug: "act-35-story",
    badge: "Score Stories",
    date: "Apr 28, 2025",
    title: "ACT 35점 달성 — 6개월의 기록",
    gradeTag: "Grade 11",
    tags: ["ACT", "Score Story", "35점", "Grade 11", "Success"],
    callout:
      "\"처음 시험에서 27점을 받았을 때 포기하고 싶었어요. 하지만 Jennie 선생님과 6개월간 매주 꾸준히 하다 보니 어느 순간 문제가 보이기 시작했습니다.\" — 수강생 J.K.",
    scoreHighlight: { before: "27", after: "35", period: "6개월" },
    sections: [
      {
        title: "시작점 — ACT 27점",
        paragraphs: [
          "J.K. 학생은 Grade 10 여름, ACT 27점을 받고 Jennie & Jessie 클래스를 찾았습니다. Math는 31로 비교적 안정적이었지만 English와 Reading이 각각 24, 25로 발목을 잡고 있었습니다.",
          "가장 큰 문제는 시간 관리였습니다. English 섹션에서 매번 마지막 10문제를 시간 초과로 찍어야 했고, Reading에서는 지문을 읽고 나면 내용이 기억나지 않는다고 했습니다.",
        ],
      },
      {
        title: "6개월 플랜",
        paragraphs: [
          "첫 달은 오직 English 문법 규칙 정리에만 집중했습니다. ACT English에서 자주 나오는 25가지 문법 패턴을 완벽히 익힌 뒤, 섹션 타이머를 켜고 반복 훈련했습니다.",
          "Reading은 'Active Reading' 방법론을 도입했습니다. 지문을 읽으면서 각 단락의 핵심을 한 줄로 메모하는 훈련을 3개월간 지속했고, 이후 지문 이해 속도가 눈에 띄게 빨라졌습니다.",
        ],
      },
      {
        title: "결과 — ACT 35점",
        paragraphs: [
          "6개월 후 재응시에서 English 35, Reading 34, Math 36, Science 34로 Composite 35점을 달성했습니다. 가장 큰 변화는 점수보다 '시험에 대한 자신감'이었다고 합니다.",
          "J.K. 학생은 현재 목표 대학에 합격하여 2025년 가을 입학을 앞두고 있습니다.",
        ],
      },
    ],
    related: [
      { title: "ACT 집중 특강 (Grade 10–11)", opens: "Jun 5" },
      { title: "SAT vs ACT 무료 상담", opens: "상시" },
    ],
  },
  {
    slug: "sat-1500-review",
    badge: "Class Review",
    date: "Apr 15, 2025",
    title: "SAT 1500점 수업 후기",
    gradeTag: "Grade 10",
    tags: ["SAT", "Class Review", "1500점", "Digital SAT"],
    callout:
      "\"수업 전에는 Reading에서 왜 틀리는지 몰랐어요. Jessie 선생님이 제 오답 패턴을 찾아주신 뒤부터 점수가 빠르게 올랐습니다.\" — 수강생 S.P.",
    scoreHighlight: { before: "1320", after: "1500", period: "4개월" },
    sections: [
      {
        title: "수업 전 상황",
        paragraphs: [
          "S.P. 학생은 Digital SAT 1320점으로 수업을 시작했습니다. Math는 680으로 탄탄했지만 Reading & Writing이 640에서 정체되어 있었습니다.",
          "특히 Craft and Structure 문제 유형에서 정답률이 50% 이하였고, Evidence-Based 문제에서도 '근거'를 찾는 방식이 부정확했습니다.",
        ],
      },
      {
        title: "수업 방식",
        paragraphs: [
          "Jessie 선생님은 매 수업마다 전 주 오답을 먼저 분석했습니다. 틀린 문제마다 '왜 오답인가'를 구체적으로 짚어주는 방식 덕분에 같은 실수를 반복하지 않을 수 있었습니다.",
          "주 2회 수업, 매주 1회 모의고사를 4개월간 꾸준히 진행했습니다. 수업 외에도 Jessie 선생님이 주간 숙제를 체계적으로 내주셔서 혼자 공부하는 시간도 구조화될 수 있었습니다.",
        ],
      },
      {
        title: "결과 & 추천",
        paragraphs: [
          "4개월 후 SAT 1500점 (Math 760 / RW 740)을 달성했습니다. Reading & Writing에서만 100점이 올랐습니다.",
          "체계적인 오답 분석과 개인 맞춤 피드백을 원하는 학생이라면 강력히 추천합니다. 특히 혼자서 점수가 오르지 않는 학생에게 가장 효과적인 수업이라고 생각합니다.",
        ],
      },
    ],
    related: [
      { title: "Digital SAT 여름 특강", opens: "Jun 5" },
      { title: "SAT Math 800 집중반", opens: "Jun 10" },
    ],
  },
  {
    slug: "promising-young-writers",
    badge: "Award",
    date: "Mar 10, 2025",
    title: "Promising Young Writers 수상",
    gradeTag: "Grade 8",
    tags: ["Award", "Writing", "Promising Young Writers", "Grade 8"],
    callout:
      "Jennie & Jessie의 English Essay 수업을 수강한 Grade 8 학생이 전미 작문 대회 'Promising Young Writers'에서 수상했습니다. 수강생 모두의 노력에 진심으로 축하를 전합니다.",
    sections: [
      {
        title: "수상 학생 소개",
        paragraphs: [
          "이번 수상자는 Jennie & Jessie 클래스에서 2년간 English Essay & Literature 수업을 받아온 Grade 8 학생 A.L. 입니다.",
          "A.L. 학생은 처음 수업을 시작했을 때 에세이 한 편을 쓰는 데 3시간이 넘게 걸렸다고 합니다. 하지만 꾸준한 훈련과 피드백을 통해 이제는 구조 잡힌 에세이를 자신 있게 작성할 수 있게 되었습니다.",
        ],
      },
      {
        title: "Promising Young Writers란?",
        paragraphs: [
          "Promising Young Writers는 National Council of Teachers of English (NCTE)가 주관하는 미국 전국 단위 중학생 작문 대회입니다.",
          "매년 수천 명의 학생이 참가하며, 선정된 학생에게는 인증서와 함께 수상 작품이 NCTE 공식 출판물에 게재됩니다.",
        ],
      },
      {
        title: "앞으로의 계획",
        paragraphs: [
          "A.L. 학생은 고등학교 진학 후 AP English Literature 수업을 목표로 하고 있으며, 대학 에세이 준비도 Jennie & Jessie와 함께할 예정입니다.",
          "이 성과가 우리 수업에서 배우는 학생들 모두에게 좋은 동기부여가 되길 바랍니다.",
        ],
      },
    ],
    related: [
      { title: "Middle School Writing 봄 학기", opens: "Mar 15" },
      { title: "AP English Literature 여름 특강", opens: "Jun 1" },
    ],
  },
  {
    slug: "sat-math-800",
    badge: "Score Stories",
    date: "Feb 20, 2025",
    title: "SAT Math 800점 만점 달성",
    gradeTag: "Grade 11",
    tags: ["SAT", "Math", "800점", "만점", "Score Story"],
    callout:
      "\"Math는 자신 있다고 생각했는데, 800점 만점은 전혀 다른 이야기였어요. Jessie 선생님 덕분에 '만점 사고방식'이 무엇인지 알게 됐습니다.\" — 수강생 K.M.",
    scoreHighlight: { before: "720", after: "800", period: "3개월" },
    sections: [
      {
        title: "720점에서 막힌 이유",
        paragraphs: [
          "K.M. 학생은 학교 수학 성적은 A였지만 Digital SAT Math에서 720점에서 계속 막혔습니다. 계산 실수는 없었지만 어렵게 출제된 문제에서 접근 방식 자체가 달랐습니다.",
          "특히 Advanced Math 파트의 함수 해석 문제와 Word Problem에서 시간을 너무 많이 소모했습니다.",
        ],
      },
      {
        title: "만점 전략",
        paragraphs: [
          "Jessie 선생님은 700점 이상 학생에게 가장 효과적인 전략은 '어려운 문제 선별'이라고 했습니다. 어떤 문제를 빠르게 넘기고 어떤 문제에 시간을 쏟을지 판단하는 능력이 만점의 핵심입니다.",
          "3개월간 SAT Math 고난도 문제만 집중적으로 풀었습니다. 틀린 문제는 반드시 2가지 이상의 풀이 방법을 찾는 훈련을 했고, 이 과정에서 문제 접근 유연성이 크게 향상됐습니다.",
        ],
      },
      {
        title: "800점 달성",
        paragraphs: [
          "3개월 후 Digital SAT에서 Math 800점 만점을 달성했습니다. Reading & Writing도 함께 준비해 총점 1540점을 기록했습니다.",
          "K.M. 학생은 현재 SAT 1550+ 목표로 Reading & Writing 추가 수업을 진행 중입니다.",
        ],
      },
    ],
    related: [
      { title: "Digital SAT Math 집중반", opens: "Jun 10" },
      { title: "SAT 1500+ 종합반", opens: "Jun 5" },
    ],
  },
];

// ── Journal posts ──────────────────────────────────────────────────────────────
export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "ap-exam-8-weeks",
    badge: "Study Tips",
    date: "May 1, 2025",
    readTime: "6 min read",
    title: "How to Prepare for AP Exams in 8 Weeks",
    lead: "AP 시험까지 두 달이 남았다면, 지금이 가장 중요한 시점입니다. 어디서부터 시작해야 할지 막막하다면, 이 8주 플랜을 그대로 따라가세요. Jennie & Jessie의 실전 수업에서 검증된 전략입니다.",
    sections: [
      {
        id: "section-1",
        label: "01",
        title: "현재 실력 파악하기",
        body: [
          "무작정 공부를 시작하기 전에, 반드시 자신의 현재 위치를 파악해야 합니다. College Board에서 제공하는 최신 기출 문제를 한 세트 풀고, 섹션별 점수를 기록하세요.",
          "이 진단 결과가 8주 플랜의 방향을 결정합니다. 약점 섹션에 더 많은 시간을 배분하고, 강점 섹션은 유지 수준으로 공부하면 됩니다.",
        ],
        checklist: [
          "최신 기출 1세트 완료 (타이머 사용)",
          "섹션별 정답률 스프레드시트에 기록",
          "오답 패턴 3가지 이상 파악",
          "선생님 또는 튜터와 결과 공유",
        ],
      },
      {
        id: "section-2",
        label: "02",
        title: "주차별 플랜 짜기",
        body: [
          "8주를 4개 구간으로 나누어 운영하면 가장 효율적입니다. 각 구간마다 목표와 평가 기준을 명확히 해두면 막판에 흔들리지 않습니다.",
        ],
        table: [
          { phase: "1–2주차", focus: "개념 정리",        goal: "교재 1회독 + 섹션별 핵심 노트 완성" },
          { phase: "3–4주차", focus: "문제 유형 익히기", goal: "FRQ 유형별 30개 이상 풀기" },
          { phase: "5–6주차", focus: "실전 모의고사",    goal: "주 2회 풀타임 모의고사 + 오답 분석" },
          { phase: "7–8주차", focus: "고득점 마무리",    goal: "약점 섹션 집중 + 마지막 기출 2세트" },
        ],
      },
      {
        id: "section-3",
        label: "03",
        title: "에세이 집중 훈련",
        body: [
          "AP 시험에서 5점을 받으려면 FRQ(Free Response Questions)에서 고득점이 필수입니다. 특히 AP English Lit/Lang, AP History 계열 과목은 에세이의 비중이 매우 높습니다.",
          "매주 최소 2편의 에세이를 작성하고, 반드시 피드백을 받으세요. 혼자 쓰는 것보다 피드백 받고 고치는 과정에서 실력이 가장 빠르게 오릅니다.",
        ],
      },
    ],
    relatedClasses: [
      { title: "AP English Literature 여름 특강", opens: "Jun 1" },
      { title: "AP Calculus BC", opens: "Jun 10" },
    ],
    nextPost: { title: "Grade 8 math — 3 mistakes everyone makes", date: "Apr 10, 2025", slug: "grade-8-math-mistakes" },
  },
  {
    slug: "grade-8-math-mistakes",
    badge: "Study Tips",
    date: "Apr 10, 2025",
    readTime: "5 min read",
    title: "Grade 8 Math — 3 Mistakes Everyone Makes",
    lead: "Grade 8 수학에서 성적이 오르지 않는다면, 대부분 같은 3가지 실수를 반복하고 있을 가능성이 높습니다. 지금 바로 확인하고 고쳐보세요.",
    sections: [
      {
        id: "section-1",
        label: "01",
        title: "개념 없이 공식만 외운다",
        body: [
          "Grade 8 수학에서 가장 흔한 실수는 '왜 이 공식이 성립하는지' 모르고 그냥 외우는 것입니다. 예를 들어, 인수분해 공식을 외워도 새로운 형태의 문제가 나오면 적용하지 못합니다.",
          "해결책은 간단합니다. 새 공식을 배울 때마다 교과서 예제를 직접 손으로 유도해보는 습관을 기르세요. 처음엔 느리지만 장기적으로 훨씬 빠르게 응용 문제를 풀 수 있습니다.",
        ],
        checklist: [
          "이번 주 배운 공식을 교과서 없이 직접 유도해보기",
          "공식 적용 예제 5개 이상 직접 풀기 (답지 먼저 X)",
          "왜 이 공식이 성립하는지 친구에게 설명해보기",
        ],
      },
      {
        id: "section-2",
        label: "02",
        title: "오답을 그냥 넘어간다",
        body: [
          "시험 후 채점만 하고 오답 분석을 하지 않는 학생이 의외로 많습니다. 같은 유형의 문제를 다음 시험에서 또 틀리는 이유가 바로 이것입니다.",
          "오답 노트를 만들되, 단순히 풀이를 옮겨 적는 것에 그치지 마세요. '내가 왜 틀렸는지'를 한 줄로 쓰는 것이 핵심입니다. 계산 실수인지, 개념 오해인지, 문제 독해 실수인지 분류하면 패턴이 보입니다.",
        ],
        table: [
          { phase: "계산 실수",   focus: "검산 습관",       goal: "시험 마지막 5분 검산 시간 확보" },
          { phase: "개념 오해",   focus: "개념 재학습",     goal: "오답 유형 교과서에서 다시 찾아 읽기" },
          { phase: "독해 실수",   focus: "문제 밑줄 긋기",  goal: "조건·단위 먼저 체크 후 풀기" },
        ],
      },
      {
        id: "section-3",
        label: "03",
        title: "숙제만 하고 복습을 안 한다",
        body: [
          "숙제를 성실히 하지만 단원 시험에서 점수가 안 나오는 학생의 공통점은 '복습 없는 숙제'입니다. 숙제는 '이해했다'는 확인이 아니라 '모르는 걸 발견하는 과정'입니다.",
          "매주 한 번, 이번 주에 배운 내용을 교재 없이 노트에 정리해보세요. 막히는 곳이 나오면 바로 그 부분이 복습이 필요한 곳입니다. 이 방법만 꾸준히 해도 중간·기말 대비 시간이 반으로 줄어듭니다.",
        ],
      },
    ],
    relatedClasses: [
      { title: "Grade 8 Math 정규반", opens: "Sep 1" },
      { title: "AMC 8 대비반", opens: "Jun 15" },
    ],
    nextPost: { title: "SAT Reading: how to improve 100+ points", date: "Mar 22, 2025", slug: "sat-reading-100-points" },
  },
  {
    slug: "sat-reading-100-points",
    badge: "Study Tips",
    date: "Mar 22, 2025",
    readTime: "7 min read",
    title: "SAT Reading: How to Improve 100+ Points",
    lead: "Digital SAT Reading & Writing에서 100점 이상 올리는 것은 가능합니다. 단, 조건이 있습니다 — 지금 하고 있는 방식을 완전히 바꿀 용기가 필요합니다.",
    sections: [
      {
        id: "section-1",
        label: "01",
        title: "왜 지문을 다 읽어도 틀리는가",
        body: [
          "SAT Reading에서 가장 많이 하는 오해는 '지문을 천천히 꼼꼼히 읽으면 정답이 보인다'는 것입니다. 사실 Digital SAT의 Reading 문제는 지문 '전체 이해'가 아니라 '특정 근거 찾기'를 테스트합니다.",
          "지문을 다 읽고도 틀리는 이유는 '무엇을 찾아야 하는지' 모르는 채로 읽기 때문입니다. 문제를 먼저 읽고 '이 문제가 요구하는 것'을 파악한 뒤 지문에서 근거를 찾는 순서로 바꾸세요.",
        ],
        checklist: [
          "문제 먼저 읽기 → 키워드 2–3개 메모",
          "지문에서 해당 부분만 집중 독해",
          "오답 선택지를 지문에서 반증할 수 있는지 확인",
          "근거 없는 답은 100% 오답으로 처리",
        ],
      },
      {
        id: "section-2",
        label: "02",
        title: "Craft and Structure 집중 공략",
        body: [
          "Digital SAT에서 난이도가 높은 문항 유형은 대부분 Craft and Structure 카테고리에서 나옵니다. 단어의 문맥적 의미, 텍스트 구조 분석, 저자의 의도 등을 묻는 문제들입니다.",
          "이 유형에서 점수를 올리려면 'tone word' 목록을 익히고, 각 단락이 전체 글에서 어떤 역할을 하는지 파악하는 훈련이 필요합니다. 이 훈련은 AP English 수업과 100% 연결됩니다.",
        ],
        table: [
          { phase: "Words in Context",     focus: "문맥 의미 추론",  goal: "주변 문장 2개로 의미 좁히기" },
          { phase: "Text Structure",        focus: "단락 기능 파악",  goal: "각 단락을 '주장·근거·반론'으로 분류" },
          { phase: "Author's Purpose",      focus: "저자 의도 분석",  goal: "어조(tone) 단어 50개 암기" },
          { phase: "Cross-Text Connections",focus: "두 지문 비교",    goal: "공통점·차이점 메모 후 문제 접근" },
        ],
      },
      {
        id: "section-3",
        label: "03",
        title: "3개월 실전 플랜",
        body: [
          "Reading & Writing에서 100점을 올리기 위한 3개월 플랜은 명확합니다. 1개월차는 유형별 전략 습득, 2개월차는 모의고사 + 오답 분석, 3개월차는 약점 집중 + 실전 시뮬레이션입니다.",
          "가장 중요한 것은 매주 1회 반드시 실전 모의고사를 치르는 것입니다. 조건은 타이머를 켜고, 방해 없는 환경에서, 실제 시험과 동일한 조건으로 진행하는 것입니다. 이 훈련이 쌓여야 실제 시험장에서 멘탈이 흔들리지 않습니다.",
        ],
      },
    ],
    relatedClasses: [
      { title: "Digital SAT 집중반", opens: "Jun 5" },
      { title: "AP English Language 봄 학기", opens: "Mar 5" },
    ],
    nextPost: { title: "How to Prepare for AP Exams in 8 Weeks", date: "May 1, 2025", slug: "ap-exam-8-weeks" },
  },
];
