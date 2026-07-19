// components/shared/Header/index.tsx
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container-max relative flex h-16 items-center justify-between">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}
