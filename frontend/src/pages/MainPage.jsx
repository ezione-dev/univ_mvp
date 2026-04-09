import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-surface px-6 py-16 text-on-surface">
      <div className="mx-auto max-w-lg text-center font-body">
        <h1 className="font-headline text-2xl font-bold text-primary md:text-3xl">
          메인화면
        </h1>
        <p className="mt-4 text-slate-600">
          새 메인 화면입니다. 이후 콘텐츠와 내비게이션을 이어서 붙이면 됩니다.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to="/support"
            className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            지원
          </Link>
        </div>
      </div>
    </div>
  );
}
