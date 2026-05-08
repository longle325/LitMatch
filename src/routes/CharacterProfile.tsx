import { Link, Navigate, useParams } from "react-router-dom";
import { useCharacter } from "@/api/queries";
import { useAppStore } from "@/stores/useAppStore";
import CharacterArt from "@/components/CharacterArt";
import type { Character } from "@/types";

function splitTraits(personality: string): string[] {
  return personality
    .split(/[,;]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function getPortrait(character: Character): string | undefined {
  return character.portrait || character.images?.[0] || character.image;
}

export default function CharacterProfile() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: character, isLoading, isError } = useCharacter(id);
  const matches = useAppStore((s) => s.matches);
  const completed = useAppStore((s) => s.completed);

  if (isLoading) {
    return (
      <section className="page narrow">
        <div className="card empty-state">
          <p className="lead">Đang tải hồ sơ nhân vật...</p>
        </div>
      </section>
    );
  }

  if (isError || !character) {
    return <Navigate to="/collection" replace />;
  }

  const portrait = getPortrait(character);
  const traits = splitTraits(character.personality);
  const conflicts = character.conflict
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
  const isMatched = matches.includes(character.id);
  const result = completed[character.id];

  return (
    <section className="page narrow reference-character-profile">
      <Link to="/collection" className="btn ghost back-link">
        <span className="material-symbols-outlined">arrow_back</span>
        Bộ sưu tập
      </Link>

      <article className="card character-profile">
        <div className="character-profile-hero">
          <div className="character-profile-portrait">
            {portrait ? (
              <img src={portrait} alt={character.name} />
            ) : (
              <CharacterArt character={character} />
            )}
          </div>
          <div className="character-profile-heading">
            <p className="kicker">
              {character.genre ? `${character.genre} · ` : ""}
              {character.work} · {character.author}
            </p>
            <h1 className="headline-lg">{character.name}</h1>
            {character.artTitle && (
              <p className="lead">{character.artTitle}</p>
            )}
            <div className="character-profile-status">
              <span className={`badge ${result?.passed ? "done" : "pending"}`}>
                {result?.passed
                  ? "Đã mở khóa hoàn toàn"
                  : isMatched
                    ? "Chưa hoàn thành thử thách"
                    : "Chưa kết nối"}
              </span>
              {result && (
                <small>
                  Điểm thử thách gần nhất: {result.score}/5 · +{result.awarded} điểm
                </small>
              )}
            </div>
          </div>
        </div>

        <blockquote className="quote profile-quote">
          "{character.quote}"
        </blockquote>

        <div className="character-profile-grid">
          <section className="profile-section">
            <h2>Tiểu sử</h2>
            <p className="deck-bio">{character.bio}</p>
          </section>

          {conflicts.length > 0 && (
            <section className="profile-section">
              <h2>Xung đột nội tâm</h2>
              <div className="conflict-tile">
                <span>
                  <span className="material-symbols-outlined">balance</span>
                  Mâu thuẫn
                </span>
                <strong>{conflicts.join(" · ")}</strong>
              </div>
            </section>
          )}

          <section className="profile-section">
            <h2>Tính cách</h2>
            <div className="trait-row">
              {traits.map((trait) => (
                <span key={trait}>{trait}</span>
              ))}
            </div>
          </section>

          {character.context && (
            <section className="profile-section">
              <h2>Bối cảnh</h2>
              <p className="deck-bio">{character.context}</p>
            </section>
          )}

          {character.interpretationThemes &&
            character.interpretationThemes.length > 0 && (
              <section className="profile-section">
                <h2>Chủ đề diễn giải</h2>
                <div className="trait-row">
                  {character.interpretationThemes.map((theme) => (
                    <span key={theme}>{theme}</span>
                  ))}
                </div>
              </section>
            )}

          {character.symbols && character.symbols.length > 0 && (
            <section className="profile-section">
              <h2>Biểu tượng</h2>
              <div className="trait-row">
                {character.symbols.map((symbol) => (
                  <span key={symbol}>{symbol}</span>
                ))}
              </div>
            </section>
          )}

          {character.voice && (
            <section className="profile-section">
              <h2>Chất giọng</h2>
              <p className="deck-bio">{character.voice}</p>
            </section>
          )}

          {character.sources && character.sources.length > 0 && (
            <section className="profile-section">
              <h2>Chi tiết then chốt</h2>
              <ul className="profile-sources">
                {character.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="actions-row character-profile-actions">
          <Link
            className="btn primary"
            to={`/characters/${character.id}/chat`}
          >
            <span className="material-symbols-outlined">forum</span>
            Trò chuyện
          </Link>
          <Link
            className="btn secondary"
            to={`/characters/${character.id}/challenge`}
          >
            <span className="material-symbols-outlined">quiz</span>
            Làm thử thách
          </Link>
        </div>
      </article>
    </section>
  );
}
