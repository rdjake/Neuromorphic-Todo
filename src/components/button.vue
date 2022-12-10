<script lang="ts">
import { ExtractPropTypes, h, PropType } from "vue";
import { defineFunctionalComponent } from "@/utils/render";

type IconType = "text" | "moon" | "sun" | "plus" | "close" | "handle";

//TailWind не компилирует эти классы с использованием интерполяции
const boxSizes = {
   "8": "w-8 h-8",
   "12": "w-12 h-12",
};
const buttonShadows = {
   "8": "shadow-neuro8",
   "12": "shadow-neuro12",
};
const activeButtonShadows = {
   "8": "active:shadow-neuro8Inset",
   "12": "active:shadow-neuro12Inset",
};

const ButtonComponentProps = {
   iconType: {
      type: String as PropType<IconType>,
      default: "text" as IconType,
   },
   text: { type: String, default: "" },
   size: {
      type: String as PropType<keyof typeof buttonShadows>,
      default: "8" as const,
   },
   flat: Boolean,
   faded: Boolean,
};

const ButtonComponent = defineFunctionalComponent(
   ButtonComponentProps,
   (props,  attrs ) =>
      h(
         "button",
         {
            class: [
               boxSizes[props.size],
               "rounded-full text-2xl",
               props.flat || buttonShadows[props.size],
               activeButtonShadows[props.size],
               props.faded ? "text-textBlueFaded" : "text-textBlue",
            ],
            ...attrs,
         },
         [mapButtonIcons(props) ?? props.text]
      )
);

const mapButtonIcons = (
   props: ExtractPropTypes<typeof ButtonComponentProps>
) => {
   switch (props.iconType) {
      case "plus":
         return "+";
      case "handle":
         return "≡";
      case "close":
         return "×";
      case "moon":
         return h(
            "svg",
            {
               viewBox: "0 0 10000 10000",
               xmlns: "http://www.w3.org/2000/svg",
               class: [
                  "-rotate-45",
                  props.faded ? "fill-textBlueFaded" : "fill-textBlue",
               ],
            },
            [
               h("path", {
                  d: "M4500 7300 c-492 -196 -880 -552 -1106 -1016 -274 -564 -274 -1226 0 -1790 491 -1008 1702 -1434 2716 -956 364 172 694 476 892 822 29 51 51 94 49 96 -2 2 -37 -5 -77 -17 -219 -61 -543 -86 -770 -61 -949 108 -1691 846 -1809 1801 -13 109 -13 361 1 470 24 200 86 426 164 595 19 42 35 79 35 81 0 9 -29 1 -95 -25z",
               }),
            ]
         );
      case "sun":
         return h(
            "svg",
            {
               xmlns: "http://www.w3.org/2000/svg",
               viewBox: "0 0 7000 7000",
               class: props.faded ? "fill-textBlueFaded" : "fill-textBlue",
            },
            [
               h(
                  "g",
                  {
                     transform:
                        "translate(1000,1000)",
                     stroke: "none",
                  },
                  [
                     h("path", {
                        d: "M2495 4466 c-41 -18 -83 -69 -91 -110 -3 -19 -4 -84 -2 -144 2 -93 6 -115 24 -138 39 -53 71 -69 134 -69 63 0 95 16 134 69 19 25 21 42 21 166 0 151 -5 167 -67 213 -33 25 -113 32 -153 13z",
                     }),
                     h("path", {
                        d: "M1242 3943 c-47 -23 -75 -67 -80 -128 -6 -68 8 -93 105 -187 88 -85 130 -104 197 -88 51 11 105 65 116 116 16 67 -3 109 -88 197 -43 43 -89 85 -104 93 -36 19 -105 17 -146 -3z",
                     }),
                     h("path", {
                        d: "M3725 3941 c-16 -10 -65 -54 -107 -98 -57 -59 -78 -88 -83 -116 -11 -60 3 -107 44 -148 41 -41 88 -55 148 -44 48 9 206 160 224 213 15 46 6 113 -19 150 -43 59 -146 81 -207 43z",
                     }),
                     h("path", {
                        d: "M2420 3834 c-295 -38 -559 -166 -764 -372 -180 -182 -297 -398 -352 -652 -26 -119 -26 -381 0 -500 110 -512 494 -896 1006 -1006 119 -26 381 -26 500 0 512 110 896 494 1006 1006 26 119 26 381 0 500 -109 506 -484 887 -986 1001 -83 19 -331 33 -410 23z",
                     }),
                     h("path", {
                        d: "M735 2706 c-97 -43 -124 -171 -54 -251 42 -47 84 -57 221 -53 126 3 147 11 192 72 29 39 29 133 0 172 -46 62 -65 69 -202 72 -91 1 -136 -2 -157 -12z",
                     }),
                     h("path", {
                        d: "M4095 2706 c-97 -43 -124 -171 -54 -251 42 -47 84 -57 221 -53 99 2 121 6 144 24 53 39 69 71 69 134 0 63 -16 95 -69 134 -24 18 -44 21 -154 24 -91 1 -136 -2 -157 -12z",
                     }),
                     h("path", {
                        d: "M1375 1575 c-57 -20 -199 -166 -214 -220 -31 -113 79 -224 194 -194 57 15 209 167 224 224 18 70 -17 152 -79 185 -32 16 -86 19 -125 5z",
                     }),
                     h("path", {
                        d: "M3651 1580 c-46 -11 -100 -68 -111 -116 -16 -67 3 -109 88 -197 88 -91 115 -107 172 -107 86 0 148 54 158 135 7 69 -4 94 -86 178 -101 104 -145 125 -221 107z",
                     }),
                     h("path", {
                        d: "M2495 1106 c-41 -18 -83 -69 -91 -110 -3 -19 -4 -84 -2 -144 3 -120 12 -142 72 -186 39 -29 133 -29 172 0 64 47 69 63 69 214 0 151 -5 167 -67 213 -33 25 -113 32 -153 13z",
                     }),
                  ]
               ),
            ]
         );
      default:
         return null;
   }
};

export default ButtonComponent;
</script>
