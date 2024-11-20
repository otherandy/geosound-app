"use client";

import dynamic from "next/dynamic";

const AudioDataGlobe = dynamic(() => import("@/components/globe/data-globe"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default AudioDataGlobe;
