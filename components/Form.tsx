"use client";
import { useState } from "react";
type UserData = {
  fName: string;
  sName: string;
};
export default function Form() {
  const [userData, setUserData] = useState<UserData>({
    fName: "sdfasddsadsa",
    sName: "asffasfasfsa",
  });
  const [isOpen, setOpen] = useState<boolean>(false);
  function sendForm({ fName, sName }: UserData) {
    console.log(`imię: ${fName} nazwisko: ${sName}`);
  }
  return (
    <div>
      <h1 className="text-3xl w-max mx-auto text-white drop-shadow shadow-black">
        Dołącz do naszej społeczności
      </h1>
      <button onClick={() => setOpen(!isOpen)}>Włącz</button>
      {isOpen.toString()}
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          sendForm(userData);
        }}
      >
        <input
          className="text-black"
          type="text"
          value={userData.fName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData({ ...userData, fName: e.target.value })
          }
        />
        <input
          className="text-black"
          type="text"
          value={userData.sName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData({ ...userData, sName: e.target.value })
          }
        />
        <button type="submit">Dołącz</button>
      </form>
    </div>
  );
}
