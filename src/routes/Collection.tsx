import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeck } from "@/api/queries";
import { useAppStore } from "@/stores/useAppStore";
import CharacterArt from "@/components/CharacterArt";
import type { Character, ChallengeResult } from "@/types";

type SortKey = "recent" | "progress";

const SORT_LABEL: Record<SortKey, string> = {
  recent: "Mới thêm gần đây",
  progress: "Tiến độ thử thách",
};

function progressPercent(result: ChallengeResult | undefined): number {
  if (!result) return 33;
  return result.passed ? 100 : Math.round((result.score / 5) * 100);
}

function CollectionCard({
  character,
  result,
}: {
  character: Character;
  result?: ChallengeResult;
}) {
  const status = result?.passed
    ? "Đã mở khóa hoàn toàn"
    : "Chưa hoàn thành thử thách";
  const progress = progressPercent(result);
  const image = character.portrait || character.images?.[0] || character.image;

  return (
    <article className="card collection-card">
      <div className="collection-image">
        {image ? (
          <img src={image} alt={character.name} />
        ) : (
          <CharacterArt character={character} />
        )}
        <span className="collection-status">
          <span className="material-symbols-outlined">
            {result?.passed ? "verified" : "lock_open"}
          </span>
          {result?.passed ? "Đã mở khóa" : "Chờ thử thách"}
        </span>
      </div>
      <div className="collection-body">
        <h2>{character.name}</h2>
        <p>{character.work}</p>
        <div className="collection-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <small>{progress}% khám phá</small>
        <span className={`badge ${result?.passed ? "done" : "pending"}`}>
          {status}
        </span>
        <div className="actions-row">
          <Link
            className="btn secondary"
            to={`/characters/${character.id}/chat`}
          >
            Trò chuyện
          </Link>
          <Link
            className="btn ghost"
            to={`/characters/${character.id}/challenge`}
          >
            Làm thử thách
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Collection() {
  const { data: deck = [] } = useDeck();
  const matches = useAppStore((s) => s.matches);
  const completed = useAppStore((s) => s.completed);
  const [sort, setSort] = useState<SortKey>("recent");
  const [open, setOpen] = useState(false);

  const matched = deck
    .filter((character) => matches.includes(character.id))
    .map((character) => ({
      character,
      matchedAt: matches.indexOf(character.id),
      progress: progressPercent(completed[character.id]),
    }))
    .sort((a, b) => {
      if (sort === "progress") return b.progress - a.progress;
      return b.matchedAt - a.matchedAt;
    });

  return (
    <section className="page reference-collection">
      <div className="collection-head">
        <div>
          <h1 className="headline-lg">Vòng tròn văn chương</h1>
          <p className="lead">
            Những nhân vật bạn đã khám phá trong hành trình học tập.
          </p>
        </div>
        <div className="sort-control">
          <span>Sắp xếp:</span>
          <div className="sort-menu">
            <button
              type="button"
              className="btn ghost"
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {SORT_LABEL[sort]}{" "}
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>
            {open && (
              <ul role="listbox" className="sort-options">
                {(Object.keys(SORT_LABEL) as SortKey[]).map((key) => (
                  <li key={key}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={sort === key}
                      className={sort === key ? "active" : ""}
                      onClick={() => {
                        setSort(key);
                        setOpen(false);
                      }}
                    >
                      {SORT_LABEL[key]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {matched.length ? (
        <div className="grid collection-grid">
          {matched.map(({ character }) => (
            <CollectionCard
              key={character.id}
              character={character}
              result={completed[character.id]}
            />
          ))}
        </div>
      ) : (
        <div className="card empty-state">
          <h2>Chưa có nhân vật nào</h2>
          <p className="lead">
            Hãy vào Khám phá và chọn một nhân vật để mở trò chuyện.
          </p>
          <Link className="btn primary" to="/discover">
            Đi khám phá
          </Link>
        </div>
      )}
    </section>
  );
}
