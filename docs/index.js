const scrambleGroup = document.getElementsByClassName("scramble-group");
for (let i = 0; i < scrambleGroup.length; i++) {
  const group = scrambleGroup[i].getElementsByTagName("span");
  successiveScramble(group);
}

RichAJAX().get("https://cdn.jsdelivr.net/gh/ignatiusmb/ignatiusmb.github.io@1/dist/footer.html", (data) => {
  document.getElementsByTagName("footer")[0].insertAdjacentHTML("beforeend", data.responseText);
});