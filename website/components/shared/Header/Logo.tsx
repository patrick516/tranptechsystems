// components/shared/Header/Logo.tsx
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/SYstemsLogo.png"
        alt="TranpTech Systems"
        width={220}
        height={50}
        priority
        className="h-12 w-auto"
      />
    </Link>
  );
}
