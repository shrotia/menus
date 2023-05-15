import { createOptimizedPicture } from "../../scripts/lib-franklin.js";

// Map to hold Elements having templates placeholders
export const offerPlaceholders = new Map();

export default function decorate(block) {
  [...block.children].forEach((row, index) => {
    if (index === 2) {
      row.className = "breakfast-menu-offer";
      row.style.display = "none";
      offerPlaceholders.set("offer", row);
    }

    if (index === 3) {
      row.className = "breakfast-menu-offer-replacement";
      offerPlaceholders.set("default", row);
    }
  });
  block
    .querySelectorAll("img")
    .forEach((img) =>
      img
        .closest("picture")
        .replaceWith(
          createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
        )
    );
}
