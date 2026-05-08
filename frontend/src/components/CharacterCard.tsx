import { X, Heart, Scale } from "lucide-react";
import type { Character } from "@/types";
import CharacterArt from "./CharacterArt";

interface Props {
  character: Character;
  onSkip: () => void;
  onMatch: () => void;
}

export default function CharacterCard({ character, onSkip, onMatch }: Props) {
  const traits = character.personality
    .split(",")
    .slice(0, 3)
    .map((trait) => trait.trim());
  return (
    <article className="card deck-card">
      <div className="swipe-stamp swipe-stamp-left">Bỏ qua</div>
      <div className="swipe-stamp swipe-stamp-right">Chọn</div>
      <CharacterArt character={character} />
      <div className="deck-body">
        <div className="deck-title">
          <h1 className="headline-lg">{character.name}</h1>
          <p>
            {character.work} · {character.author}
          </p>
        </div>
        <blockquote className="quote">"{character.quote}"</blockquote>
        <p className="deck-bio">{character.bio}</p>
        <div className="conflict-tile">
          <span>Xung đột</span>
          <strong>
            <Scale size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            {character.conflict.split(";")[0]}
          </strong>
        </div>
        <div className="trait-row">
          {traits.map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>
      </div>
      <div className="swipe-actions">
        <button
          className="btn circle ghost"
          aria-label="Bỏ qua"
          onClick={onSkip}
        >
          <X size={24} />
        </button>
        <button
          className="btn circle primary"
          aria-label="Chọn nhân vật"
          onClick={onMatch}
        >
          <Heart size={24} />
        </button>
      </div>
    </article>
  );
}
