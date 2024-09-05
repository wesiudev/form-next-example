import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-red-400 h-screen w-screen flex items-center justify-center">
      <Link title="idź do formularza" href="/form">
        Form
      </Link>
      <Link title="idź do kontaktu" href="/contact">
        Kontakt
      </Link>
    </div>
  );
}
