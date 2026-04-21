import type { Metadata } from "next";
import { Download, FileText, File, Calendar } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/shared/PageTransition";
import { getDownloads } from "@/lib/notion";
import type { DownloadItem } from "@/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "資源下載",
  description:
    "下載乳癌防治衛教手冊、乳房自我檢查指引、術後照護指南、篩檢補助申請表等實用資源，由臺南市乳癌防治學會提供。",
};

const fileTypeIcon: Record<string, { icon: typeof FileText; color: string }> = {
  PDF: { icon: FileText, color: "text-red-500 bg-red-50" },
  Word: { icon: File, color: "text-blue-500 bg-blue-50" },
  其他: { icon: File, color: "text-gray-500 bg-gray-50" },
};

export default async function ResourcesPage() {
  let downloads: DownloadItem[];
  try {
    downloads = await getDownloads();
  } catch {
    downloads = [];
  }

  return (
    <PageTransition>
      <PageHeader
        title="資源下載"
        englishTitle="Resources & Downloads"
        subtitle="提供衛教資料、表單及活動相關文件下載"
      />

      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            {downloads.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                  <Download className="w-7 h-7 text-charcoal/20" />
                </div>
                <p className="text-charcoal/40 text-sm">目前沒有可下載的檔案</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-hidden rounded-2xl border border-secondary/30">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-secondary/30">
                        <th className="text-left px-6 py-4 text-sm font-bold text-charcoal">
                          檔案名稱
                        </th>
                        <th className="text-center px-4 py-4 text-sm font-bold text-charcoal w-24">
                          類型
                        </th>
                        <th className="text-center px-4 py-4 text-sm font-bold text-charcoal w-32">
                          日期
                        </th>
                        <th className="text-center px-4 py-4 text-sm font-bold text-charcoal w-24">
                          下載
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {downloads.map((item, index) => {
                        const ft =
                          fileTypeIcon[item.fileType] || fileTypeIcon["其他"];
                        return (
                          <tr
                            key={item.id}
                            className={`border-t border-secondary/20 hover:bg-secondary/10 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-background"
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-8 h-8 rounded-lg ${ft.color} flex items-center justify-center shrink-0 mt-0.5`}
                                >
                                  <ft.icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="font-medium text-charcoal text-sm">
                                    {item.fileName}
                                  </p>
                                  <p className="text-xs text-charcoal/50 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className="category-badge">
                                {item.fileType}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center text-xs text-charcoal/50">
                              {item.uploadDate}
                            </td>
                            <td className="px-4 py-4 text-center">
                              {item.fileUrl ? (
                                <a
                                  href={item.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all"
                                  aria-label={`下載 ${item.fileName}`}
                                >
                                  <Download className="w-4 h-4" />
                                </a>
                              ) : (
                                <span className="text-xs text-charcoal/30">
                                  —
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {downloads.map((item) => {
                    const ft =
                      fileTypeIcon[item.fileType] || fileTypeIcon["其他"];
                    return (
                      <div
                        key={item.id}
                        className="bg-background rounded-xl border border-secondary/30 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl ${ft.color} flex items-center justify-center shrink-0`}
                          >
                            <ft.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-charcoal text-sm">
                              {item.fileName}
                            </p>
                            <p className="text-xs text-charcoal/50 mt-1">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="category-badge text-[10px]">
                                {item.fileType}
                              </span>
                              <span className="text-xs text-charcoal/40 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {item.uploadDate}
                              </span>
                            </div>
                          </div>
                          {item.fileUrl ? (
                            <a
                              href={item.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all flex items-center justify-center"
                              aria-label={`下載 ${item.fileName}`}
                            >
                              <Download className="w-5 h-5" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
