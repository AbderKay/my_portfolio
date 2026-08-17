import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex justify-center py-8">
        <span className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {profile.name}
        </span>
      </div>
    </footer>
  );
}
