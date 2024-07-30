export const COLOR = {
  // main_color: "#0aa99a",
  main_color: "#847114",
  blue: "#064273",
  white: "#ffffff",
  black: "#000000",
  gray: "gray",
  shadow: "#D3D3D3",
  tab_active: "#541FEC",
  contentColor: "#EEEEEE",
  error: "#ca3433",
  light_blue: "#3276B1",
  gray_white: "#FAFAFA",

  // bg
  bgWhite: "#ffffff",
  bgDark_blue: "#009688",
  bgGreen: "#4CAF50",
  bgPurple: "#9C27B0",
  bgBlue: "#3f51b5",
  bgSilver_Gray: "#607D8B",
  bgShiny_black: "#343434",
  bgBlue_bland: "#428BCA",
  bgBlue_white: "#5BC0DE",
  bgOrange: "#F0AD4E",
  bgRedFresh: "#D9534F",
  bgDrawer: "#333333",
  // text
  textGray: "#a3a3a3",
  textBlue: "#428BCA",
  textWhite: "#FAFAFA",
  txtGreen: "#4CAF50",
  txtBlackGray: "#636262",
  txtRed: "#ca3433",
  // border Color
  borderGray: "#E7E7E7",
  borderWhiteGray: "#d1d1d1",
  borderPurple: "#270d2b",
  borderBlue: "#428BCA",
  borderRed: "#ca3433",
  borderGreen: "#009688"
};



export const EXTEND_COLOR=(ele)=>{
  if(!ele)return COLOR;
  for(var i in ele){
    COLOR[i] = ele[i];
  }
  return COLOR;
}