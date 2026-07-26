import "./globals.css";

export const metadata = {
  title: "Shop",
  description: "Mctaba Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}