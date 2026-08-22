import assert from 'node:assert/strict';
import test from 'node:test';

import { careerFacts, skillFacts } from './profile';
import { careerTimeline, expertiseGroups } from './career';
import { cvExperience, cvSkillGroups } from './cv';

const canonicalSkills = new Set(Object.values(skillFacts).flat());

function skillsFrom(groups: readonly { items: readonly string[] }[]) {
  return new Set(groups.flatMap((group) => group.items));
}

test('homepage and CV career views use the canonical career facts', () => {
  assert.deepEqual(careerTimeline, careerFacts);
  assert.deepEqual(cvExperience, careerFacts);
  assert.deepEqual(
    careerTimeline.map(({ period, company, role }) => ({ period, company, role })),
    cvExperience.map(({ period, company, role }) => ({ period, company, role })),
  );
});

test('homepage and CV skill adapters cover the canonical skill facts', () => {
  assert.deepEqual(skillsFrom(expertiseGroups), canonicalSkills);
  assert.deepEqual(skillsFrom(cvSkillGroups), canonicalSkills);
});
