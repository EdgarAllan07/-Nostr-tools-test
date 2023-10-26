"use client";
import { toast } from "react-hot-toast";
import {
  EventTemplate,
  getEventHash,
  getPublicKey,
  signEvent,
} from "nostr-tools";
import { useRouter } from "next/navigation";

function Login() {
  const navigate = useRouter();

  async function verifyLogin() {
    try {
    if (!window.nostr) {
      toast.error("nostr extension not found");
      return;
    }
    const _baseEvent = {
      content: "Verification",
      created_at: Math.round(Date.now() / 1000),
      kind: 1,
      tags: [["t", "nostr"]],
    };
  
      const pub = await window.nostr.getPublicKey();

      if (pub) {
        toast.success("WELCOME");
        navigate.push("/main");
      } 
      const pubkey = localStorage.setItem("pubkey", pub);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
    
      <div className="container">
        <div className="flex justify-center items-center">
          <button
            onClick={verifyLogin}
            className="bg-purple-600 text-white font-mono font-extrabold py-2 px-3 rounded-lg text-sm hover:bg-purple-800"
          >
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
