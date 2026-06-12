RotatingTagline — the animated brand headline. A fixed `prefix` then a `phrases[]` that types/holds/deletes/advances; the rotating phrase carries the flowing geek-rainbow gradient and a trailing block cursor that blinks only at rest.

**Where it lives:** the auth brand panel (`聊天，` + `breakAfterPrefix` over `构建万物 / 生成万物 / 设计万物 / 学习万物`) and the marketing hero.

**Sizing:** font-size/weight/family are inherited — wrap it in a styled container (e.g. a display headline) rather than setting type on the component. The gradient clips to whatever glyphs render, so any size works.

**Rules:** gradient lives only on the rotating phrase — keep the prefix and cursor monochrome (`--text-body`). Honor reduced-motion (it self-handles: whole-phrase swap, no flow). Don't recolor the cursor with a hue. One tagline per viewport region.
