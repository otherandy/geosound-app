"use client";

import dynamic from "next/dynamic";

const DataMap = dynamic(() => import("@/components/maps/data-map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const FormMap = dynamic(() => import("@/components/maps/form-map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export { DataMap, FormMap };
