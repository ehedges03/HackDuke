import { createRef, useState } from "react";
import ReactTags from "react-tag-autocomplete";

export default function ChipsAutocomplete(this: any) {
  const [suggestions, setSuggestions] = useState([
    { id: 1, symptom: "Cough" },
    { id: 2, symptom: "Fever" },
    { id: 3, symptom: "Sneeze" },
    { id: 4, symptom: "Chills" },
  ]);

  const [tags, setTags] = useState([
    { id: 1, symptom: "Cough" },
    { id: 2, symptom: "Fever" },
  ]);

  const reactTags = createRef();

  // didn't finis this but here was what i was looking at if u wanna take a look:
  // https://www.npmjs.com/package/react-tag-autocomplete
  // wasn't using this but there's this too: https://www.npmjs.com/package/react-tag-input
}
