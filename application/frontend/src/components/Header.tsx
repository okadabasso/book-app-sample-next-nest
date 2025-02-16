import Link from 'next/link';
import SignInLink from './SignInLink';


export default function Header() {
  return (
    <div className='top-0 w-full z-10 bg-white'>
      <header className="bg-gray-800 text-white shadow w-full pr-4 firefox:pr-0">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center relative left-[1px]">
          <h1 className="font-bold"><Link href="/">Books Application Sample</Link> </h1>


          <details className="relative sm:hidden  z-[100]">
            <summary className="cursor-pointer px-2 py-1 border rounded">
              Menu
            </summary>
            <nav className="absolute right-0 mt-2 p-2 w-48 bg-gray-800 text-white shadow-sm rounded-sm flex flex-col">
            <Link href="/" className='hover:underline'>Home</Link>
            <Link href="/admin" className='hover:underline'>Admin</Link>
            <SignInLink />
          </nav>
          </details>

          <nav className="hidden sm:flex text-right gap-2 shadow-md rounded-md content-end">
            <Link href="/" className='hover:underline'>Home</Link>
            <Link href="/admin" className='hover:underline'>Admin</Link>
            <SignInLink />
          </nav>
        </div>
      </header>
      {/* ヘッダーの下 1rem 分の隙間を入れる */}
      <div className='relative'>
        <div className="absolute -bottom-4 h-4 bg-white" style={{ width: "calc(100% - 16px)" }}></div>
      </div>
    </div>
  );
};
