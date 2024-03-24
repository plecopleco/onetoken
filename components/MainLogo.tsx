import localFont from "next/font/local";

const myFont = localFont({ src: "../pages/LuloCleanOne.otf" });
const myFontBold = localFont({ src: "../pages/LuloCleanOneBold.otf" });
const myTitleFont = localFont({ src: "../pages/SF-Pro-Display-Bold.otf" });

export const MainLogo = () => {
  return (
    <main className="flex justify-center pb-5 ">
      <div className="flex flex-col items-center">
        <h1 className="md:text-4xl lg:text-7xl text-3xl">ONE PRESALE</h1>
      </div>
    </main>
  );
};
