import { test } from "node:test";
import assert from "node:assert/strict";
import { brand, derivePalettes } from "@/brand";
import tokens from "../brand/brand.json";

test("the product is Tallyroom", () => {
  assert.equal(brand.productName, "Tallyroom");
  assert.equal(tokens.product_name, "Tallyroom");
});

test("the brand colour is #5b3fa8, light and dark derived from it", () => {
  assert.equal(brand.primaryColor, "#5b3fa8");
  const { light, dark } = derivePalettes(brand.primaryColor);
  assert.equal(light.primary, "256 45% 45%");
  assert.equal(dark.primary, "256 45% 60%");
});
