import type { Character } from "@/types";
import { Card } from "@/components/ui/card";

interface Props {
  character: Character;
}

export function CharacterCard({ character }: Props) {
  return (
    <Card className="overflow-hidden p-0">
      {/* Art / image section */}
      {character.image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-3 top-3 rounded bg-ink/80 px-2 py-0.5 text-label-md text-white">
            Kinh điển
          </span>
        </div>
      ) : (
        <div
          className="art-gradient relative aspect-[4/3] p-6 text-white"
          style={
            {
              "--art-a": character.artA,
              "--art-b": character.artB,
            } as React.CSSProperties
          }
        >
          <span className="absolute left-3 top-3 rounded bg-black/30 px-2 py-0.5 text-label-md">
            Kinh điển
          </span>
          <div className="mt-auto">
            <strong className="text-headline-md">{character.artTitle}</strong>
            <p className="mt-1 text-body-sm opacity-80">{character.imageBrief}</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-4 p-6">
        <div>
          <h2 className="font-serif text-headline-lg">{character.name}</h2>
          <p className="text-body-sm text-ink-muted">
            {character.work} &middot; {character.author}
          </p>
        </div>

        <blockquote className="border-l-2 border-[var(--cinnabar)] pl-4 font-serif text-body-md italic text-ink-muted">
          &ldquo;{character.quote}&rdquo;
        </blockquote>

        <p className="text-body-md">{character.bio}</p>

        {/* Conflict tile */}
        <div className="rounded-lg bg-surface-container-low p-4">
          <span className="kicker">Xung đột</span>
          <p className="mt-1 text-body-sm font-medium">
            {character.conflict.split(";")[0]}
          </p>
        </div>

        {/* Trait chips */}
        <div className="flex flex-wrap gap-2">
          {character.personality
            .split(",")
            .slice(0, 3)
            .map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-jade-container px-3 py-1 text-label-md text-jade"
              >
                {trait.trim()}
              </span>
            ))}
        </div>
      </div>
    </Card>
  );
}
