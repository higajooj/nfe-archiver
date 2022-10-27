import { Menu } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import HMenu from "./HMenu";

const Navbar = () => {
  const session = useSession();

  if (session.status === "loading") return <div>loading</div>;
  return (
    <div className="mb-6 flex items-baseline justify-between">
      <div className="flex gap-x-6 font-bold">
        <Link href="/nfe">Notas fiscais</Link>
        <Link href="/dfe">DFe</Link>
      </div>
      <div className="flex">
        {session.status === "authenticated" ? (
          <HMenu label={session.data.user.username}>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sair
                </button>
              )}
            </Menu.Item>
          </HMenu>
        ) : (
          <>
            <button onClick={() => signIn()}>Entrar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
