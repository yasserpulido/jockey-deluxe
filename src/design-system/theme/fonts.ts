export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: "normal",
  semibold: 600,
  bold: "bold",
  extrabold: 800,
  black: 900,
} as const;

export const fontFamily =
  '"Proxima Nova", "proxima-nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' as const;

//   export const fontSize = {
//     small: rem(12),
//     medium: rem(14),
//     large: rem(16),
//     titleSmall: rem(18),
//     titleMedium: rem(20),
//     titleLarge: rem(24),
//   } as const

//   export function typographyCSS(
//     size: keyof typeof fontSize = "medium",
//     weight: keyof typeof fontWeight = "normal"
//   ) {
//     return {
//       fontWeight: fontWeight[weight],
//       fontSize: fontSize[size],
//       fontFamily,
//     }
//   }
