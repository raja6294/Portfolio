import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404: User navigated to non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#050505] text-[#111111] dark:text-white px-4 transition-colors duration-200">
      <div className="text-center max-w-md">
        <span className="text-xs font-mono text-[#777777] uppercase tracking-widest mb-2 block">
          Error 404
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-[#111111] dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-[#555555] dark:text-[#A0A0A0] text-sm mb-8 leading-relaxed">
          The requested page at <code className="text-[#111111] dark:text-neutral-300 font-mono text-xs px-1.5 py-0.5 rounded bg-[#F3F4F6] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#252525]">{location.pathname}</code> does not exist or has been relocated.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111111] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-semibold text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
