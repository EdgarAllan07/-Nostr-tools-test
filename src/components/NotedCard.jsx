import React from "react";

function NoteCard({ content,user,created_at,hashtag }) {

  return (
    <div className="rounded-lg p-5 border border-gray-600 bg-white flex flex-col gap-16 break-words">
      <div className="flex gap-12 items-center">
        <img src={user.images} alt="" className="rounded-full w-40 aspect-square bg-gray-100" />
        <div>
          <a href={`https/nostr.guru/p/${user.pubkey}`}
          className="text-black text-body3  overflow-hidden text-ellipsis"
          target="_blank"
          rel="noreferrer">{user.name}</a>
          <p className="text-body5 text-gray-400">
              {new Date(created_at *1000).toISOString().split("T")[0]}
          </p>
        </div>
      </div>
      
      <p>{content}</p>

      <div className="flex flex-wrap gap-2">
        {
          hashtag.filter((t)=> hashtag.indexOf(t) === hashtag.lastIndexOf(t))
          .map((hash)=>(
            <li key={hash} className="bg-gray-300 text-body5 text-gray-900 font-medium rounded-full px-5 py-4">
              #{hash}
            </li>
          ))
        }
      </div>
    </div>
  );
}

export default NoteCard;
