import React from "react";
import AyahItem from "../AyayItem";

const AyahList = (uthmaniScripts, singleChapterTranslation) => {
  console.log("uthmaniScripts", uthmaniScripts);
  console.log("singleChapterTranslation", singleChapterTranslation);
  return (
    <div>
      {singleChapterTranslation?.translations?.map((chapter) => (
        <AyahItem key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
};

export default AyahList;
