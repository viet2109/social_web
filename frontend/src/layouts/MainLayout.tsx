import { Menu, Sidebar, X } from "lucide-react";
import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  rightbar?: ReactNode;
  footer?: ReactNode;
}

function MainLayout(props: Props) {
  const { header, sidebar, rightbar, children, footer } = props;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightbarOpen, setRightbarOpen] = useState(false);

  // Chỉ hiển thị các toggle button khi có sidebar tương ứng
  const hasHeader = !!header;
  const hasSidebar = !!sidebar;
  const hasRightbar = !!rightbar;
  const hasFooter = !!footer;

  return (
    <div className="min-h-screen">
      {/* Header - chỉ hiển thị khi có header */}
      {hasHeader && (
        <header className="bg-background border-b border-b-border sticky top-0 z-50 shadow-sm h-header flex items-center justify-center p-4">
          <div className="flex items-center justify-between flex-1">
            {/* Left sidebar toggle - chỉ hiển thị khi có sidebar */}
            <div className="flex items-center justify-center">
              {hasSidebar && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden mr-2 cursor-pointer p-2 rounded-lg text-text-primary hover:bg-background-secondary transition-colors"
                >
                  {sidebarOpen ? <X size={20} /> : <Sidebar size={20} />}
                </button>
              )}
            </div>

            {/* Header content - centered */}
            <div className="flex-1 flex items-center">
              <div className="flex-1">{header}</div>
            </div>

            {/* Right sidebar toggle - chỉ hiển thị khi có rightbar */}
            <div className="flex items-center justify-center">
              {hasRightbar && (
                <button
                  onClick={() => setRightbarOpen(!rightbarOpen)}
                  className="xl:hidden p-2 ml-2 rounded-lg  transition-colors text-text-primary hover:bg-background-secondary cursor-pointer"
                >
                  {rightbarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Left Sidebar - chỉ hiển thị khi có sidebar */}
        {hasSidebar && (
          <aside
            className={`
            fixed bottom-0 left-0 top-0 z-40 w-sidebar bg-background border-r border-r-border shadow-sm
            transform transition-transform duration-300 ease-in-out
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
            ${hasHeader ? "top-[var(--height-header)]" : ""}
          `}
          >
            <div className="w-full h-full flex flex-col">
              {/* Sidebar Content - có thể scroll */}
              <div className="flex-1 overflow-y-auto p-4">{sidebar}</div>

              {/* Footer - fixed ở cuối sidebar */}
              {hasFooter && (
                <footer className="border-t text-sm text-text-muted border-t-border bg-background p-4 flex-shrink-0">
                  {footer}
                </footer>
              )}
            </div>
          </aside>
        )}

        {/* Main Content - điều chỉnh margin dựa trên việc có sidebar hay không */}
        <main
          className={`
            flex-1
            mx-0
            ${hasSidebar ? "lg:ml-[var(--width-sidebar)]" : ""}
            ${hasRightbar ? "xl:mr-80" : ""}
            
          `}
        >
          <div className="p-4">{children}</div>
        </main>

        {/* Right Sidebar - chỉ hiển thị khi có rightbar */}
        {hasRightbar && (
          <aside
            className={`
            fixed bottom-0 top-0 right-0 z-40 w-80 bg-background border-l border-l-border shadow-sm
            transform transition-transform duration-300 ease-in-out
            ${
              rightbarOpen
                ? "translate-x-0"
                : "translate-x-full xl:translate-x-0"
            }
            ${hasHeader ? "top-[var(--height-header)]" : ""}
          `}
          >
            <div className="h-full w-full flex flex-col">
              {/* Rightbar Content - có thể scroll */}
              <div className="flex-1 overflow-y-auto p-4">{rightbar}</div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Overlays - chỉ hiển thị khi cần thiết */}
      {hasSidebar && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {hasRightbar && rightbarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 xl:hidden"
          onClick={() => setRightbarOpen(false)}
        />
      )}
    </div>
  );
}

export default MainLayout;
