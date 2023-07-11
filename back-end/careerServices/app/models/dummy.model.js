module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      first: String,
      second: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Dummy = mongoose.model("dummy", schema);
  return Dummy;
};
