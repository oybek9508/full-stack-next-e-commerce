import React from "react";
import AyahList from "./AyahList";
import AyahItem from "./AyayItem";
// import { useSingleChapterTranslation } from "src/api/quran-translation";

const Translation = ({ singleChapterTranslation, uthmaniScripts }) => {
  return (
    <div>
      <AyahList
        singleChapterTranslation={singleChapterTranslation}
        uthmaniScripts={uthmaniScripts}
      />
    </div>
  );
};

export default Translation;
