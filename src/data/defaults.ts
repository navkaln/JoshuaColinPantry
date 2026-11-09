// Built-in default content. Sanity values (if configured) override these.
// RULE: only facts from SPEC section 4 appear as real copy. Everything else is Latin placeholder (ph: true).
// Editing a field in Sanity replaces the default and removes its placeholder tag.

export type TextField = { v: string; ph: boolean };
export type ImageField = { slot: string; alt: string };
export type PageDef = { sanityType: string; text: Record<string, TextField>; images: Record<string, ImageField> };

const L = {
  short: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  mid: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  long: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
};
const real = (v: string): TextField => ({ v, ph: false });
const latin = (v: string): TextField => ({ v, ph: true });
const stand = (what: string) => `Placeholder stock photo standing in for a future photo of ${what}.`;

export const pages: Record<string, PageDef> = {
  home: {
    sanityType: 'homePage',
    text: {
      intro: real('Griswold Hall is a cooperative apartment building at 86-10 34th Avenue in Jackson Heights, Queens. Built in 1937, it is a six-story prewar elevator building in an Art Deco style.'),
      introMore: latin(L.short),
    },
    images: { heroImage: { slot: 'facade', alt: stand('the Griswold Hall facade') + ' It shows an unrelated Art Deco building.' } },
  },
  building: {
    sanityType: 'buildingPage',
    text: {
      history: real('Griswold Hall was built in 1937 as a six-story elevator building in an Art Deco style. It stands at the corner of 86th Street and 34th Avenue, near the English Garden Homes.'),
      historyMore: latin(L.mid),
      character: latin(L.long),
    },
    images: {
      facadeImage: { slot: 'facade', alt: stand('the Griswold Hall facade') + ' It shows an unrelated Art Deco building.' },
      lobbyImage: { slot: 'lobby', alt: stand('the Griswold Hall lobby') + ' It shows an unrelated interior staircase.' },
    },
  },
  amenities: {
    sanityType: 'amenitiesPage',
    text: {
      intro: latin(L.short),
      staffBody: real('Griswold Hall has a live-in super and a full-time porter.'),
      staffMore: latin(L.short),
      playroomBody: real('Griswold Hall has a children’s playroom.'),
      playroomMore: latin(L.short),
      gardenBody: real('Griswold Hall has a landscaped rear garden.'),
      gardenMore: latin(L.short),
      dogRunBody: real('Griswold Hall has a dog run.'),
      dogRunMore: latin(L.short),
    },
    images: {
      gardensImage: { slot: 'gardens', alt: stand('the Griswold Hall rear garden') + ' It shows an unrelated garden courtyard.' },
      dogRunImage: { slot: 'dog-run', alt: stand('the Griswold Hall dog run') + ' It shows dogs running on grass beside a fence.' },
      playroomImage: { slot: 'playroom', alt: stand('the Griswold Hall playroom') + ' It shows an unrelated child’s room with shelves and toys.' },
    },
  },
  contact: {
    sanityType: 'contactPage',
    text: { intro: latin(L.short) },
    images: {},
  },
};

export const FACTS = {
  name: 'Griswold Hall',
  address: ['86-10 34th Avenue', 'Jackson Heights, Queens, NY 11372'],
  addressOneLine: '86-10 34th Avenue, Jackson Heights, Queens, NY 11372',
  corner: 'At the corner of 86th Street and 34th Avenue',
  mapUrl: 'https://www.openstreetmap.org/search?query=' + encodeURIComponent('86-10 34th Avenue, Jackson Heights, NY 11372'),
};

// Draft-only copy. Rendered only when SHOW_UNVERIFIED=true, always with a "Draft" label.
export const UNVERIFIED = {
  landmark: 'Griswold Hall may fall inside the Jackson Heights Historic District. Public sources disagree on this point, so it is not yet stated as fact.',
  solar: 'A public source describes a 140-panel solar system installed in 2021 alongside a roof project. That source does not name the building, so it is not yet known to refer to Griswold Hall.',
};

export const PHOTO_CREDITS: Record<string, { by: string; page: string }> = {
  facade: { by: 'Avi Werde', page: 'https://unsplash.com/photos/art-deco-architecture-in-miami-beach-SddCuFwXYQc' },
  lobby: { by: 'Liam Dawson', page: 'https://unsplash.com/photos/an-empty-lobby-with-wooden-benches-and-windows-s-VBt3avoTY' },
  gardens: { by: 'Emir Kutluay', page: 'https://unsplash.com/photos/a-formal-garden-with-a-fountain-and-ivy-covered-wall-_8mq_AcL2WQ' },
  'dog-run': { by: 'Judy Beth Morris', page: 'https://unsplash.com/photos/three-dogs-running-in-the-grass-near-a-fence-LE9DJNCrU6s' },
  playroom: { by: 'ASR Design Studio', page: 'https://unsplash.com/photos/a-childs-room-with-a-bookcase-and-toys-3mtds3PygEw' },
};
