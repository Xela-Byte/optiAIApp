import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const EyeIcon = (props: SvgProps) => (
  <Svg width={28} height={26} viewBox="0 0 28 26" fill="none" {...props}>
    <G clipPath="url(#clip0_406_2780)" filter="url(#filter0_d_406_2780)">
      <Path
        d="M23 9C20.6 11.667 17.6 13 14 13C10.4 13 7.4 11.667 5 9"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 14.9992L7.5 11.1992"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.9998 14.9752L20.5078 11.1992"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 17L11.5 13"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 17L16.5 13"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_406_2780">
        <Rect width={24} height={24} fill="white" transform="translate(2)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EyeIcon;
