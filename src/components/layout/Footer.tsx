import Link from "next/link";
import { Heart, Mail } from "lucide-react";

const quickLinks = [
  { href: "/about", label: "關於學會" },
  { href: "/news", label: "學會消息" },
  { href: "/education", label: "衛教專區" },
  { href: "/resources", label: "資源下載" },
  { href: "/gallery", label: "活動花絮" },
  { href: "/links", label: "相關連結" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* About — wider */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-white text-sm">
                臺南市乳癌防治學會
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              致力於乳癌防治教育、學術研究推廣及病友支持，為台南地區民眾的健康把關。
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-white/50">
              <Mail className="w-4 h-4 shrink-0 text-primary/80" />
              <span>inyang5036@yahoo.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-bold text-white/70 tracking-widest uppercase mb-4">
              快速連結
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-4 md:col-start-10 lg:col-span-3 lg:col-start-11">
            <h3 className="text-xs font-bold text-white/70 tracking-widest uppercase mb-4">
              關於本站
            </h3>
            <p className="text-xs text-white/40 leading-relaxed">
              本網站由臺南市乳癌防治學會維護，提供乳癌防治衛教資訊、學術活動消息及相關資源。
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {currentYear} 臺南市乳癌防治學會 版權所有
          </p>
          <p className="text-xs text-white/30">
            Tainan Breast Cancer Prevention Association
          </p>
        </div>
      </div>
    </footer>
  );
}
