const scrambleGroup = document.getElementsByClassName("scramble-group");
for (let i = 0; i < scrambleGroup.length; i++) {
  const group = scrambleGroup[i].getElementsByTagName("span");
  successiveScramble(group);
}