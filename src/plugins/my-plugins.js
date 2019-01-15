export default {
  install(Vue, options) {
    Vue.$data = {
      firstName: "Yuki",
      lastName: "ko"
    };
    console.log(`${Vue.$data.firstName}_${Vue.$data.lastName}`);
  }
}