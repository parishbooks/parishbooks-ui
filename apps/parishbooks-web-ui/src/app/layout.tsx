import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans, Roboto } from 'next/font/google';
import '@parishbooks-ui/design-system/styles/globals.css';
import '@parishbooks-ui/site-ui/styles/marketing-bridge.css';
import '@parishbooks-ui/site-ui/styles/site-shell.css';
import { cn } from '@parishbooks-ui/design-system/utils';
import { ThemeProvider } from '@parishbooks-ui/design-system/theme-provider';

const notoSansHeading = Noto_Sans({
    subsets: ['latin'],
    variable: '--font-heading',
});
const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'ParishBooks — Ledger, CRM & Giving for Parishes',
    description:
        'Double-entry ledger, family CRM, online giving, and tax receipts — built for church treasurers, not accountants.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, 'font-sans', roboto.variable, notoSansHeading.variable)}
        >
            <body className="min-h-full flex flex-col bg-background text-foreground">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
