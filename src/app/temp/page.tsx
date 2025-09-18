"use client";

import React, { useRef, useEffect } from "react";

const AutoScrollOppositeDirection = () => {
  const scrollRefLeft = useRef<HTMLDivElement | null>(null);
  const scrollRefRight = useRef<HTMLDivElement | null>(null);

  const speed = 1;
  const delay = 20;

  const items = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      style={{
        display: "inline-block",
        width: 200,
        height: 100,
        lineHeight: "100px",
        textAlign: "center",
        background: i % 2 === 0 ? "#eee" : "#ddd",
        marginRight: 10,
      }}
    >
      Item {i + 1}
    </div>
  ));

  useEffect(() => {
    const left = scrollRefLeft.current;
    const right = scrollRefRight.current;

    const intervalLeft = setInterval(() => {
      if (!left) return;

      // Scroll ke kiri
      left.scrollLeft -= speed;

      // Reset saat sudah lewat separuh (duplikasi konten)
      if (left.scrollLeft <= 0) {
        left.scrollLeft = left.scrollWidth / 2;
      }
    }, delay);

    const intervalRight = setInterval(() => {
      if (!right) return;

      // Scroll ke kanan
      right.scrollLeft += speed;

      // Reset saat sudah lewat separuh
      if (right.scrollLeft >= right.scrollWidth / 2) {
        right.scrollLeft = 0;
      }
    }, delay);

    return () => {
      clearInterval(intervalLeft);
      clearInterval(intervalRight);
    };
  }, []);

  return (
    <div className="overflow-hidden mt-20 p-8 flex flex-col gap-6">
      {/* Scroll ke kiri */}
      <div
        ref={scrollRefLeft}
        className="overflow-x-hidden border border-gray-400 w-full whitespace-nowrap"
        style={{ whiteSpace: "nowrap" }}
      >
        {items}
        {items}
      </div>

      {/* Scroll ke kanan */}
      <div
        ref={scrollRefRight}
        className="overflow-x-hidden border border-gray-400 w-full whitespace-nowrap"
        style={{ whiteSpace: "nowrap" }}
      >
        {items}
        {items}
      </div>
    </div>
  );
};

export default AutoScrollOppositeDirection;
