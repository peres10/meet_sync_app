export const getColorFromImage = (imageName) => {
    const colorMapping = {
      "AXOLOTL": "#AA8DB0",
      "BEAR": "#C22022",
      "CAT": "#D90E11",
      "DOG": "#EC6022",
      "EAGLE": "#819EBD",
      "FLAMINGO": "#E18E93",
      "FOX": "#EBC633",
      "FOX2": "#E5BE30",
      "FOX3": "#E27222",
      "HEDGEHOG": "#349254",
      "KOALA": "#787675",
      "LLAMA": "#D55D7F",
      "OTTER": "#2B3F5F",
      "OWL": "#3E8BB5",
      "OWL2": "#260D1A",
      "PENGUIN": "#428FB2",
      "PUFFIN": "#E67203",
      "RABBIT": "#DC5673",
      "RACCOON": "#8B8987",
      "RED_PANDA": "#D6541C",
      "REINDEER": "#8D50A9",
      "SEAL": "#57B245",
      "SLOTH": "#94C488",
      "WALRUS": "#3B9795",
    };
  
    return colorMapping[imageName] || "#000"; // Default color if no match is found
  };
  