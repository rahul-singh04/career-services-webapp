exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.candidateBoard = (req, res) => {
  res.status(200).send("Candidate Content.");
};

exports.employerBoard = (req, res) => {
  res.status(200).send("Employer Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
