const POS_ENDPOINT = "/screens/restaurants/values.json";

import { placeholders } from "../blocks/burgercards/burgercards.js";
import { offerPlaceholders } from "../blocks/burgerfooter/burgerfooter.js";

/**
 * todo: this needs to be revisited - current iteration based implementation is not performant
 * This method will replace the placeholders (i.e.variables) with respective prices
 * and unhide the Menu item
 * @param elements
 * @param beveragesCoffeeEntries
 */
function processPriceSection(menuJsonPayload) {
    for (const {
        Item,
        "Variant 1 [Price | Calories]": variant1Price,
        "Variant 2 [Price | Calories]": variant2Price,
        "Out Of Stock": oufOfStock,
    } of menuJsonPayload.breakfastPrices.data) {
        if (
            oufOfStock.trim().toLowerCase() === "true" ||
            oufOfStock.trim().toLowerCase() === "yes"
        ) {
            const mealOptionElement = placeholders.get(Item + ":main");
            mealOptionElement.classList.add("out-of-stock");
        }

        const variant1PriceElement = placeholders.get(Item + ":variant1-price");
        const variant2PriceElement = placeholders.get(Item + ":variant2-price");

        if (variant1PriceElement) {
            variant1PriceElement.textContent = variant1Price;
            variant1PriceElement.style.display = "";
        }

        if (variant2PriceElement) {
            variant2PriceElement.textContent = variant2Price;
            variant2PriceElement.style.display = "";
        }
    }
}

function processOfferSection(menuJsonPayload) {
    for (const { Offer: offer, Enabled: isEnabled } of menuJsonPayload
        .breakfastOffers.data) {
        const offerElement = offerPlaceholders.get("offer");
        const defaultElement = offerPlaceholders.get("default");

        if (
            offer.indexOf("Special Offer") >= 0 &&
            (isEnabled.trim().toLowerCase() === "yes" ||
                isEnabled.trim().toLowerCase() === "true")
        ) {
            defaultElement.style.display = "none";
            offerElement.style.display = "";
        }
    }
}

/**
 * parse value JSON and mutate Menu HTML content
 * @param elements
 * @returns {Promise<void>}
 */
export async function populateValuesContent(document) {
    fetch(POS_ENDPOINT)
        .then((response) => response.json())
        .then((menu) => {
            processPriceSection(menu);
            processOfferSection(menu);
        })
        .catch((error) => {
            // Handle any errors that occurred during the HTTP request
            console.log(error);
        });
}