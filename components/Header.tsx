import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur border-b border-neutral-800">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-lg">
          BlackFrogs Labs
        </Link>

        <nav className="flex gap-4 text-sm text-gray-400">
          <Link href="/services">Services</Link>
          <Link href="/book-repair">Book</Link>
          <Link href="/track-repair">Track</Link>
          <Link href="/shop">Shop</Link>
        </nav>
      </div>
    </header>
  );
}
