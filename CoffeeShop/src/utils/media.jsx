import { css } from "styled-components";
import { breakpoints} from "./breakpoints"

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${breakpoints.mobile}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: ${breakpoints.tablet}) {
      ${css(...args)}
    }
  `,
  laptop: (...args) => css`
    @media (max-width: ${breakpoints.laptop}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (max-width: ${breakpoints.desktop}) {
      ${css(...args)}
    }
  `,
  wideScreen: (...args) => css`
    @media (max-width: ${breakpoints.wideScreen}) {
      ${css(...args)}
    }
  `,
};