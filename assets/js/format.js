function sales(sales) {
  return `Sales : ${sales > 0 ? sales : "None"}`;
}

function creator(creator) {
  return `Creator : ${creator ? creator : "Unknown"}`;
}

export default { sales, creator };
