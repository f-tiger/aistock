import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div className="max-w-md space-y-5">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent text-xl font-bold text-ink-950">
          AI
        </div>
        <p className="font-mono text-5xl font-extrabold text-white">404</p>
        <p className="text-slate-300">
          页面不存在或已移动。
          <br />
          <span className="text-slate-400">This page could not be found.</span>
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link href="/zh" className="btn-primary">返回首页</Link>
          <Link href="/en" className="btn-ghost">Home (EN)</Link>
        </div>
      </div>
    </main>
  );
}
