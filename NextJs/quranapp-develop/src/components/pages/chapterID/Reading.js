import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "/src/api/api";
import { useSingleSurah } from "/src/api/quran-chapter-api";
import Header from "/src/components/Header";
import { Box, Grid, Typography } from "@mui/material";
import { useUthmaniScript, useUthmaniTajweedScript } from "/src/api/quran-api";
import { useChaperAudioForEachAyah } from "/src/api/quran-audio-api";
import Order from "/src/components/ayah/Order";
import SingleAyahPlayer from "/src/components/audio/SingleAyahPlayer";
import ReadingPreferenceTab from "./ReadingPreferenceTab";

const Reading = ({ uthmaniScripts }) => {
  //   const router = useRouter();
  //   const { chapterId } = router.query;
  const [currentVerse, setCurrentVerse] = useState({ meta: {}, verses: [] });
  //   const { data, error } = useSingleSurah(chapterId);
  //   const { data: uthmaniScripts } = useUthmaniScript({
  //     chapter_number: chapterId,
  //   });
  //   const { data: uthmaniTajweedScripts } = useUthmaniTajweedScript();
  //   const { data: audioData } = useChaperAudioForEachAyah(6, 2);

  //   const currAyah = audioData?.audio_files.filter((audio) => {
  //     return (
  //       audio?.verse_key.substr(0, audio?.verse_key.indexOf(":")) ===
  //       router.query.id
  //     );
  //   });

  useEffect(() => {
    if (!uthmaniScripts) return;
    setCurrentVerse(uthmaniScripts);
  }, []);

  return (
    <Grid sx={{ px: 3, mt: 4 }}>
      {/* <Banner data={data} /> */}
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <span style={{ wordBreak: "break-all" }}>
          {currentVerse?.verses?.map((verse, idx) => (
            <Typography
              variant="span"
              key={verse?.verse_key}
              onClick={() => {
                console.log(
                  "audioData?.audio_files?[idx]",
                  audioData?.audio_files[idx].url
                );
              }}
            >
              {/* <SingleAyahPlayer src={audioData?.audio_files[idx]?.url} /> */}
              <Typography
                variant="span"
                key={verse?.verse_key}
                style={{ fontSize: "36px", fontFamily: "IndoPak" }}
              >
                {verse?.text_uthmani}
              </Typography>
              <span>
                <Order number={verse?.verse_key.split(":").pop()} />
              </span>
            </Typography>
          ))}
        </span>
      </Box>
    </Grid>
  );
};

export default Reading;
