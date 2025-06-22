import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden flex-col md:flex-row">
      <div className="relative hidden md:block md:w-1/2 h-1/2 md:h-full">
        <Image
          src="/karosauda.png"
          alt="karosauda"
          fill
          sizes="50vw"
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <div className="w-full md:w-1/2 h-full flex items-center justify-center">
        <div className="max-w-full w-full">{children}</div>
      </div>
    </div>
  );
}
