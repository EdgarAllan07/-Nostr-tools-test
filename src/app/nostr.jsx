"use client";
import { SimplePool, Event, Filter } from "nostr-tools";
import { useEffect, useRef, useState } from "react";
import NotesList from "@/components/NotesList";
import { useDebounce } from "use-debounce";
import {insertEventIntoDescendingList} from "../utils/helperFunctions"
import FormComent from "@/components/FormComent";
//import CreateNote from "@/components/CreateNote";
export const RELAYS = [
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.swiss-enigma.ch",
  "wss://relay.damus.io",
];

function Nostr({status}) {
  const [pool, setPool] = useState(null);
  const [eventsImediate, setEvents] = useState([]);
  //Nos ayuda leer los eventos que entrar peor esperamos antes un cierta cantidad de tiempo en milisegundos (3000 por ejemplo)
  const [events] = useDebounce(eventsImediate, 1000);
  const [metadata, setMetadata] = useState({});
  const metadaFetched = useRef({});

  //setup a relay pool
  useEffect(() => {
    const _pool = new SimplePool();
    setPool(_pool);

    return () => {
      _pool.close(RELAYS);
    };
  }, []);

  //subscribe to some events
  useEffect(() => {
    if (!pool) {
      return console.log("i cant connect");
    }

    const sub = pool.sub(RELAYS, [
      {
        kinds: [1],
        limit: 100,
        "#t": ["nostr"],
      },
    ]);

    sub.on("event", (event) => {
      //Callback nos sirven para guardar arreglso en ciertas variables
      setEvents((events) => insertEventIntoDescendingList(events, event));
    });

    return () => {
      sub.unsub();
    };
  }, [pool]);

  //subscribe to some events
  useEffect(() => {
    if (!pool) {
      return console.log("i cant connect");
    }
    const pubkeyEvents = events
      .filter((event) => metadaFetched.current[event.pubkey] !== true)
      .map((event) => event.pubkey);

    pubkeyEvents.forEach((pubkey) => (metadaFetched.current[pubkey] = true));

    const sub = pool.sub(RELAYS, [
      {
        kinds: [0],
        authors: pubkeyEvents,
      },
    ]);

    sub.on("event", (event) => {
      const metadata = JSON.parse(event.content);
      setMetadata((cur) => ({
        ...cur,
        [event.pubkey]: metadata,
      }));
    });

    sub.on("eose", () => {
      sub.unsub();
    });

    return () => {};
  }, [events, pool]);

  if (!pool) return null;

  //render the events (se muestren en la pagina)

  return (
    <>
 
    <main className="max-w-screen-md my-0 mx-auto p-8">
      <FormComent pool={pool} status={status}></FormComent>
      <NotesList notes={events} metadata={metadata}></NotesList>
    </main>
    </>
  );
}

export default Nostr;
