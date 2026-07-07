import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import schoolData from "@/data/data.json";
import { BackToTop } from "./back-to-top";

export function Footer() {
  const { school, navigation, programs, contact, socials } = schoolData;

  return (
    <footer className="w-full border-t border-border/50 bg-background relative">
      <div
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <h3 className="text-xl font-bold tracking-tight text-white">
              {school.shortName}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              {school.name} — Pendidikan vokasi berkualitas untuk generasi masa
              depan Indonesia.
            </p>
            <div className="flex gap-3">
              {[
                { href: socials.facebook, icon: Facebook, label: "Facebook" },
                {
                  href: socials.instagram,
                  icon: Instagram,
                  label: "Instagram",
                },
                { href: socials.twitter, icon: Twitter, label: "Twitter" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="h-9 w-9 rounded-lg border border-border/50 bg-card/30 flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary/30 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Navigasi
            </h4>
            <ul className="space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-secondary transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Program
            </h4>
            <ul className="space-y-3 text-sm">
              {programs.map((prog) => (
                <li key={prog.id}>
                  <Link
                    href="/#programs"
                    className="text-muted-foreground hover:text-secondary transition-colors duration-200"
                  >
                    {prog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Kontak
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  className="h-4 w-4 text-secondary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground leading-snug">
                  {contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="h-4 w-4 text-secondary shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="h-4 w-4 text-secondary shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {school.name}. All rights
            reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
