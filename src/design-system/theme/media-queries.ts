export const maxWidth = {
  small: 540,
  medium: 720,
  large: 960,
  xlarge: 1140,
  xxlarge: 1320,
}

export const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
  xxlarge: 1400,
};

export const mediaQuery = {
  small: `@media (min-width: ${breakpoints.small}px)`,
  medium: `@media (min-width: ${breakpoints.medium}px)`,
  large: `@media (min-width: ${breakpoints.large}px)`,
  xlarge: `@media (min-width: ${breakpoints.xlarge}px)`,
  xxlarge: `@media (min-width: ${breakpoints.xxlarge}px)`,
};
