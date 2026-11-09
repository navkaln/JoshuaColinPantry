import { defineType, defineField } from 'sanity';

// Field names MUST match src/data/defaults.ts. Only fields the pages use are exposed.
const text = (name, title, description) =>
  defineField({ name, title, type: 'text', rows: 4, description: description || 'Leave empty to keep the placeholder text.' });
const image = (name, title) => [
  defineField({ name, title, type: 'image', options: { hotspot: true }, description: 'Leave empty to keep the placeholder photo.' }),
  defineField({
    name: `${name}Alt`,
    title: `${title}: alt text`,
    type: 'string',
    description: 'Describe the photo for people who cannot see it. Required if you add a photo.',
    hidden: ({ parent }) => !parent?.[name],
    validation: (r) => r.custom((v, ctx) => (ctx.document?.[name] && !v ? 'Add alt text for this photo' : true)),
  }),
];
const page = (name, title, fields) => defineType({ name, title, type: 'document', fields });

export const singletonTypes = [
  { name: 'homePage', title: 'Home' },
  { name: 'buildingPage', title: 'The Building' },
  { name: 'amenitiesPage', title: 'Amenities' },
  { name: 'contactPage', title: 'Contact' },
];

export const schemaTypes = [
  page('homePage', 'Home', [
    ...image('heroImage', 'Top photo'),
    text('intro', 'Intro paragraph'), text('introMore', 'Intro paragraph, second part'),
  ]),
  page('buildingPage', 'The Building', [
    text('history', 'History'), text('historyMore', 'History, second part'), text('character', 'Art Deco character'),
    ...image('facadeImage', 'Facade photo'), ...image('lobbyImage', 'Lobby photo'),
  ]),
  page('amenitiesPage', 'Amenities', [
    text('intro', 'Introduction'),
    text('staffBody', 'Live-in super and porter'), text('staffMore', 'Live-in super and porter, more'),
    text('playroomBody', 'Children’s playroom'), text('playroomMore', 'Children’s playroom, more'), ...image('playroomImage', 'Playroom photo'),
    text('gardenBody', 'Landscaped rear garden'), text('gardenMore', 'Landscaped rear garden, more'), ...image('gardensImage', 'Garden photo'),
    text('dogRunBody', 'Dog run'), text('dogRunMore', 'Dog run, more'), ...image('dogRunImage', 'Dog run photo'),
  ]),
  page('contactPage', 'Contact', [text('intro', 'Introduction')]),
];
