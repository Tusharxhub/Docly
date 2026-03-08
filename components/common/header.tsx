"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useOrganization,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Brain,
  LogIn,
  UserPlus,
  ChevronRight,
  FileText,
  LayoutDashboard,
  ArrowLeftRight,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const { organization } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);

  const isDocumentsPage = organization && pathname?.includes("/documents");
  const isDashboardPage =
    organization &&
    pathname === `/${organization.slug}` &&
    !pathname?.includes("/documents");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Logo + Breadcrumb */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <Brain className="h-5 w-5 text-blue-600" />
            <span className="hidden sm:inline">Docly</span>
          </Link>

          {/* Breadcrumb nav when inside org */}
          {organization && (
            <nav className="hidden md:flex items-center text-sm text-muted-foreground">
              <ChevronRight className="h-3.5 w-3.5 mx-1" />
              <Link href={`/${organization.slug}`}>
                <Button
                  variant={isDashboardPage ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2 gap-1.5 font-normal text-sm"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  {organization.name}
                </Button>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 mx-0.5" />
              <Link href={`/${organization.slug}/documents`}>
                <Button
                  variant={isDocumentsPage ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2 gap-1.5 font-normal text-sm"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Documents
                </Button>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 mx-0.5" />
              <Link href="/select-org">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 gap-1.5 font-normal text-sm"
                >
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  Switch
                </Button>
              </Link>
            </nav>
          )}
        </div>

        {/* Right: Auth Section */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <div className="hidden md:flex items-center gap-2">
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="hidden md:flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-1.5" />
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </SignedOut>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <div className="flex flex-col gap-2 mt-8">
                  {/* Mobile Navigation */}
                  {organization ? (
                    <>
                      <Link
                        href={`/${organization.slug}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={isDashboardPage ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          {organization.name}
                        </Button>
                      </Link>
                      <Link
                        href={`/${organization.slug}/documents`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={isDocumentsPage ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Documents
                        </Button>
                      </Link>
                      <Link
                        href="/select-org"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2"
                        >
                          <ArrowLeftRight className="h-4 w-4" />
                          Switch Organization
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <Button
                        variant={pathname === "/" ? "secondary" : "ghost"}
                        className="w-full justify-start gap-2"
                      >
                        Home
                      </Button>
                    </Link>
                  )}

                  {/* Mobile Auth */}
                  <div className="border-t pt-4 mt-4">
                    <SignedIn>
                      <div className="flex justify-center">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </SignedIn>

                    <SignedOut>
                      <div className="flex flex-col gap-2">
                        <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            <LogIn className="h-4 w-4 mr-1.5" />
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                          <Button className="w-full">
                            <UserPlus className="h-4 w-4 mr-1.5" />
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    </SignedOut>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
