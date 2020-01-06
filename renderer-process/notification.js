module.exports = {
  generalNotification: (
    notitype,
    message,
    closeButton,
    distance,
    timeout,
    animiestyle,
    bg
  ) => {
    console.log(bg);
    bgColor = getBGColor(bg);

    Notiflix.Notify.Init({
      width: "350px",
      fontSize: "14px",
      timeout: timeout,
      messageMaxLength: 200,
      distance: distance,
      cssAnimation: true,
      cssAnimationDuration: 400,
      cssAnimationStyle: animiestyle,
      closeButton: closeButton,
      borderRadius: "0px",
      useIcon: true,
      fontSize: "18px"
    });

    if (notitype === "Info") {
      Notiflix.Notify.Init({
        width: "300px",
        fontSize: "14px",
        timeout: timeout,
        messageMaxLength: 200,
        distance: distance,
        cssAnimation: true,
        cssAnimationDuration: 400,
        cssAnimationStyle: animiestyle,
        closeButton: closeButton,
        useIcon: true,
        borderRadius: "0px"
      });
      Notiflix.Notify.Info(message);
    } else if (notitype === "Success") {
      Notiflix.Notify.Success(message);
    } else if (notitype === "Danger") {
      Notiflix.Notify.Failure(message);
    } else if (notitype === "Warning") {
      Notiflix.Notify.Warning(message);
    } else if (notitype === "Custom") {
      Notiflix.Notify.Init({
        width: "900px",
        fontSize: "14px",
        timeout: timeout,
        messageMaxLength: 200,
        distance: distance,
        cssAnimation: true,
        cssAnimationDuration: 400,
        cssAnimationStyle: animiestyle,
        closeButton: closeButton,
        useIcon: true,
        borderRadius: "0px"
      });
      Notiflix.Notify.UserCustom(message);
    }
  },
  fileScanNotification: (notitype, message, animation) => {
    Notiflix.Notify.Init({
      width: "300px",
      fontSize: "14px",
      timeout: 5000,
      messageMaxLength: 200,
      distance: "109px",
      cssAnimation: true,
      cssAnimationDuration: 400,
      cssAnimationStyle: animation,
      closeButton: false,
      useIcon: true,
      borderRadius: "0px"
    });
    if (notitype === "Info") {
      Notiflix.Notify.Info(message);
    } else if (notitype === "Success") {
      Notiflix.Notify.Success(message);
    } else if (notitype === "Warning") {
      Notiflix.Notify.Warning(message);
    } else {
      Notiflix.Notify.Failure(message);
    }
  }
};

const bgColors = {
  materializeRed: "#e51c23",
  red: "#F44336",
  pink: "#e91e63",
  purple: "#9c27b0",
  deepPurple: "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196F3",
  lightBlue: "#0091ea",
  cyan: "#00b8d4",
  teal: "#009688",
  green: "#4CAF50",
  lightGreen: "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  deepOrange: "#ff5722",
  brown: "#795548",
  blueGrey: "#607d8b",
  grey: "#9e9e9e"
};

function getBGColor(sColor) {
  bg = bgColors[NotiflixColor(sColor)];
  console.log(bg);
  return bg;
}

function NotiflixColor(color) {
  switch (color) {
    case "deep-orange":
      color = "deepOrange";
      break;
    case "blue-grey":
      color = "blueGrey";
      break;
    case "light-green":
      color = "lightGreen";
      break;
    case "deep-purple":
      color = "deepPurple";
      break;
    case "light-blue":
      color = "lightBlue";
      break;
    case "materialize-red":
      color = "materializeRed";
      break;

    default:
      color = color;
      break;
  }

  return color;
}
