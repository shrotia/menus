import { createOptimizedPicture } from "../../scripts/lib-franklin.js";

// Map to hold Elements having templates placeholders
export const placeholders = new Map();

function appendPlaceholderVariablesForMeals(
    mealPricesParentElement,
    mealOptionNumber
) {
    placeholders.set(mealOptionNumber + ":main", mealPricesParentElement);

    if (mealPricesParentElement.children.length < 3) {
        const firstVariantPrice = document.createElement("p");
        firstVariantPrice.className = "variant1-price";
        firstVariantPrice.style.display = "none";
        mealPricesParentElement.append(firstVariantPrice);
        placeholders.set(mealOptionNumber + ":variant1-price", firstVariantPrice);
    }

    if (mealPricesParentElement.children.length < 4) {
        const secondVariantPrice = document.createElement("p");
        secondVariantPrice.className = "variant2-price";
        secondVariantPrice.style.display = "none";
        mealPricesParentElement.append(secondVariantPrice);
        placeholders.set(mealOptionNumber + ":variant2-price", secondVariantPrice);
    }
}

export default function decorate(block) {
    /* change to ul, li */
    const ul = document.createElement("ul");
    [...block.children].forEach((row) => {
        const li = document.createElement("li");
        li.innerHTML = row.innerHTML;
        [...li.children].forEach((div) => {
            if (div.children.length === 1 && div.querySelector("picture"))
                div.className = "burger-cards-card-image";
            else div.className = "burger-cards-card-body";
        });
        ul.append(li);

        // burger card special layout
        const leftFirstElement = li.children[0];
        const rightFirstElement = li.children[1];
        const rightSecondElement = li.children[2];

        appendPlaceholderVariablesForMeals(rightSecondElement, ul.children.length);

        const leftSection = document.createElement("div");
        leftSection.className = "burger-cards-left-section";
        li.append(leftSection);

        const rightSection = document.createElement("div");
        rightSection.className = "burger-cards-right-section";
        li.append(rightSection);

        leftSection.append(leftFirstElement);
        rightSection.append(rightFirstElement);
        rightSection.append(rightSecondElement);
    });
    ul.querySelectorAll("img").forEach((img) =>
        img
            .closest("picture")
            .replaceWith(
                createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
            )
    );
    block.textContent = "";
    block.append(ul);
}