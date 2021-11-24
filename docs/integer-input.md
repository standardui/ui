# Integer Input

[Back to readme](/README.md)

A modified number input that only accepts whole (int) numbers, a common annoyance of the standard input type=number is that it allows characters such as e, +-, etc, while this is handled in the validations, many developers prefer to not accept invalid inputs in the first place.

- Key: `INTEGER_INPUT`
- Component: `{namespace}-integer-input`

## FAQs / Guides

<details>
  <summary>How do I hide the up/down arrows</summary>

    Add the attribute hideArrows to the component.
</details>

## CSS Variables

|Element|Property|Variable|Default|Scopes|
|-|-|-|-|-|
|html|`font-size`|`--html-font-size`|`16px`|all|
|.wrapper|`border`|`--integer-input-wrapper-border`|`none`|all|
|.wrapper|`outline`|`--integer-input-wrapper-outline`|`none`|`focus`, `focus-within`|
|input|`border`|`--integer-input-border`|`none`|all|
|input|`color`|`--integer-input-color`|`initial`|all|
|input|`font-size`|`--integer-input-font-size`|`1rem`|all|
|input|`outline`|`--integer-input-outline`|`none`|`focus`, `focus-within`|
