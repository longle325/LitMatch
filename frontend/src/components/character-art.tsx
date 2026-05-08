import type { Character } from "@/types";

export default function CharacterArt({ character }: { character: Character }) {
  if (character.image) {
    return (
      <div className="art image-art">
        <img src={character.image} alt={character.name} />
        <span className="tag">Kinh điển</span>
      </div>
    );
  }
  return (
    <div
      className="art"
      data-initial={character.initial}
      style={
        {
          "--art-a": character.artA,
          "--art-b": character.artB,
        } as React.CSSProperties
      }
    >
      <span className="tag">Kinh điển</span>
      <div className="art-scene">
        <strong>{character.artTitle}</strong>
        <span>{character.imageBrief}</span>
      </div>
    </div>
  );
}
