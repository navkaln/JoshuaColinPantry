# Placeholder inventory

Every placeholder carries `data-placeholder` in the HTML and, in the private preview, a visible "Placeholder" tag. Replacing a field or photo in Sanity removes its tag automatically. To replace without Sanity, edit `src/data/defaults.ts` (set `ph: false` via `real(...)`) or overwrite the file in `src/assets/placeholders/`.

## Photos (all Unsplash License: free to use, attribution not required; credit recorded here anyway)

| Slot | File | Pages | Photographer / source | Will be replaced by |
| --- | --- | --- | --- | --- |
| `facade` | `src/assets/placeholders/facade.jpg` | Home (hero), The Building | Avi Werde. [photo](https://unsplash.com/photos/art-deco-architecture-in-miami-beach-SddCuFwXYQc). Shows a real Miami hotel with its name sign visible. Swap soon. | Photo of the Griswold Hall facade |
| `lobby` | `lobby.jpg` | The Building | Liam Dawson. [photo](https://unsplash.com/photos/an-empty-lobby-with-wooden-benches-and-windows-s-VBt3avoTY) | Photo of the lobby |
| `gardens` | `gardens.jpg` | Amenities | Emir Kutluay. [photo](https://unsplash.com/photos/a-formal-garden-with-a-fountain-and-ivy-covered-wall-_8mq_AcL2WQ). A tiny distant figure is visible, not identifiable. | Photo of the rear garden |
| `dog-run` | `dog-run.jpg` | Amenities | Judy Beth Morris. [photo](https://unsplash.com/photos/three-dogs-running-in-the-grass-near-a-fence-LE9DJNCrU6s) | Photo of the dog run |
| `playroom` | `playroom.jpg` | Amenities | ASR Design Studio. [photo](https://unsplash.com/photos/a-childs-room-with-a-bookcase-and-toys-3mtds3PygEw) | Photo of the playroom |

License was read from each photo's Unsplash page when downloaded (2026-11-09). No photo shows an identifiable person.

## Latin text blocks

| Field | Page | Will be replaced by |
| --- | --- | --- |
| `introMore` | Home | Board-approved sentence(s) about the community |
| `historyMore` | The Building | Short history beyond the confirmed facts |
| `character` | The Building | Description of the building's Art Deco details |
| `intro` | Amenities | Introduction to shared spaces |
| `staffMore`, `playroomMore`, `gardenMore`, `dogRunMore` | Amenities | One or two approved sentences per amenity (no dog run rules or hours until approved) |
| `intro` | Contact | Welcome and what to expect after sending a message |

## Non-content stand-ins

- Contact form handler: local stub only (nothing sent). Replace when the recipient address exists.
- Map: link to an OpenStreetMap address search, not an embedded map.
