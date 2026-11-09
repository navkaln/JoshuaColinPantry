import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes, singletonTypes } from './schemaTypes/index.js';

// Fill these in once the Sanity project exists (see EDITING.md / README.md).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'griswold-hall',
  title: 'Griswold Hall',
  projectId,
  dataset,
  plugins: [
    structureTool({
      // One entry per page, no "create new" lists: editors just open a page.
      structure: (S) =>
        S.list().title('Pages').items(
          singletonTypes.map(({ name, title }) =>
            S.listItem().title(title).id(name).child(S.document().schemaType(name).documentId(name))
          )
        ),
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    actions: (prev, { schemaType }) =>
      singletonTypes.some((t) => t.name === schemaType) ? prev.filter((a) => a.action !== 'duplicate' && a.action !== 'delete') : prev,
    newDocumentOptions: () => [],
  },
});
