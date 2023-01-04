exports.success = (message, data) => {
  return { message, data };
};

// Configuration d'un id unique
exports.getUniqueId = members => {
  const membersId = members.map(member => member.id);
  const newId = membersId.reduce((a, b) => Math.max(a, b));
  uniqueId = newId + 1;
  return uniqueId;
};
