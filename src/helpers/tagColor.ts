export const bgTagColors = [
  "bg-blue-200 hover:bg-blue-300",
  "bg-green-200 hover:bg-green-300",
  "bg-yellow-200 hover:bg-yellow-300",
  "bg-indigo-200 hover:bg-indigo-300",
  "bg-purple-200 hover:bg-purple-300",
  "bg-pink-200 hover:bg-pink-300",
  "bg-red-200 hover:bg-red-300",
  "bg-orange-200 hover:bg-orange-300",
  "bg-teal-200 hover:bg-teal-300",
  "bg-gray-200 hover:bg-gray-300",
  "bg-lime-200 hover:bg-lime-300",
];

export const getRandomBgColor = () => {
  return bgTagColors[Math.floor(Math.random() * bgTagColors.length)];
};

export const toasterStatusColor = {
  loading: {
    style: {
      background: "#FCE38A",
    },
  },
  success: {
    style: {
      background: "#95E1D3",
    },
  },
  error: {
    style: {
      background: "#F38181",
      color: "white",
    },
  },
};
