import Product from "../models/Product";

export function fetchProducts(req, res) {
  if (req.params.id) {
    Product.findById(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  } else {
    Product.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  }
}
