import { nip19 } from "nostr-tools";

import NoteCard from "./NotedCard";

function NotesList({ notes, metadata }) {
  console.log(notes)
  return (
    <div className="flex flex-col gap-16">
      {notes.map((note) => {
           return(
            <NoteCard key={note.id} 
            //Cuando se creao el twit o comentario en el muro
            created_at={note.created_at}
            //datos dek usuario
            user={{
              name: metadata[note.pubkey]?.name ?? nip19.npubEncode(note.pubkey).slice(0,12),
              images : metadata[note.pubkey]?.picture ?? 'https://img.freepik.com/free-icon/user_318-563642.jpg?w=360',
              pubkey: note.pubkey
            }}
            //El contenido del twit podrimos de decir o del comentario del muro
            content={note.content}
            //Regresando un hashtag como si fuera un twitter
            hashtag= {note.tags.filter(t=> t[0] === "t") .map(t=>t[1])}
            ></NoteCard>
           );
      })}
    </div>
  );
}

export default NotesList;
