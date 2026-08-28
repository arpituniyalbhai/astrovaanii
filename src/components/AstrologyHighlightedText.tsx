import { Fragment, type ReactNode } from "react";

type HighlightCategory = "timing" | "career" | "relationship" | "planet" | "house" | "confidence";

type HighlightRule = {
  category: HighlightCategory;
  pattern: RegExp;
};

const HIGHLIGHT_RULES: HighlightRule[] = [
  {
    category: "timing",
    pattern: /\b(?:19|20|21)\d{2}\b/gi,
  },
  {
    category: "house",
    pattern:
      /\b(?:house\s*(?:1[0-2]|[1-9])|(?:1st|2nd|3rd|4th|5th|6th|7th|8th|9th|10th|11th|12th|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth)\s+house|lagna|ascendant)\b/gi,
  },
  {
    category: "planet",
    pattern:
      /\b(?:sun|surya|moon|chandra|mars|mangal|mercury|budh|jupiter|guru|brihaspati|venus|shukra|saturn|shani|rahu|ketu)\b|(?:सूर्य|चन्द्र|चंद्र|मंगल|बुध|गुरु|बृहस्पति|शुक्र|शनि|राहु|केतु)/gi,
  },
  {
    category: "career",
    pattern:
      /\b(?:job|jobs|career|careers|work|workplace|profession|professional|employment|business|startup|promotion|salary|income|interview|office|occupation)\b/gi,
  },
  {
    category: "relationship",
    pattern:
      /\b(?:marriage|married|marry|wedding|soulmate|spouse|partner|partnership|relationship|relationships|love|romance|romantic|engagement|commitment|divorce|husband|wife)\b/gi,
  },
  {
    category: "confidence",
    pattern:
      /\b(?:confidence|confident|confidently|certainty|certain|certainly|confirmed|confirmation|likely|strongly|strong|high\s+probability|high\s+confidence)\b/gi,
  },
];

type TextMatch = {
  start: number;
  end: number;
  category: HighlightCategory;
};

function findHighlights(text: string): TextMatch[] {
  const candidates: TextMatch[] = [];

  for (const rule of HIGHLIGHT_RULES) {
    const pattern = new RegExp(rule.pattern.source, rule.pattern.flags);
    for (const match of text.matchAll(pattern)) {
      if (match.index === undefined || !match[0]) continue;
      candidates.push({
        start: match.index,
        end: match.index + match[0].length,
        category: rule.category,
      });
    }
  }

  candidates.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));

  const matches: TextMatch[] = [];
  let cursor = 0;
  for (const candidate of candidates) {
    if (candidate.start < cursor) continue;
    matches.push(candidate);
    cursor = candidate.end;
  }

  return matches;
}

export function AstrologyHighlightedText({ text }: { text: string }) {
  const matches = findHighlights(text);
  if (matches.length === 0) return <>{text}</>;

  const content: ReactNode[] = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    if (match.start > cursor) {
      content.push(<Fragment key={`text-${cursor}`}>{text.slice(cursor, match.start)}</Fragment>);
    }

    content.push(
      <mark
        key={`highlight-${match.start}-${index}`}
        data-highlight={match.category}
        className="box-decoration-clone rounded-md bg-primary/10 px-1 py-0.5 font-semibold text-primary"
      >
        {text.slice(match.start, match.end)}
      </mark>,
    );
    cursor = match.end;
  });

  if (cursor < text.length) {
    content.push(<Fragment key={`text-${cursor}`}>{text.slice(cursor)}</Fragment>);
  }

  return <>{content}</>;
}
