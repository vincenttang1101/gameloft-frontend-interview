# Tang Trinh Quang

## Load project

```
git clone "https://git.g4b.gameloft.com/g4b-recruitment/frontend-programmer-intern-test-submission/tang-trinh-quang.git"
cd tang-trinh-quang
npm install
code .
config "SITE_KEY" of Google recaptcha in .env
npm run dev
```

## Folder Structure

```
.
└── src/
├── assets
├── components (Common)
│ ├── Layout
│ │ ├── Footer
│ │ │ ├── index.tsx
│ │ │ └── styles.css
│ │ ├── Header
│ │ │ ├── index.tsx
│ │ │ └── styles.css
│ │ └── index.tsx
│ └── index.ts (entry point)
├── constants
│ └── index.ts
├── data (mock data)
│ └── questions.json
├── features (Individual)
│ ├── ChangeMyMind
│ │ ├── index.tsx
│ │ └── styles.css
│ ├── Complete
│ │ ├── index.tsx
│ │ └── styles.css
│ ├── Consent
│ │ ├── index.tsx
│ │ └── styles.css
│ ├── Survey
│ │ ├── index.tsx
│ │ ├── styles.css
│ │ └── surveySlice.ts
│ ├── ThankYou
│ │ ├── index.tsx
│ │ └── styles.css
│ └── index.ts (entry point)
├── redux
│ ├── hook.ts
│ └── store.ts
├── typing
│ └── index.d.ts
├── App.css
├── App.tsx
├── index.css (global)
├── main.tsx
└── reset.css
```

## Import convention

```
*  Các thứ tự import:

1/ Thư viện
   1.1/ Thư viện React (Ưu tiên React Hook)
   1.2/ Thư viện bên ngoài

2/ Những thư mục/tệp tin khác:
   2.1/ Theo thư mục components
   2.2/ Theo thư mục constants
   2.3/ Theo thư mục data
   2.4/ Theo thư mục features
   2.5/ Theo thư mục redux
   2.6/ Theo thư mục src
   2.7/ Theo thư mục typing
   2.8/ Các file CSS/SCSS

*  Cùng loại thư viện hay thư mục/tệp tin (Lưu ý):
    **  Tất cả ưu tiên từ: Default export -> Named export -> CSS/SCSS
    **  Sắp xếp theo tổng độ dài tăng dần
```
