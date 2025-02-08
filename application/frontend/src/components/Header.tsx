import Link from 'next/link';
import SignInLink from './SignInLink';

export default function Header() {
  return (
    <div className='top-0 w-full z-10 bg-white relative'>
      <header className="bg-gray-800 text-white shadow w-full pr-4">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center relative left-[1px]">
          <h1 className="font-bold"><Link href="/">Books Application Sample</Link> </h1>
          <nav className="space-x-4">
            <Link href="/" className='hover:underline'>Home</Link>
            <Link href="/admin" className='hover:underline'>Admin</Link>
            <SignInLink />
          </nav>
        </div>
      </header>
      {/* ヘッダーの下 1rem 分の隙間を入れる */}
      <div className="absolute -bottom-4 h-4 bg-white" style={{width: "calc(100% - 16px)"}}></div>
    </div>
  );
};
