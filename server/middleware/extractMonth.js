const extractMonth = (req, res, next) => {
  const id = req.params.id;

  const year = id.substring(id.length - 4);
  const month = id.substring(0, id.length - 4);

  req.body.month = month;
  req.body.year = year;

  next();
};

module.exports = extractMonth;
