# notion-blog template

Jennie & Jessie Classroom 프로젝트에서 추출한 Next.js + Notion API 블로그 템플릿.

## 파일 구조

```
lib/
  notion.ts                        # Notion API fetch 함수 모음

app/blog/
  page.tsx                         # 블로그 메인 (Upcoming + Updates + Journal)
  BlogUpdatesSection.tsx           # Updates / Learning Journal 섹션 (탭 필터)
  data.ts                          # 더미 데이터 (Notion 연동 전 사용)
  notice/[slug]/page.tsx           # 수업 공지 상세 페이지
  journal/[slug]/page.tsx          # 학습 저널 상세 페이지

components/blog/
  ClassInfoTable.tsx               # 수업 정보 테이블 컴포넌트
  ExamStructureTable.tsx           # 시험 구조 테이블 컴포넌트
```

## 환경변수 설정

`.env.local` 파일에 아래 값을 추가한다.

```env
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_NOTICE_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- `NOTION_API_KEY`: Notion Integration 토큰 ([Settings → Connections → Integrations](https://www.notion.so/my-integrations))
- `NOTION_NOTICE_DB_ID`: 공지 데이터베이스 URL에서 추출한 32자리 ID

## Notion DB 필드 구조

`NOTION_NOTICE_DB_ID` 데이터베이스에 아래 property가 있어야 한다.

| Property | 타입 | 설명 |
|---|---|---|
| Title | title | 포스트 제목 |
| Slug | rich_text | URL slug (영문 소문자, 하이픈) |
| Category | select | `Classes Open` / `Score Stories` / `Class Review` |
| Date | date | 공개일 |
| Published | checkbox | 체크 시 노출 |
| TargetGrade | rich_text | 대상 학년 (예: `Grade 9–12`) |
| Grade | multi_select | 학년 태그 |
| Subject | rich_text | 과목 |
| ClassType | rich_text | 수업 유형 (예: `1:1 Private`) |
| Schedule | rich_text | 수업 시간 |
| Duration | rich_text | 수업 기간 |

## 주요 함수 (lib/notion.ts)

```ts
// 수업 공지 목록 (Category: "Classes Open", Published: true)
fetchUpcomingPosts(): Promise<UpcomingPost[]>

// slug로 공지 상세 + Notion 블록 가져오기
fetchNoticePostBySlug(slug: string): Promise<NoticeDetail | null>
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev
```

## 데이터 흐름

```
Notion DB
  └── lib/notion.ts  (fetch, 60s revalidate)
        └── app/blog/page.tsx  (Upcoming 섹션)
        └── app/blog/notice/[slug]/page.tsx  (공지 상세)
```

`BlogUpdatesSection.tsx`와 `data.ts`는 현재 정적 더미 데이터를 사용한다.  
Notion 연동이 필요하면 `data.ts`의 배열을 Notion fetch 함수로 교체한다.
