// TAL-14: the Browse group card shows the group's tagline only when the
// group actually has one. GroupCard's `group` prop now accepts `tagline`,
// and a truthy-guarded paragraph renders it between the title and the
// description, so null and "" both render nothing.

import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GroupCard } from "@/app/(main)/dashboard/group-card";

function renderGroupCard(tagline: string | null) {
  return renderToStaticMarkup(
    createElement(GroupCard, {
      group: {
        id: 1,
        bannerId: null,
        name: "Browse card group",
        description: "browse card tagline render",
        tagline,
      },
      buttonText: "View",
      memberCount: "3",
    })
  );
}

test("a group with a tagline shows it on its card", () => {
  const html = renderGroupCard("UNIQUE-TAGLINE-12345");
  assert.ok(html.includes("UNIQUE-TAGLINE-12345"));
});

test("a group with a null tagline shows no tagline line", () => {
  const html = renderGroupCard(null);
  assert.ok(!html.includes("UNIQUE-TAGLINE-12345"));
});

test("a group with an empty tagline shows no tagline line", () => {
  const html = renderGroupCard("");
  assert.ok(!html.includes("UNIQUE-TAGLINE-12345"));
});
